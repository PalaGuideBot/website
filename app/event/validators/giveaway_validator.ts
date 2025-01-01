import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

import { userSchema } from '#staff/validators/user_validator'

export const createGiveawayValidator = vine.compile(
  vine.object({
    title: vine.string(),
    start: vine
      .date()
      .transform((value) => DateTime.fromJSDate(value).toFormat('yyyy-MM-dd HH:mm:ss')),
    end: vine
      .date()
      .transform((value) => DateTime.fromJSDate(value).toFormat('yyyy-MM-dd HH:mm:ss')),
    prizes: vine.array(vine.string()),
  })
)

export const updateGiveawayValidator = vine.compile(
  vine.object({
    title: vine.string().optional(),
    start: vine
      .date()
      .optional()
      .transform((value) => DateTime.fromJSDate(value).toFormat('yyyy-MM-dd HH:mm:ss')),
    end: vine
      .date()
      .optional()
      .transform((value) => DateTime.fromJSDate(value).toFormat('yyyy-MM-dd HH:mm:ss')),
    active: vine.boolean().optional(),
    prizes: vine.array(vine.string()).optional(),
  })
)

const giveawaySchema = vine.object({
  _id: vine.string(),
  title: vine.string(),
  active: vine.boolean(),
  start: vine.string(),
  end: vine.string(),
  prizes: vine.array(vine.string()),
  participants: vine.array(userSchema.clone()),
  winners: vine.array(userSchema.clone()),
})

export const giveawayValidator = vine.compile(giveawaySchema.clone())

export const giveawaysValidator = vine.compile(vine.array(giveawaySchema.clone()))

export const giveawayStateValidator = vine.compile(
  vine.object({
    participated: vine.boolean(),
    linked: vine.boolean(),
  })
)

export const drawGiveawayValidator = vine.compile(
  vine.object({
    count: vine.number().parse((value) => Number(value || 1)),
  })
)
