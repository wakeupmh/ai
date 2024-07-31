"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RagLambdaStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const constructs_1 = require("../constructs");
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
class RagLambdaStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const bedrockLambda = (0, constructs_1.makeLambda)(this, 'bedrock-lambda', {
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
        });
        const bedrockLambdaUrl = bedrockLambda.addFunctionUrl({
            authType: aws_lambda_1.FunctionUrlAuthType.NONE,
            cors: {
                allowedOrigins: ['*'],
            },
        });
        new aws_cdk_lib_1.CfnOutput(this, 'BedrockFunctionUrl ', { value: bedrockLambdaUrl.url });
        const gptLambda = (0, constructs_1.makeLambda)(this, 'gpt-lambda', {
            name: 'gpt-lambda',
            entry: 'gpt/gpt.handler.ts',
            description: 'GPT',
            resourcesStack: props.resourcesStack,
            environmentVariables: {
                BKT_NAME: props.resourcesStack.ragDocumentsBkt.bucketName,
                OPENAI_API_KEY: process.env.OPENAI_API_KEY,
            },
            auditTags: {
                containsUserData: false,
            },
            buckets: [props.resourcesStack.ragDocumentsBkt],
        });
        const gptLambdaUrl = gptLambda.addFunctionUrl({
            authType: aws_lambda_1.FunctionUrlAuthType.NONE,
            cors: {
                allowedOrigins: ['*'],
            },
        });
        new aws_cdk_lib_1.CfnOutput(this, 'GptFunctionUrl ', { value: gptLambdaUrl.url });
    }
}
exports.RagLambdaStack = RagLambdaStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFnLWxhbWJkYS5zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2luZnJhL3N0YWNrcy9yYWctbGFtYmRhLnN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUE4QztBQUk5Qyw4Q0FBMEM7QUFDMUMsdURBQTREO0FBRTVELE1BQWEsY0FBZSxTQUFRLG1CQUFLO0lBQ3ZDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBeUI7UUFDakUsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFFdkIsTUFBTSxhQUFhLEdBQUcsSUFBQSx1QkFBVSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRTtZQUN2RCxJQUFJLEVBQUUsZ0JBQWdCO1lBQ3RCLEtBQUssRUFBRSw0QkFBNEI7WUFDbkMsV0FBVyxFQUFFLGdCQUFnQjtZQUM3QixjQUFjLEVBQUUsS0FBSyxDQUFDLGNBQWM7WUFDcEMsb0JBQW9CLEVBQUU7Z0JBQ3BCLFFBQVEsRUFBRSxLQUFLLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxVQUFVO2FBQzFEO1lBQ0QsU0FBUyxFQUFFO2dCQUNULGdCQUFnQixFQUFFLEtBQUs7YUFDeEI7WUFDRCxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQztTQUNoRCxDQUFDLENBQUE7UUFDRixNQUFNLGdCQUFnQixHQUFHLGFBQWEsQ0FBQyxjQUFjLENBQUM7WUFDcEQsUUFBUSxFQUFFLGdDQUFtQixDQUFDLElBQUk7WUFDbEMsSUFBSSxFQUFFO2dCQUNKLGNBQWMsRUFBRSxDQUFDLEdBQUcsQ0FBQzthQUN0QjtTQUNGLENBQUMsQ0FBQTtRQUNGLElBQUksdUJBQVMsQ0FBQyxJQUFJLEVBQUUscUJBQXFCLEVBQUUsRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQTtRQUUzRSxNQUFNLFNBQVMsR0FBRyxJQUFBLHVCQUFVLEVBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUMvQyxJQUFJLEVBQUUsWUFBWTtZQUNsQixLQUFLLEVBQUUsb0JBQW9CO1lBQzNCLFdBQVcsRUFBRSxLQUFLO1lBQ2xCLGNBQWMsRUFBRSxLQUFLLENBQUMsY0FBYztZQUNwQyxvQkFBb0IsRUFBRTtnQkFDcEIsUUFBUSxFQUFFLEtBQUssQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLFVBQVU7Z0JBQ3pELGNBQWMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWU7YUFDNUM7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsZ0JBQWdCLEVBQUUsS0FBSzthQUN4QjtZQUNELE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDO1NBQ2hELENBQUMsQ0FBQTtRQUNGLE1BQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQyxjQUFjLENBQUM7WUFDNUMsUUFBUSxFQUFFLGdDQUFtQixDQUFDLElBQUk7WUFDbEMsSUFBSSxFQUFFO2dCQUNKLGNBQWMsRUFBRSxDQUFDLEdBQUcsQ0FBQzthQUN0QjtTQUNGLENBQUMsQ0FBQTtRQUNGLElBQUksdUJBQVMsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsRUFBRSxLQUFLLEVBQUUsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUE7SUFDckUsQ0FBQztDQUNGO0FBL0NELHdDQStDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENmbk91dHB1dCwgU3RhY2sgfSBmcm9tICdhd3MtY2RrLWxpYidcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnXG5cbmltcG9ydCB7IEZ1bmN0aW9uU3RhY2tQcm9wcyB9IGZyb20gJy4uL2ludGVyZmFjZXMvZnVuY3Rpb25zLXN0YWNrLXByb3BzLmludGVyZmFjZSdcbmltcG9ydCB7IG1ha2VMYW1iZGEgfSBmcm9tICcuLi9jb25zdHJ1Y3RzJ1xuaW1wb3J0IHsgRnVuY3Rpb25VcmxBdXRoVHlwZSB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1sYW1iZGEnXG5cbmV4cG9ydCBjbGFzcyBSYWdMYW1iZGFTdGFjayBleHRlbmRzIFN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IEZ1bmN0aW9uU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpXG5cbiAgICBjb25zdCBiZWRyb2NrTGFtYmRhID0gbWFrZUxhbWJkYSh0aGlzLCAnYmVkcm9jay1sYW1iZGEnLCB7XG4gICAgICBuYW1lOiAnYmVkcm9jay1sYW1iZGEnLFxuICAgICAgZW50cnk6ICdiZWRyb2NrL2JlZHJvY2suaGFuZGxlci50cycsXG4gICAgICBkZXNjcmlwdGlvbjogJ0JlZHJvY2sgdG8gUkFHJyxcbiAgICAgIHJlc291cmNlc1N0YWNrOiBwcm9wcy5yZXNvdXJjZXNTdGFjayxcbiAgICAgIGVudmlyb25tZW50VmFyaWFibGVzOiB7XG4gICAgICAgIEJLVF9OQU1FOiBwcm9wcy5yZXNvdXJjZXNTdGFjay5yYWdEb2N1bWVudHNCa3QuYnVja2V0TmFtZSxcbiAgICAgIH0sXG4gICAgICBhdWRpdFRhZ3M6IHtcbiAgICAgICAgY29udGFpbnNVc2VyRGF0YTogZmFsc2UsXG4gICAgICB9LFxuICAgICAgYnVja2V0czogW3Byb3BzLnJlc291cmNlc1N0YWNrLnJhZ0RvY3VtZW50c0JrdF0sXG4gICAgfSlcbiAgICBjb25zdCBiZWRyb2NrTGFtYmRhVXJsID0gYmVkcm9ja0xhbWJkYS5hZGRGdW5jdGlvblVybCh7XG4gICAgICBhdXRoVHlwZTogRnVuY3Rpb25VcmxBdXRoVHlwZS5OT05FLFxuICAgICAgY29yczoge1xuICAgICAgICBhbGxvd2VkT3JpZ2luczogWycqJ10sXG4gICAgICB9LFxuICAgIH0pXG4gICAgbmV3IENmbk91dHB1dCh0aGlzLCAnQmVkcm9ja0Z1bmN0aW9uVXJsICcsIHsgdmFsdWU6IGJlZHJvY2tMYW1iZGFVcmwudXJsIH0pXG5cbiAgICBjb25zdCBncHRMYW1iZGEgPSBtYWtlTGFtYmRhKHRoaXMsICdncHQtbGFtYmRhJywge1xuICAgICAgbmFtZTogJ2dwdC1sYW1iZGEnLFxuICAgICAgZW50cnk6ICdncHQvZ3B0LmhhbmRsZXIudHMnLFxuICAgICAgZGVzY3JpcHRpb246ICdHUFQnLFxuICAgICAgcmVzb3VyY2VzU3RhY2s6IHByb3BzLnJlc291cmNlc1N0YWNrLFxuICAgICAgZW52aXJvbm1lbnRWYXJpYWJsZXM6IHtcbiAgICAgICAgQktUX05BTUU6IHByb3BzLnJlc291cmNlc1N0YWNrLnJhZ0RvY3VtZW50c0JrdC5idWNrZXROYW1lLFxuICAgICAgICBPUEVOQUlfQVBJX0tFWTogcHJvY2Vzcy5lbnYuT1BFTkFJX0FQSV9LRVkhLFxuICAgICAgfSxcbiAgICAgIGF1ZGl0VGFnczoge1xuICAgICAgICBjb250YWluc1VzZXJEYXRhOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBidWNrZXRzOiBbcHJvcHMucmVzb3VyY2VzU3RhY2sucmFnRG9jdW1lbnRzQmt0XSxcbiAgICB9KVxuICAgIGNvbnN0IGdwdExhbWJkYVVybCA9IGdwdExhbWJkYS5hZGRGdW5jdGlvblVybCh7XG4gICAgICBhdXRoVHlwZTogRnVuY3Rpb25VcmxBdXRoVHlwZS5OT05FLFxuICAgICAgY29yczoge1xuICAgICAgICBhbGxvd2VkT3JpZ2luczogWycqJ10sXG4gICAgICB9LFxuICAgIH0pXG4gICAgbmV3IENmbk91dHB1dCh0aGlzLCAnR3B0RnVuY3Rpb25VcmwgJywgeyB2YWx1ZTogZ3B0TGFtYmRhVXJsLnVybCB9KVxuICB9XG59XG4iXX0=