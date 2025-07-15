export function getSkinUrl(username: string) {
  return `https://mineskin.eu/skin/${username}`
}

export function getHeadUrl(username: string) {
  return `https://api.paladium.games/v1/global/launcher/session/minecraft/skin/${username}/avatar/100`
}

export function getBustUrl(uuid: string) {
  return `https://skins.mcstats.com/bust/${uuid}?disableCosmeticType=all`
}

export function getFullBobyUrl(uuid: string, side: 'front' | 'back' | 'side' = 'side') {
  return `https://skins.mcstats.com/body/${side}/${uuid}`
}

export function getMinecraftItemUrl(id: string) {
  return `https://image.palaguidebot.fr/minecraft/items/${id}`
}

export function removeColorCodes(text: string) {
  return text.replace(/§[0-9a-fklmnor]/g, '')
}
