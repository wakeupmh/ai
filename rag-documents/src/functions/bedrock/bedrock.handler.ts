import { s3Resolver } from "../../resolvers/s3.resolver"
import BedrockRag from "./bedrock"

const useCaseResolver = () => {
  const s3 = s3Resolver()
  return new BedrockRag(s3)
}

export const handler = async (event: any) => {
  const useCase = useCaseResolver()

  try {
    await useCase.execute(event.Payload)

    return {
      ...event.Payload,
    }
  } catch (error: any) {
    console.error(error)
    throw error
  }
}
