import type { ErrorType } from '../../types/error.type'
import { ReportException } from './report.exception'

export class NotFoundException extends ReportException {
  public httpCode = 404
  public code = 'not_found'

  constructor(message?: string, errors?: ErrorType[]) {
    super(message, errors)
    this.errors = errors || [{ code: this.code, message: message || this.code }]
  }
}
