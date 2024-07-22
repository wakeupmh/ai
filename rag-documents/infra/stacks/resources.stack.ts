import { Stack, StackProps } from 'aws-cdk-lib'
import { ITable } from 'aws-cdk-lib/aws-dynamodb'
import { ISecurityGroup, IVpc, SecurityGroup, Vpc } from 'aws-cdk-lib/aws-ec2'
import { IFunction } from 'aws-cdk-lib/aws-lambda'
import { IBucket } from 'aws-cdk-lib/aws-s3'
import { ISecret } from 'aws-cdk-lib/aws-secretsmanager'
import { IReceiptRuleSet } from 'aws-cdk-lib/aws-ses'
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

  public mailDeliveryBucket: IBucket
  public mailReceivedLambda: IFunction
  public mailReceivedRuleSet: IReceiptRuleSet

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    this.config = makeConfig()

    this.vpc = Vpc.fromLookup(this, 'vpc', {
      tags: { vpcIdentity: this.config.vpc.default.identity },
    })

    this.sharedVpc = Vpc.fromLookup(this, 'shared-vpc', {
      tags: { vpcIdentity: this.config.vpc.shared.identity },
    })

    this.sg = SecurityGroup.fromSecurityGroupId(this, 'mysql-sg-default', process.env.DEFAULT_MYSQL_SG ?? '')

    this.sharedVpcSg = SecurityGroup.fromLookupByName(
      this,
      'shared-vpc-sg',
      this.config.vpc.shared.sgName,
      this.sharedVpc,
    )

    // const tableArn = Fn.importValue('infrastructure::dynamodb-table::sample::arn')
    // this.table = Table.fromTableArn(this, `sample-table`, tableArn)

    // this.tableIndexes = Table.fromTableArn(
    //   this,
    //   'sample-table-index',
    //   `${Fn.importValue('infrastructure::dynamodb-table::sample::arn')}/*`,
    // )

    // this.secret = new Secret(this, `sample-domain-secret`, { description: 'Sample Domain Secret' })
  }
}
