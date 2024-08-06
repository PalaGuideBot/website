const categories = [
  'factions',
  'boss',
  'chorus',
  'clicker',
  'egghunt',
  'end',
  'koth',
  'money',
] as const

const trixiumCategories = ['faction', 'player'] as const

export { categories, trixiumCategories }

export type LeaderboardCategory = (typeof categories)[number]
export type LeaderboardTrixiumCategory = (typeof trixiumCategories)[number]
