import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import type { Infer } from '@vinejs/vine/types'

import { parseErrorsBag } from '#core/helpers/request'
import { ApiService } from '#core/services/api'
import { calculatorOptionsValidator } from '#tools/validators/calculator_validator'

type CalculatorResult =
  | {
      state: 'IDLE'
    }
  | {
      state: 'STANDARD_SUBMITTED'
      options: Infer<typeof calculatorOptionsValidator>
      value: Awaited<ReturnType<ApiService['calculateJob']>>
    }
  | {
      state: 'REVERSE_SUBMITTED'
      options: Infer<typeof calculatorOptionsValidator>
      value: Awaited<ReturnType<ApiService['calculateJob']>>
    }

@inject()
export default class JobCalculatorController {
  constructor(private api: ApiService) {}

  async index({ inertia, request }: HttpContext) {
    const [optionsErrors, options] = await calculatorOptionsValidator.tryValidate(request.qs())
    const items = await this.api.getJobItems()

    let result: CalculatorResult = {
      state: 'IDLE',
    }

    if (options?.mode === 'standard') {
      result = {
        state: 'STANDARD_SUBMITTED',
        options,
        value: await this.api.calculateJob(options),
      }
    }

    if (options?.mode === 'reverse') {
      result = {
        state: 'REVERSE_SUBMITTED',
        options,
        value: await this.api.calculateJob(options),
      }
    }

    if (Object.values(request.qs()).length > 0 && optionsErrors) {
      inertia.share({ errors: parseErrorsBag(optionsErrors) })
    }

    return inertia.render('tools/job_calculator/index', { items, result })
  }
}
