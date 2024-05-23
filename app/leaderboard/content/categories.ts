const categories = [
  'factions',
  'boss',
  'chorus',
  'clicker',
  'egghunt',
  'end',
  'koth',
  'money',
  'trixiumFaction',
  'trixiumPlayer',
] as const

export default categories

export type LeaderboardCategory = (typeof categories)[number]
