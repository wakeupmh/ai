import { StackProps } from 'aws-cdk-lib/core'

import { ResourcesStack } from '../stacks/resources.stack'

export interface FunctionStackProps extends StackProps {
  resourcesStack: ResourcesStack
}
