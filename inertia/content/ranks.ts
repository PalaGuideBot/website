import endiumIcon from '~/assets/rank-icons/endium.png'
import paladinIcon from '~/assets/rank-icons/paladin.png'
import titanIcon from '~/assets/rank-icons/titan.png'
import trixiumPlusIcon from '~/assets/rank-icons/trixium-plus.png'
import trixiumIcon from '~/assets/rank-icons/trixium.png'
import youtuberIcon from '~/assets/rank-icons/youtuber.png'
import streamerIcon from '~/assets/rank-icons/streamer.png'
import ingameIcon from '~/assets/rank-icons/ingame.png'
import palastaffIcon from '~/assets/rank-icons/palastaff.png'
import discordIcon from '~/assets/rank-icons/discord.png'
import graphisteIcon from '~/assets/rank-icons/graphiste.png'
import redacteurIcon from '~/assets/rank-icons/redaction.png'
import gamedesignIcon from '~/assets/rank-icons/gamedesign.png'
import developpeurIcon from '~/assets/rank-icons/developpeur.png'
import type { Rank } from '~/types'

export const icons: Record<Rank, string> = {
  'titan': titanIcon,
  'paladin': paladinIcon,
  'endium': endiumIcon,
  'trixium': trixiumIcon,
  'trixium+': trixiumPlusIcon,
  'youtuber': youtuberIcon,
  'streamer': streamerIcon,
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
}
