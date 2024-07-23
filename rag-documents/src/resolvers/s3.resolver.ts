import S3Storage from '../infra/storage/s3-storage'

export const s3Resolver = () => {
  return new S3Storage()
}
