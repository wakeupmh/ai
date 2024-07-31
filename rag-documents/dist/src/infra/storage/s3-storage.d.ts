/// <reference types="node" />
import { Readable } from 'stream';
import { PutObjectResponse, StorageInterface } from '../../interfaces/storage.interface';
export default class S3Storage implements StorageInterface {
    private readonly s3Client;
    constructor();
    putObject(storageName: string, key: string, file: any, encoding?: string, contentType?: string): Promise<PutObjectResponse>;
    getObject(storageName: string, key: string): Promise<{
        body: Readable;
        metadata?: any;
    } | undefined>;
}
