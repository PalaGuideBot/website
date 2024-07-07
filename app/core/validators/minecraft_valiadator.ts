import vine from '@vinejs/vine'

export const minecraftAccountLink = vine.compile(
  vine.object({
    message: vine.string(),
    UUID: vine.string().uuid(),
  })
)
