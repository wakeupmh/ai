import type { ErrorType } from '../../types/error.type'
import { ReportException } from './report.exception'

export class ForbiddenError extends ReportException {
  public httpCode = 403
  public code = 'forbidden'

  constructor(message?: string, errors?: ErrorType[]) {
    super(message, errors)
    this.errors = errors || [{ code: this.code, message: message || this.code }]
  }
}
