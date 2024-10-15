import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'
import { DateTime } from 'luxon'

type DistanceValidatorMeta = {
  from?: string
  to?: string
}

export const distanceValidator = vine.withMetaData<DistanceValidatorMeta>().compile(
  vine.object({
    from: vine
      .date({ formats: ['YYYY-MM-DD'] })
      .parse((value, { meta }) => {
        if (!value && meta.from) {
          return meta.from
        }
        return value
      })
      .optional()
      .transform((value) => DateTime.fromJSDate(value).toSQLDate()!),
    to: vine
      .date({ formats: ['YYYY-MM-DD'] })
      .parse((value, { meta }) => {
        if (!value && meta.to) {
          return meta.to
        }
        return value
      })
      .optional()
      .transform((value) => DateTime.fromJSDate(value).toSQLDate()!),
  })
)

export type DistanceFilter = Infer<typeof distanceValidator>
