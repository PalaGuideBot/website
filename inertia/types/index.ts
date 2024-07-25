export type Job = 'alchemist' | 'farmer' | 'hunter' | 'miner'

export type Rank =
  | 'titan'
  | 'paladin'
  | 'endium'
  | 'trixium'
  | 'trixium+'
  | 'youtuber'
  | 'streamer'
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

export type PaladiumStatus =
  | 'online'
  | 'offline'
  | 'maintenance'
  | 'running'
  | 'starting'
  | 'restarting'
  | 'stopping'
  | 'unknown'
  | 'whitelist'

export type PaladiumFaction =
  | 'Soleratl'
  | 'Muzdan'
  | 'Manashino'
  | 'Event'
  | 'Luccento'
  | 'Imbali'
  | 'Keltis'
  | 'Neolith'
  | 'Untaa'

export type Path = {
  title: string
  description: string
  path: string
  external?: boolean
}

export type ServerUsageInfo = {
  name: string
  pid: number
  memory: number
  cpu: number
  status: string
  created_at: string
  uptime: number
  date: string
}
