import vine from '@vinejs/vine'

import { userRoleValidator } from '#staff/validators/user_validator'

export const discordUserValidator = vine.compile(
  vine.object({
    id: vine.string(),
    name: vine.string(),
    globalName: vine.string(),
    nickName: vine.string(),
    avatarUrl: vine.string().url(),
    roles: vine.array(userRoleValidator.clone()).parse((value) => (value ? value : [])),
  })
)
