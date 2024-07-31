import { s3Resolver } from '../../resolvers/s3.resolver'
import BedrockRag from './bedrock'

const useCaseResolver = () => {
  const s3 = s3Resolver()
  return new BedrockRag(s3)
}

export const handler = async (event: any, context: any, callback: any) => {
  const useCase = useCaseResolver()

  try {
    console.log('event', event)
    console.log('context', context)
    const { body } = event
    const { query } = JSON.parse(body || '{}')

    await useCase.execute(query)

    return callback(null);
  } catch (error: any) {
    console.error(error)
    throw error
  }
}
