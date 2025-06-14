import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { ApiService } from '#core/services/api'
import { createUserValidator, updateUserValidator } from '#staff/validators/staff_validator'
import { Exception } from '@adonisjs/core/exceptions'

@inject()
export default class UserController {
  constructor(private api: ApiService) {}

  async index({ inertia }: HttpContext) {
    const users = await this.api.getUsers()
    const roles = await this.api.getRoles()

    return inertia.render('staff/users/index', { users, roles })
  }

  async create({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)
    await this.api.createUser(payload)

    return response.redirect().back()
  }

  async update({ request, response, params }: HttpContext) {
    const payload = await request.validateUsing(updateUserValidator)
    await this.api.updateUser(params.id, payload)

    return response.redirect().back()
  }

  async destroy({ response, params, auth }: HttpContext) {
    if (auth?.user.id === params.id) {
      throw new Exception('You cannot delete yourself', { status: 403 })
    }
    await this.api.deleteUser(params.id)

    return response.redirect().back()
  }
}
