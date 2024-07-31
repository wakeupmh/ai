import { IUserPool } from 'aws-cdk-lib/aws-cognito';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { ILayerVersion } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { IBucket } from 'aws-cdk-lib/aws-s3';
import { ITopic } from 'aws-cdk-lib/aws-sns';
import { IQueue } from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';
import { ConfigInterface } from '../config';
import { ResourcesStack } from '../stacks/resources.stack';
export interface LambdaProps {
    name: string;
    entry: string;
    description: string;
    resourcesStack: ResourcesStack;
    tables?: ITable[];
    topics?: ITopic[];
    queues?: IQueue[];
    buckets?: IBucket[];
    userPools?: IUserPool[];
    environmentVariables?: {
        [key: string]: string;
    };
    isExternal?: boolean;
    isolated?: boolean;
    layers?: ILayerVersion[];
    overwrite?: NodejsFunctionProps;
    useDynamo?: boolean;
    useSes?: boolean;
    auditTags: {
        containsUserData: boolean;
        userDataStored?: string;
    };
    useSharedVpc?: boolean;
    allowQueueAccess?: boolean;
}
declare class Lambda extends NodejsFunction {
    protected config: ConfigInterface;
    constructor(scope: Construct, id: string, props: LambdaProps);
}
export declare const makeLambda: (scope: Construct, id: string, props: LambdaProps) => Lambda;
export {};
