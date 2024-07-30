#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'

import { makeConfig } from '../infra/config'
import { FunctionStackProps } from '../infra/interfaces/functions-stack-props.interface'
import { RagLambdaStack, ResourcesStack } from '../infra/stacks'

const app = new cdk.App()

const config = makeConfig()


const resourcesStack = new ResourcesStack(app, 'root-resources-stack', {
  env: {
    account: config.account,
    region: config.region,
  },
})

const stackParams: FunctionStackProps = {
  resourcesStack,
  env: {
    account: config.account,
    region: config.region,
  },
}

new RagLambdaStack(app, 'root-rag-lambda-stack', stackParams)
