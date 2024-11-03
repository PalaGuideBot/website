import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { parseErrorsBag } from '#core/helpers/request'
import { ApiService } from '#core/services/api'
import { calculatorOptionsValidator } from '#tools/validators/calculator_validator'

@inject()
export default class JobCalculatorController {
  constructor(private api: ApiService) {}

  async index({ inertia, request }: HttpContext) {
    const [optionsErrors, options] = await calculatorOptionsValidator.tryValidate(request.qs())
    let result = null

    if (options) {
      result = await this.api.calculateJob(options)
    }

    if (Object.values(request.qs()).length > 0 && optionsErrors) {
      inertia.share({ errors: parseErrorsBag(optionsErrors) })
    }

    return inertia.render('tools/job_calculator/index', { options, result })
  }
}
