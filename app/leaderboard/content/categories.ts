const categories = [
  'factions',
  'boss',
  'chorus',
  'clicker',
  'egghunt',
  'end',
  'koth',
  'money',
  'trixfaction',
  'trixuser',
  'trixium',
] as const

export default categories

export type LeaderboardCategory = (typeof categories)[number]
