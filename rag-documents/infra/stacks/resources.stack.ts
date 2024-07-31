import { Duration, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib'
import { ITable } from 'aws-cdk-lib/aws-dynamodb'
import { ISecurityGroup, IVpc } from 'aws-cdk-lib/aws-ec2'
import { Bucket, IBucket, StorageClass } from 'aws-cdk-lib/aws-s3'
import { ISecret } from 'aws-cdk-lib/aws-secretsmanager'
import { Construct } from 'constructs'

import { ConfigInterface, makeConfig } from '../config'

export class ResourcesStack extends Stack {
  public readonly config: ConfigInterface
  public readonly defaultSecurityGroup: ISecurityGroup
  public readonly internalSecurityGroup: ISecurityGroup
  public readonly secret: ISecret
  public readonly vpc: IVpc
  public readonly sg: ISecurityGroup
  public readonly sharedVpc: IVpc
  public readonly sharedVpcSg: ISecurityGroup
  public readonly table: ITable
  public readonly tableIndexes: ITable

  public ragDocumentsBkt: IBucket

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    this.config = makeConfig()

    this.ragDocumentsBkt = new Bucket(this, 'rag-documents-bucket', {
      bucketName: `rag-documents-${process.env.ACCOUNT}`,
      removalPolicy: RemovalPolicy.DESTROY,
      lifecycleRules: [
        {
          transitions: [
            {
              storageClass: StorageClass.GLACIER,
              transitionAfter: Duration.days(30),
            },
          ],
        },
      ],
    })
  }
}
