import { CfnOutput, Stack } from 'aws-cdk-lib'
import { Construct } from 'constructs'

import { FunctionStackProps } from '../interfaces/functions-stack-props.interface'
import { makeLambda } from '../constructs'
import { FunctionUrlAuthType } from 'aws-cdk-lib/aws-lambda'

export class RagLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props: FunctionStackProps) {
    super(scope, id, props)

    const bedrockLambda = makeLambda(this, 'bedrock-lambda', {
      name: 'bedrock-lambda',
      entry: 'bedrock/bedrock.handler.ts',
      description: 'Bedrock to RAG',
      resourcesStack: props.resourcesStack,
      environmentVariables: {
        BKT_NAME: props.resourcesStack.ragDocumentsBkt.bucketName,
      },
      auditTags: {
        containsUserData: false,
      },
      buckets: [props.resourcesStack.ragDocumentsBkt],
    })
    const bedrockLambdaUrl = bedrockLambda.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
      cors: {
        allowedOrigins: ['*'],
      },
    })
    new CfnOutput(this, 'BedrockFunctionUrl ', { value: bedrockLambdaUrl.url })

    const gptLambda = makeLambda(this, 'gpt-lambda', {
      name: 'gpt-lambda',
      entry: 'gpt/gpt.handler.ts',
      description: 'GPT',
      resourcesStack: props.resourcesStack,
      environmentVariables: {
        BKT_NAME: props.resourcesStack.ragDocumentsBkt.bucketName,
        OPENAI_API_KEY: process.env.OPENAI_API_KEY!,
      },
      auditTags: {
        containsUserData: false,
      },
      buckets: [props.resourcesStack.ragDocumentsBkt],
    })
    const gptLambdaUrl = gptLambda.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
      cors: {
        allowedOrigins: ['*'],
      },
    })
    new CfnOutput(this, 'GptFunctionUrl ', { value: gptLambdaUrl.url })
  }
}
