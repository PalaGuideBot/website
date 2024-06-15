import vine from '@vinejs/vine'

export const discordUserValidator = vine.compile(
  vine.object({
    id: vine.string(),
    name: vine.string(),
    globalName: vine.string(),
    nickName: vine.string(),
    avatarUrl: vine.string().url(),
    email: vine.string().email(),
  })
)
