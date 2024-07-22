import { CfnOutput, Duration } from 'aws-cdk-lib'
import { IUserPool } from 'aws-cdk-lib/aws-cognito'
import { ITable } from 'aws-cdk-lib/aws-dynamodb'
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam'
import { Architecture, CfnPermission, ILayerVersion, LayerVersion, Runtime, Tracing } from 'aws-cdk-lib/aws-lambda'
import { LogLevel, NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs'
import { RetentionDays } from 'aws-cdk-lib/aws-logs'
import { IBucket } from 'aws-cdk-lib/aws-s3'
import { ITopic } from 'aws-cdk-lib/aws-sns'
import { IQueue } from 'aws-cdk-lib/aws-sqs'
import { Construct } from 'constructs'

import path = require('path')

import { ConfigInterface, makeConfig } from '../config'
import { ResourcesStack } from '../stacks/resources.stack'

export interface LambdaProps {
  name: string
  entry: string
  description: string
  resourcesStack: ResourcesStack
  tables?: ITable[]
  topics?: ITopic[]
  queues?: IQueue[]
  buckets?: IBucket[]
  userPools?: IUserPool[]
  environmentVariables?: { [key: string]: string }
  isExternal?: boolean
  isolated?: boolean
  layers?: ILayerVersion[]
  overwrite?: NodejsFunctionProps
  useDynamo?: boolean
  useSes?: boolean
  auditTags: {
    containsUserData: boolean
    userDataStored?: string
  }
  useSharedVpc?: boolean
  allowQueueAccess?: boolean
}

class Lambda extends NodejsFunction {
  protected config: ConfigInterface

  constructor(scope: Construct, id: string, props: LambdaProps) {
    const config = makeConfig()
    const isProd = config.envName === 'prod'

    const environmentVariables = props.environmentVariables || {}

    const layers = (props.layers || []) as ILayerVersion[]

    // https://docs.powertools.aws.dev/lambda/typescript/latest/#environment-variables
    const powertoolsLayer = LayerVersion.fromLayerVersionArn(
      scope,
      `${id}-powertools-layer`,
      `arn:aws:lambda:${config.region}:094274105915:layer:AWSLambdaPowertoolsTypeScript:16`,
    )
    layers.push(powertoolsLayer)

    if (props.useSharedVpc) {
      props.overwrite = {
        ...props.overwrite,
        vpc: props.resourcesStack.sharedVpc,
        securityGroups: [props.resourcesStack.sharedVpcSg],
      }
    }

    const lambdaProps: NodejsFunctionProps = {
      functionName: `${config.serviceName}-${props.name}`,
      entry: path.join(__dirname, '..', '..', 'src', 'functions', props.entry),
      description: props.description,
      timeout: Duration.seconds(300),
      runtime: Runtime.NODEJS_18_X,
      architecture: Architecture.ARM_64,
      tracing: Tracing.ACTIVE,
      logRetention: isProd ? RetentionDays.ONE_YEAR : RetentionDays.ONE_WEEK,
      environment: {
        // NODE_OPTIONS: '--enable-source-maps',
        ENV_NAME: config.envName,
        AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
        POWERTOOLS_SERVICE_NAME: config.serviceName,
        POWERTOOLS_METRICS_NAMESPACE: config.projectName,
        OBSERVABILITY_LOGGER_ENABLED: config.observability.logger.enabled.toString(),
        OBSERVABILITY_LOGGER_LEVEL: config.observability.logger.level,
        OBSERVABILITY_METRICS_ENABLED: config.observability.metrics.enabled.toString(),
        OBSERVABILITY_TRACER_ENABLED: config.observability.tracer.enabled.toString(),
        ...environmentVariables,
      },
      bundling: {
        minify: true, // minify code, defaults to false
        sourceMap: false, // include source map, defaults to false
        // sourceMapMode: SourceMapMode.INLINE, // defaults to SourceMapMode.DEFAULT
        // sourcesContent: false, // do not include original source into source map, defaults to true
        target: 'es2021', // target environment for the generated JavaScript code
        logLevel: LogLevel.ERROR,
        define: {
          // 'process.env.COUNTRY': JSON.stringify('France'),
        },
        // banner: '/* comments */',
        // footer: '/* comments */',
        externalModules: [
          // '@aws-sdk/lib-dynamodb',
          // '@aws-sdk/client-dynamodb',
          // '@aws-sdk/client-sns',
          // '@aws-sdk/client-sqs',
          // '@aws-sdk/client-ses',
          // '@aws-sdk/client-s3',
          '@aws-lambda-powertools/commons',
          '@aws-lambda-powertools/logger',
          '@aws-lambda-powertools/tracer',
          '@aws-lambda-powertools/metrics',
          // Remove knex modules
          'pg',
          'tedious',
          'oracledb',
          'better-sqlite3',
          'mysql',
          'pg-query-stream',
          'sqlite3',
        ],
      },
      memorySize: config.defaultMemorySize,
      layers,
      ...(props.overwrite || {}),
    }

    super(scope, id, lambdaProps)
    this.config = config
  }
}

export const makeLambda = (scope: Construct, id: string, props: LambdaProps) => {
  const config = props.resourcesStack.config
  const lambda = new Lambda(scope, id, props)

  if (props.resourcesStack.secret) {
    props.resourcesStack.secret.grantRead(lambda)
  }

  if (props.useDynamo) {
    props.tables = [...(props.tables || []), props.resourcesStack.table, props.resourcesStack.tableIndexes]
  }

  for (const table of props?.tables || []) {
    table.grantReadWriteData(lambda)
  }

  for (const topic of props?.topics || []) {
    topic.grantPublish(lambda)
  }

  for (const bucket of props?.buckets || []) {
    bucket.grantReadWrite(lambda)
  }

  if (props?.queues || props.allowQueueAccess) {
    lambda.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['sqs:*'],
        resources: ['*'],
      }),
    )
  }

  if (props?.useSes) {
    lambda.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['ses:SendRawEmail', 'ses:GetTemplate', 'ses:SendTemplatedEmail'],
        resources: ['*'],
      }),
    )
  }

  if (props?.userPools) {
    lambda.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['cognito-idp:*'],
        resources: ['*'],
      }),
    )
  }

  new CfnOutput(lambda, `${config.serviceName}-${id}-output-arn`, {
    value: lambda.functionArn,
    exportName: `${config.serviceName}::function::${props.name}::arn`,
  })

  new CfnPermission(lambda, `${config.serviceName}-${id}-lambda-permission`, {
    action: 'lambda:InvokeFunction',
    functionName: lambda.functionName,
    principal: 'apigateway.amazonaws.com',
  })

  return lambda
}
