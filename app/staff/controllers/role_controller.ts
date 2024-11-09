import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { ApiService } from '#core/services/api'
import { createRoleValidator, updateRoleValidator } from '#staff/validators/staff_validator'

@inject()
export default class RoleController {
  constructor(private api: ApiService) {}

  async index({ inertia }: HttpContext) {
    const roles = await this.api.getRoles()

    return inertia.render('staff/roles/index', { roles })
  }

  async create({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createRoleValidator)
    await this.api.createRole(payload)

    return response.redirect().back()
  }

  async update({ request, response, params }: HttpContext) {
    const payload = await request.validateUsing(updateRoleValidator)
    await this.api.updateRole(params.name, payload)

    return response.redirect().back()
  }

  async destroy({ response, params }: HttpContext) {
    await this.api.deleteRole(params.name)

    return response.redirect().back()
  }
}
