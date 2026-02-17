import type { Rank } from '#app/types'
import adminIcon from '~/assets/rank-icons/admin.png'
import developpeurIcon from '~/assets/rank-icons/developpeur.png'
import discordIcon from '~/assets/rank-icons/discord.png'
import divinityIcon from '~/assets/rank-icons/divinity.png'
import endiumIcon from '~/assets/rank-icons/endium.png'
import gamedesignIcon from '~/assets/rank-icons/gamedesign.png'
import graphisteIcon from '~/assets/rank-icons/graphiste.png'
import herosIcon from '~/assets/rank-icons/heros.png'
import ingameIcon from '~/assets/rank-icons/ingame.png'
import legendIcon from '~/assets/rank-icons/legende.png'
import paladinIcon from '~/assets/rank-icons/paladin.png'
import palastaffIcon from '~/assets/rank-icons/palastaff.png'
import premiumIcon from '~/assets/rank-icons/premium.png'
import redacteurIcon from '~/assets/rank-icons/redaction.png'
import rusherIcon from '~/assets/rank-icons/rusher.png'
import streamerIcon from '~/assets/rank-icons/streamer.png'
import titanIcon from '~/assets/rank-icons/titan.png'
import trixiumPlusIcon from '~/assets/rank-icons/trixium-plus.png'
import trixiumIcon from '~/assets/rank-icons/trixium.png'
import youtuberIcon from '~/assets/rank-icons/youtuber.png'
import affiliateIcon from '~/assets/rank-icons/affiliate.png'

const icons: Record<Rank, string | null> = {
  'SHOULD_BE_REMOVED_UNAVAILABLE': null,
  'default': null,
  'titan': titanIcon,
  'paladin': paladinIcon,
  'endium': endiumIcon,
  'divinity': divinityIcon,
  'legend': endiumIcon,
  'heros': herosIcon,
  'legende': legendIcon,
  'trixium': trixiumIcon,
  'trixium+': trixiumPlusIcon,
  'premium': premiumIcon,
  'rusher': rusherIcon,
  'youtuber': youtuberIcon,
  'streamer': streamerIcon,
  'affiliate': affiliateIcon,
  'helper': ingameIcon,
  'supportconfirmé': ingameIcon,
  'moderateurchat': ingameIcon,
  'moderateur': ingameIcon,
  'moderateursenior': ingameIcon,
  'operateur': ingameIcon,
  'operateurcertif': ingameIcon,
  'operateursenior': ingameIcon,
  'paladium-staff': palastaffIcon,
  'discord': discordIcon,
  'discord+': discordIcon,
  'graphistejunior': graphisteIcon,
  'graphiste': graphisteIcon,
  'création': graphisteIcon,
  'redacteur': redacteurIcon,
  'gamedesigner': gamedesignIcon,
  'developpeurjunior': developpeurIcon,
  'developpeur': developpeurIcon,
  'developpeursenior': developpeurIcon,
  'graphistesenior': graphisteIcon,
  'responsable': adminIcon,
  'administrateur': adminIcon,
}

export function rankToIcon(rank: Rank) {
  return icons[rank]
}
