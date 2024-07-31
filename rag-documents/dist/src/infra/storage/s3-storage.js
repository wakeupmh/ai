"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_xray_sdk_1 = __importDefault(require("aws-xray-sdk"));
const stream_1 = require("stream");
const client_s3_1 = require("@aws-sdk/client-s3");
class S3Storage {
    constructor() {
        this.s3Client = aws_xray_sdk_1.default.captureAWSv3Client(new client_s3_1.S3Client({ region: process.env.AWS_REGION }));
    }
    async putObject(storageName, key, file, encoding, contentType) {
        const command = new client_s3_1.PutObjectCommand({
            Bucket: storageName,
            Key: key,
            Body: file,
            ContentEncoding: encoding,
            ContentType: contentType,
            ContentDisposition: 'inline',
        });
        const response = await this.s3Client.send(command);
        return {
            statusCode: response?.$metadata?.httpStatusCode?.toString(),
            versionId: response?.VersionId,
            keyId: response?.SSEKMSKeyId,
            requestId: response?.$metadata.requestId,
        };
    }
    async getObject(storageName, key) {
        try {
            const command = new client_s3_1.GetObjectCommand({
                Bucket: storageName,
                Key: decodeURIComponent(key.replace(/\+/g, ' ')),
            });
            const { Body, Metadata } = await this.s3Client.send(command);
            if (!Body || !(Body instanceof stream_1.Readable))
                throw new Error('File not found');
            return { body: Body, metadata: Metadata };
        }
        catch (e) {
            console.error('Bucket', { error: e });
            return undefined;
        }
    }
}
exports.default = S3Storage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiczMtc3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9pbmZyYS9zdG9yYWdlL3MzLXN0b3JhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxnRUFBa0M7QUFDbEMsbUNBQWlDO0FBRWpDLGtEQUFpRjtBQUdqRixNQUFxQixTQUFTO0lBRzVCO1FBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxzQkFBTyxDQUFDLGtCQUFrQixDQUFDLElBQUksb0JBQVEsQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUM5RixDQUFDO0lBRUQsS0FBSyxDQUFDLFNBQVMsQ0FDYixXQUFtQixFQUNuQixHQUFXLEVBQ1gsSUFBUyxFQUNULFFBQWlCLEVBQ2pCLFdBQW9CO1FBRXBCLE1BQU0sT0FBTyxHQUFHLElBQUksNEJBQWdCLENBQUM7WUFDbkMsTUFBTSxFQUFFLFdBQVc7WUFDbkIsR0FBRyxFQUFFLEdBQUc7WUFDUixJQUFJLEVBQUUsSUFBSTtZQUNWLGVBQWUsRUFBRSxRQUFRO1lBQ3pCLFdBQVcsRUFBRSxXQUFXO1lBQ3hCLGtCQUFrQixFQUFFLFFBQVE7U0FDN0IsQ0FBQyxDQUFBO1FBRUYsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUVsRCxPQUFPO1lBQ0wsVUFBVSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRTtZQUMzRCxTQUFTLEVBQUUsUUFBUSxFQUFFLFNBQVM7WUFDOUIsS0FBSyxFQUFFLFFBQVEsRUFBRSxXQUFXO1lBQzVCLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLFNBQVM7U0FDekMsQ0FBQTtJQUNILENBQUM7SUFFTSxLQUFLLENBQUMsU0FBUyxDQUFDLFdBQW1CLEVBQUUsR0FBVztRQUNyRCxJQUFJO1lBQ0YsTUFBTSxPQUFPLEdBQUcsSUFBSSw0QkFBZ0IsQ0FBQztnQkFDbkMsTUFBTSxFQUFFLFdBQVc7Z0JBQ25CLEdBQUcsRUFBRSxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQzthQUNqRCxDQUFDLENBQUE7WUFDRixNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDNUQsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxZQUFZLGlCQUFRLENBQUM7Z0JBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1lBRTNFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQTtTQUMxQztRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUNyQyxPQUFPLFNBQVMsQ0FBQTtTQUNqQjtJQUNILENBQUM7Q0FDRjtBQWhERCw0QkFnREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQVdTWFJheSBmcm9tICdhd3MteHJheS1zZGsnXG5pbXBvcnQgeyBSZWFkYWJsZSB9IGZyb20gJ3N0cmVhbSdcblxuaW1wb3J0IHsgR2V0T2JqZWN0Q29tbWFuZCwgUHV0T2JqZWN0Q29tbWFuZCwgUzNDbGllbnQgfSBmcm9tICdAYXdzLXNkay9jbGllbnQtczMnXG5pbXBvcnQgeyBQdXRPYmplY3RSZXNwb25zZSwgU3RvcmFnZUludGVyZmFjZSB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvc3RvcmFnZS5pbnRlcmZhY2UnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFMzU3RvcmFnZSBpbXBsZW1lbnRzIFN0b3JhZ2VJbnRlcmZhY2Uge1xuICBwcml2YXRlIHJlYWRvbmx5IHMzQ2xpZW50OiBTM0NsaWVudFxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuczNDbGllbnQgPSBBV1NYUmF5LmNhcHR1cmVBV1N2M0NsaWVudChuZXcgUzNDbGllbnQoeyByZWdpb246IHByb2Nlc3MuZW52LkFXU19SRUdJT04gfSkpXG4gIH1cblxuICBhc3luYyBwdXRPYmplY3QoXG4gICAgc3RvcmFnZU5hbWU6IHN0cmluZyxcbiAgICBrZXk6IHN0cmluZyxcbiAgICBmaWxlOiBhbnksXG4gICAgZW5jb2Rpbmc/OiBzdHJpbmcsXG4gICAgY29udGVudFR5cGU/OiBzdHJpbmcsXG4gICk6IFByb21pc2U8UHV0T2JqZWN0UmVzcG9uc2U+IHtcbiAgICBjb25zdCBjb21tYW5kID0gbmV3IFB1dE9iamVjdENvbW1hbmQoe1xuICAgICAgQnVja2V0OiBzdG9yYWdlTmFtZSxcbiAgICAgIEtleToga2V5LFxuICAgICAgQm9keTogZmlsZSxcbiAgICAgIENvbnRlbnRFbmNvZGluZzogZW5jb2RpbmcsXG4gICAgICBDb250ZW50VHlwZTogY29udGVudFR5cGUsXG4gICAgICBDb250ZW50RGlzcG9zaXRpb246ICdpbmxpbmUnLFxuICAgIH0pXG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuczNDbGllbnQuc2VuZChjb21tYW5kKVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1c0NvZGU6IHJlc3BvbnNlPy4kbWV0YWRhdGE/Lmh0dHBTdGF0dXNDb2RlPy50b1N0cmluZygpLFxuICAgICAgdmVyc2lvbklkOiByZXNwb25zZT8uVmVyc2lvbklkLFxuICAgICAga2V5SWQ6IHJlc3BvbnNlPy5TU0VLTVNLZXlJZCxcbiAgICAgIHJlcXVlc3RJZDogcmVzcG9uc2U/LiRtZXRhZGF0YS5yZXF1ZXN0SWQsXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldE9iamVjdChzdG9yYWdlTmFtZTogc3RyaW5nLCBrZXk6IHN0cmluZyk6IFByb21pc2U8eyBib2R5OiBSZWFkYWJsZTsgbWV0YWRhdGE/OiBhbnkgfSB8IHVuZGVmaW5lZD4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjb21tYW5kID0gbmV3IEdldE9iamVjdENvbW1hbmQoe1xuICAgICAgICBCdWNrZXQ6IHN0b3JhZ2VOYW1lLFxuICAgICAgICBLZXk6IGRlY29kZVVSSUNvbXBvbmVudChrZXkucmVwbGFjZSgvXFwrL2csICcgJykpLFxuICAgICAgfSlcbiAgICAgIGNvbnN0IHsgQm9keSwgTWV0YWRhdGEgfSA9IGF3YWl0IHRoaXMuczNDbGllbnQuc2VuZChjb21tYW5kKVxuICAgICAgaWYgKCFCb2R5IHx8ICEoQm9keSBpbnN0YW5jZW9mIFJlYWRhYmxlKSkgdGhyb3cgbmV3IEVycm9yKCdGaWxlIG5vdCBmb3VuZCcpXG5cbiAgICAgIHJldHVybiB7IGJvZHk6IEJvZHksIG1ldGFkYXRhOiBNZXRhZGF0YSB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcignQnVja2V0JywgeyBlcnJvcjogZSB9KVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cbiAgfVxufVxuIl19