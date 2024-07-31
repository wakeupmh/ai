import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { FunctionStackProps } from '../interfaces/functions-stack-props.interface';
export declare class RagLambdaStack extends Stack {
    constructor(scope: Construct, id: string, props: FunctionStackProps);
}
