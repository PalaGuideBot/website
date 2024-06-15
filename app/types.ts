import { discordUserValidator } from '#staff/validators/discord_user_validator'
import type { Infer } from '@vinejs/vine/types'

export type DiscordUser = Infer<typeof discordUserValidator>
