const categories = [
  'factions',
  'boss',
  'chorus',
  'clicker',
  'egghunt',
  'end',
  'koth',
  'money',
  'alliance',
  'job.miner',
  'job.farmer',
  'job.hunter',
  'job.alchemist',
] as const

const trixiumCategories = ['faction', 'player'] as const

export { categories, trixiumCategories }

export type LeaderboardCategory = (typeof categories)[number]
export type LeaderboardTrixiumCategory = (typeof trixiumCategories)[number]
