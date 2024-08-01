import { Readable } from "stream";

import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { PutObjectResponse, StorageInterface } from "./storage.interface";

export default class S3Storage implements StorageInterface {
  private readonly s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({ region: process.env.AWS_REGION });
  }

  async putObject(
    storageName: string,
    key: string,
    file: any,
    encoding?: string,
    contentType?: string,
  ): Promise<PutObjectResponse> {
    const command = new PutObjectCommand({
      Bucket: storageName,
      Key: key,
      Body: file,
      ContentEncoding: encoding,
      ContentType: contentType,
      ContentDisposition: "inline",
    });

    const response = await this.s3Client.send(command);

    return {
      statusCode: response?.$metadata?.httpStatusCode?.toString(),
      versionId: response?.VersionId,
      keyId: response?.SSEKMSKeyId,
      requestId: response?.$metadata.requestId,
    };
  }

  public async getObject(
    storageName: string,
    key: string,
  ): Promise<{ body: Readable; metadata?: any } | undefined> {
    try {
      const command = new GetObjectCommand({
        Bucket: storageName,
        Key: decodeURIComponent(key.replace(/\+/g, " ")),
      });
      const { Body, Metadata } = await this.s3Client.send(command);
      if (!Body || !(Body instanceof Readable))
        throw new Error("File not found");

      return { body: Body, metadata: Metadata };
    } catch (e) {
      console.error("Bucket", { error: e });
      return undefined;
    }
  }
}
