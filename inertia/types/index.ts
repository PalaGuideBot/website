import { type JSONDataTypes } from '@adonisjs/core/types/transformers'
import { type Data } from '@generated/data'
import { type PropsWithChildren } from 'react'

export type Job = 'alchemist' | 'farmer' | 'hunter' | 'miner'

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

export type PaladiumFaction = 'Runegard' | 'Xanoth' | 'Egopolis' | 'Kilmordra' | 'Aeloria'

export type ProfileBanner =
  | 'build'
  | 'docs'
  | 'dune'
  | 'fac'
  | 'hole'
  | 'mast'
  | 'mine'
  | 'pillage'
  | 'pond'
  | 'pvp'
  | 'shore'
  | 'sword'

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

export type InertiaProps<T extends JSONDataTypes = {}> = PropsWithChildren<Data.SharedProps & T>
