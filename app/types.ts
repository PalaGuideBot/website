import type { Infer } from '@vinejs/vine/types'

import type { discordUserValidator } from '#staff/validators/discord_user_validator'

export type DiscordUser = Infer<typeof discordUserValidator>

export type PageError = {
  code: string
  status: number
  message: string
}

export type ClientSeasonsFromProps = Record<string, { start: string; end: string }>

export type Rank =
  | 'SHOULD_BE_REMOVED_UNAVAILABLE'
  | 'default'
  | 'titan'
  | 'paladin'
  | 'endium'
  | 'divinity'
  | 'legende'
  | 'legend'
  | 'heros'
  | 'trixium'
  | 'trixium+'
  | 'premium'
  | 'rusher'
  | 'youtuber'
  | 'streamer'
  | 'helper'
  | 'supportconfirmé'
  | 'moderateurchat'
  | 'moderateur'
  | 'moderateursenior'
  | 'operateur'
  | 'operateurcertif'
  | 'operateursenior'
  | 'paladium-staff'
  | 'discord'
  | 'discord+'
  | 'graphistejunior'
  | 'graphiste'
  | 'création'
  | 'redacteur'
  | 'gamedesigner'
  | 'developpeurjunior'
  | 'developpeur'
  | 'developpeursenior'
  | 'graphistesenior'
  | 'responsable'
  | 'administrateur'
