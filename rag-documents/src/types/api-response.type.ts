import { HttpStatus } from '../helpers/api.helper'
import { ErrorType } from './error.type'

export type ApiResponseType<T> = {
  message: string
  errors?: ErrorType[]
  content?: T
  statusCode?: HttpStatus
}
