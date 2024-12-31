import vine from '@vinejs/vine'

import { userSchema } from '#staff/validators/user_validator'

export const createGiveawayValidator = vine.compile(
  vine.object({
    title: vine.string(),
    start: vine.date(),
    end: vine.date(),
    prizes: vine.array(vine.string()),
  })
)

export const updateGiveawayValidator = vine.compile(
  vine.object({
    title: vine.string().optional(),
    start: vine.date().optional(),
    end: vine.date().optional(),
    prizes: vine.array(vine.string()).optional(),
  })
)

export const giveawayValidator = vine.compile(
  vine.object({
    _id: vine.string(),
    title: vine.string(),
    start: vine.string(),
    end: vine.string(),
    prizes: vine.array(vine.string()),
    participants: vine.array(userSchema.clone()),
    winners: vine.array(userSchema.clone()),
  })
)

export const giveawayStateValidator = vine.compile(
  vine.object({
    participated: vine.boolean(),
    linked: vine.boolean(),
  })
)
