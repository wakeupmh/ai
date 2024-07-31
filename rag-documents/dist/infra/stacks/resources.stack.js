"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourcesStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_s3_1 = require("aws-cdk-lib/aws-s3");
const config_1 = require("../config");
class ResourcesStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        this.config = (0, config_1.makeConfig)();
        this.ragDocumentsBkt = new aws_s3_1.Bucket(this, 'rag-documents-bucket', {
            bucketName: `rag-documents-${process.env.ACCOUNT}`,
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
            lifecycleRules: [
                {
                    transitions: [
                        {
                            storageClass: aws_s3_1.StorageClass.GLACIER,
                            transitionAfter: aws_cdk_lib_1.Duration.days(30),
                        },
                    ],
                },
            ],
        });
    }
}
exports.ResourcesStack = ResourcesStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2VzLnN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vaW5mcmEvc3RhY2tzL3Jlc291cmNlcy5zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBd0U7QUFHeEUsK0NBQWtFO0FBSWxFLHNDQUF1RDtBQUV2RCxNQUFhLGNBQWUsU0FBUSxtQkFBSztJQWN2QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQzFELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBRXZCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBQSxtQkFBVSxHQUFFLENBQUE7UUFFMUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGVBQU0sQ0FBQyxJQUFJLEVBQUUsc0JBQXNCLEVBQUU7WUFDOUQsVUFBVSxFQUFFLGlCQUFpQixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRTtZQUNsRCxhQUFhLEVBQUUsMkJBQWEsQ0FBQyxPQUFPO1lBQ3BDLGNBQWMsRUFBRTtnQkFDZDtvQkFDRSxXQUFXLEVBQUU7d0JBQ1g7NEJBQ0UsWUFBWSxFQUFFLHFCQUFZLENBQUMsT0FBTzs0QkFDbEMsZUFBZSxFQUFFLHNCQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQzt5QkFDbkM7cUJBQ0Y7aUJBQ0Y7YUFDRjtTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRjtBQWxDRCx3Q0FrQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEdXJhdGlvbiwgUmVtb3ZhbFBvbGljeSwgU3RhY2ssIFN0YWNrUHJvcHMgfSBmcm9tICdhd3MtY2RrLWxpYidcbmltcG9ydCB7IElUYWJsZSB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1keW5hbW9kYidcbmltcG9ydCB7IElTZWN1cml0eUdyb3VwLCBJVnBjIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWVjMidcbmltcG9ydCB7IEJ1Y2tldCwgSUJ1Y2tldCwgU3RvcmFnZUNsYXNzIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLXMzJ1xuaW1wb3J0IHsgSVNlY3JldCB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1zZWNyZXRzbWFuYWdlcidcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnXG5cbmltcG9ydCB7IENvbmZpZ0ludGVyZmFjZSwgbWFrZUNvbmZpZyB9IGZyb20gJy4uL2NvbmZpZydcblxuZXhwb3J0IGNsYXNzIFJlc291cmNlc1N0YWNrIGV4dGVuZHMgU3RhY2sge1xuICBwdWJsaWMgcmVhZG9ubHkgY29uZmlnOiBDb25maWdJbnRlcmZhY2VcbiAgcHVibGljIHJlYWRvbmx5IGRlZmF1bHRTZWN1cml0eUdyb3VwOiBJU2VjdXJpdHlHcm91cFxuICBwdWJsaWMgcmVhZG9ubHkgaW50ZXJuYWxTZWN1cml0eUdyb3VwOiBJU2VjdXJpdHlHcm91cFxuICBwdWJsaWMgcmVhZG9ubHkgc2VjcmV0OiBJU2VjcmV0XG4gIHB1YmxpYyByZWFkb25seSB2cGM6IElWcGNcbiAgcHVibGljIHJlYWRvbmx5IHNnOiBJU2VjdXJpdHlHcm91cFxuICBwdWJsaWMgcmVhZG9ubHkgc2hhcmVkVnBjOiBJVnBjXG4gIHB1YmxpYyByZWFkb25seSBzaGFyZWRWcGNTZzogSVNlY3VyaXR5R3JvdXBcbiAgcHVibGljIHJlYWRvbmx5IHRhYmxlOiBJVGFibGVcbiAgcHVibGljIHJlYWRvbmx5IHRhYmxlSW5kZXhlczogSVRhYmxlXG5cbiAgcHVibGljIHJhZ0RvY3VtZW50c0JrdDogSUJ1Y2tldFxuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpXG5cbiAgICB0aGlzLmNvbmZpZyA9IG1ha2VDb25maWcoKVxuXG4gICAgdGhpcy5yYWdEb2N1bWVudHNCa3QgPSBuZXcgQnVja2V0KHRoaXMsICdyYWctZG9jdW1lbnRzLWJ1Y2tldCcsIHtcbiAgICAgIGJ1Y2tldE5hbWU6IGByYWctZG9jdW1lbnRzLSR7cHJvY2Vzcy5lbnYuQUNDT1VOVH1gLFxuICAgICAgcmVtb3ZhbFBvbGljeTogUmVtb3ZhbFBvbGljeS5ERVNUUk9ZLFxuICAgICAgbGlmZWN5Y2xlUnVsZXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHRyYW5zaXRpb25zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0b3JhZ2VDbGFzczogU3RvcmFnZUNsYXNzLkdMQUNJRVIsXG4gICAgICAgICAgICAgIHRyYW5zaXRpb25BZnRlcjogRHVyYXRpb24uZGF5cygzMCksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0pXG4gIH1cbn1cbiJdfQ==