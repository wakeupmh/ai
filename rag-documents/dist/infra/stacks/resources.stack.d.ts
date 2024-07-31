import { Stack, StackProps } from 'aws-cdk-lib';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { ISecurityGroup, IVpc } from 'aws-cdk-lib/aws-ec2';
import { IBucket } from 'aws-cdk-lib/aws-s3';
import { ISecret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import { ConfigInterface } from '../config';
export declare class ResourcesStack extends Stack {
    readonly config: ConfigInterface;
    readonly defaultSecurityGroup: ISecurityGroup;
    readonly internalSecurityGroup: ISecurityGroup;
    readonly secret: ISecret;
    readonly vpc: IVpc;
    readonly sg: ISecurityGroup;
    readonly sharedVpc: IVpc;
    readonly sharedVpcSg: ISecurityGroup;
    readonly table: ITable;
    readonly tableIndexes: ITable;
    ragDocumentsBkt: IBucket;
    constructor(scope: Construct, id: string, props?: StackProps);
}
