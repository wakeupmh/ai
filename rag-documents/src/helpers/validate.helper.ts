import { ZodError, z, ZodType } from 'zod'

import { BadRequestException } from '../infra/exceptions'

export async function validateRequest<T extends ZodType>(schema: T, objectToValidate: any): Promise<z.infer<T>> {
  try {
    return await schema.parseAsync(objectToValidate)
  } catch (error) {
    if (error instanceof ZodError) {
      throw new BadRequestException('bad request', error.issues)
    }
    throw new BadRequestException(JSON.stringify(error))
  }
}
