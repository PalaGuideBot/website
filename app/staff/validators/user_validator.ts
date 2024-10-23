import vine from '@vinejs/vine'

export const userRoleValidator = vine.object({
  name: vine.string(),
  label: vine.string(),
  priority: vine.number(),
  description: vine.string(),
})

export const userValidator = vine.compile(
  vine.object({
    discordId: vine.string(),
    roles: vine.array(userRoleValidator.clone()),
  })
)
