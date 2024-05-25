import endiumIcon from '~/assets/rank-icons/endium.png'
import paladinIcon from '~/assets/rank-icons/paladin.png'
import titanIcon from '~/assets/rank-icons/titan.png'
import trixiumPlusIcon from '~/assets/rank-icons/trixium-plus.png'
import trixiumIcon from '~/assets/rank-icons/trixium.png'
import type { Rank } from '~/types'

export const icons: Record<Rank, string> = {
  'titan': titanIcon,
  'paladin': paladinIcon,
  'endium': endiumIcon,
  'trixium': trixiumIcon,
  'trixium+': trixiumPlusIcon,
}
