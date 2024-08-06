import vine from '@vinejs/vine'

export const minecraftAccountLinkValidator = vine.compile(
  vine.object({
    message: vine.string(),
    uuid: vine.string().uuid(),
    username: vine.string(),
  })
)

export const minecraftTokenLinkValidator = vine.compile(
  vine.object({
    token: vine.string(),
    message: vine.string(),
    expiredAt: vine.number(),
  })
)
