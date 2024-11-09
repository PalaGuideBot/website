import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { ApiService } from '#core/services/api'
import { createUserValidator, updateUserValidator } from '#staff/validators/staff_validator'

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
    await this.api.createUser(payload.discordId, payload.roles)

    return response.redirect().back()
  }

  async update({ request, response, params }: HttpContext) {
    const payload = await request.validateUsing(updateUserValidator)
    await this.api.updateUser(params.id, payload.roles)

    return response.redirect().back()
  }

  async destroy({ response, params }: HttpContext) {
    await this.api.deleteUser(params.id)

    return response.redirect().back()
  }
}
