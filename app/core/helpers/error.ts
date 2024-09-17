import type { Exception } from '@adonisjs/core/exceptions'
import type { HttpError } from '@adonisjs/core/types/http'

import type { PageError } from '#app/types'

export function createPageErrorFromException(error: Exception | HttpError): PageError {
  return {
    code: error.code || 'E_UNKNOWN_ERROR',
    status: error.status,
    message: error.message,
  }
}
