import type { Infer } from '@vinejs/vine/types'

import { discordUserValidator } from '#staff/validators/discord_user_validator'

export type DiscordUser = Infer<typeof discordUserValidator>

export type PageError = {
  code: string
  status: number
  message: string
}
