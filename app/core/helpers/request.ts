import type { HttpError } from '@adonisjs/core/types/http'

export function parseErrorsBag(error: HttpError) {
  const errorsBag = error.messages.reduce((result: Record<string, string[]>, message: any) => {
    if (result[message.field]) {
      result[message.field].push(message.message)
    } else {
      result[message.field] = [message.message]
    }
    return result
  }, {})

  return errorsBag
}
