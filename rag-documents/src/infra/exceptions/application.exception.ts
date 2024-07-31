import type { ErrorType } from '../../types/error.type'

export class ApplicationException extends Error {
  public httpCode = 500
  public code = 'application_exception'
  public errors: ErrorType[] = []

  constructor(message?: string, errors: ErrorType[] = []) {
    super(message)
    this.errors = errors
  }
}
