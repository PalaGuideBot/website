import vine from '@vinejs/vine'

export const userRoleSchema = vine.object({
  name: vine.string(),
  label: vine.string(),
  priority: vine.number(),
  description: vine.string(),
})

export const userRoleValidator = vine.compile(userRoleSchema.clone())

export const userRolesValidator = vine.compile(vine.array(userRoleSchema.clone()))

const userSchema = vine.object({
  discordId: vine.string(),
  roles: vine.array(userRoleSchema.clone()),
  username: vine.string(),
  avatarUrl: vine.string(),
})

export const userValidator = vine.compile(userSchema.clone())

export const usersValidator = vine.compile(vine.array(userSchema.clone()))
