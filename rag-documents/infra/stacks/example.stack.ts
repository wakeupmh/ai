import { Stack } from 'aws-cdk-lib'
import { Construct } from 'constructs'

// import { makeLambda } from '../constructs'
import { FunctionStackProps } from '../interfaces/functions-stack-props.interface'

export class ExampleStack extends Stack {
  constructor(scope: Construct, id: string, props: FunctionStackProps) {
    super(scope, id, props)

    // makeLambda(this, 'example-lambda', {
    //   name: 'example-lambda',
    //   entry: 'example/example-lambda/example-lambda.handler.ts',
    //   description: 'Email Delivery Received',
    //   resourcesStack: props.resourcesStack,
    //   environmentVariables: {},
    //   auditTags: {
    //     containsUserData: false,
    //   },
    // })
  }
}
