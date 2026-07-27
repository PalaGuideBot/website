import vine from '@vinejs/vine'
import { type FieldContext } from '@vinejs/vine/types'

/**
 * Options accepted by the greaterThan rule
 */
type Options = {
  otherField: string
}

/**
 * Implementation
 */
async function greaterThan(value: unknown, options: Options, field: FieldContext) {
  /**
   * Skip if the field is not valid.
   */
  if (!field.isValid) {
    return
  }

  if (typeof value !== 'number') {
    return
  }

  const input = vine.helpers.getNestedValue(options.otherField, field)

  /**
   * Performing validation and reporting error
   */
  if (input > value) {
    field.report(
      'The {{ field }} field must be greater than {{ otherField }}',
      'greaterThan',
      field,
      options
    )
    return
  }
}

/**
 * Converting a function to a VineJS rule
 */
export const greaterThanRule = vine.createRule(greaterThan)
