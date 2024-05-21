import { userInfoValidator } from '#core/validators/user_validator'
import env from '#start/env'
import { Exception } from '@adonisjs/core/exceptions'
import { errors } from '@vinejs/vine'
import ky, { HTTPError } from 'ky'

const client = ky.create({
  prefixUrl: env.get('API_URL'),
  headers: { Authorization: env.get('API_KEY'), Accept: 'application/json' },
})

export class ApiService {
  async getUser(username: string) {
    try {
      const response = await client.get(`user/${username}`)
      const data = (await response.json()) as Record<string, unknown>
      return await userInfoValidator.validate({ ...data, username })
    } catch (error) {
      if (error instanceof HTTPError && error.response.status === 404) {
        throw new Exception(`User "${username}" not found`, {
          code: 'E_USER_NOT_FOUND',
          status: 404,
        })
      }
      if (error instanceof errors.E_VALIDATION_ERROR) {
        throw new Exception('Invalid user data', {
          code: 'E_USER_INVALID',
          status: 500,
        })
      }
      throw error
    }
  }
}
