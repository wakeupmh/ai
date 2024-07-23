import { s3Resolver } from "../../resolvers/s3.resolver"
import { GPTRag } from "./gpt"

const useCaseResolver = () => {
  const s3 = s3Resolver()
  return new GPTRag(s3)
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
