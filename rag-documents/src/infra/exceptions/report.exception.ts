import type { ErrorType } from '../../types/error.type'
import { ApplicationException } from './application.exception'

export class ReportException extends ApplicationException {
  public code = 'report_exception'

  constructor(message?: string, errors: ErrorType[] = []) {
    super(message, errors)
  }
}
