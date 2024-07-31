import type { ErrorType } from '../../types/error.type'
import { ApplicationException } from './application.exception'

export class SystemException extends ApplicationException {
  public code = 'system_exception'

  constructor(message?: string, errors: ErrorType[] = []) {
    super(message, errors)
  }
}
