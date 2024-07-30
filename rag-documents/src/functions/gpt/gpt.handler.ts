import { APIGatewayEvent } from "aws-lambda"
import { s3Resolver } from "../../resolvers/s3.resolver"
import { GPTRag } from "./gpt"

const useCaseResolver = () => {
  const s3 = s3Resolver()
  return new GPTRag(s3)
}

export const handler = async (event: APIGatewayEvent) => {
  const useCase = useCaseResolver()

  try {
    const { body } = event
    const query = JSON.parse(body || '{}')

    await useCase.execute(query)
  } catch (error: any) {
    console.error(error)
    throw error
  }
}
