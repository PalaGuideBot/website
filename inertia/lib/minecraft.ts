export function getSkinUrl(username: string) {
  return `https://mineskin.eu/skin/${username}`
}

export function getHeadUrl(username: string) {
  return `https://mc-heads.net/avatar/${username}/100`
}

export function getBustUrl(uuid: string) {
  return `https://skins.mcstats.com/bust/${uuid}?disableCosmeticType=all`
}

export function getFullBobyUrl(uuid: string, side: 'front' | 'back' | 'side' = 'side') {
  return `https://skins.mcstats.com/body/${side}/${uuid}`
}
