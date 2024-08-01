import { Readable } from 'stream'

export type PutObjectResponse = {
  statusCode?: string
  versionId?: string
  keyId?: string
  requestId?: string
}

export interface StorageInterface {
  putObject(
    storageName: string,
    key: string,
    file: any,
    encoding?: string,
    contentType?: string,
  ): Promise<PutObjectResponse>

  getObject(storageName: string, key: string): Promise<{ body: Readable; metadata?: any } | undefined>
}
