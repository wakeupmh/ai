import { Stack } from 'aws-cdk-lib'
import { Construct } from 'constructs'

import { FunctionStackProps } from '../interfaces/functions-stack-props.interface'
import { makeLambda } from '../constructs'

export class RagLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props: FunctionStackProps) {
    super(scope, id, props)

    makeLambda(this, 'bedrock-lambda', {
      name: 'bedrock-lambda',
      entry: 'functions/bedrock/bedrock.handler.ts',
      description: 'Bedrock to RAG',
      resourcesStack: props.resourcesStack,
      environmentVariables: {
        BKT_NAME: props.resourcesStack.ragDocumentsBkt.bucketName,
      },
      auditTags: {
        containsUserData: false,
      },
    })

    makeLambda(this, 'gpt-lambda', {
      name: 'gpt-lambda',
      entry: 'functions/gpt/gpt.handler.ts',
      description: 'GPT',
      resourcesStack: props.resourcesStack,
      environmentVariables: {
        BKT_NAME: props.resourcesStack.ragDocumentsBkt.bucketName,
      },
      auditTags: {
        containsUserData: false,
      },
    })
  }
}
