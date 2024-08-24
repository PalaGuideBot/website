export type Job = 'alchemist' | 'farmer' | 'hunter' | 'miner'

export type Rank =
  | 'default'
  | 'titan'
  | 'paladin'
  | 'endium'
  | 'legende'
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
  | 'responsable'

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

type PM2Status = 'online' | 'stopping' | 'stopped' | 'launching' | 'errored' | 'one-launch-status'

export type ServerUsageInfo = {
  name: string
  pid: number
  memory: number
  cpu: number
  status: PM2Status
  created_at: string
  uptime: number
  date: string
}
