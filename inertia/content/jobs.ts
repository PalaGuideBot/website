import alchemistIcon from '~/assets/job-icons/alchemist.png'
import farmerIcon from '~/assets/job-icons/farmer.png'
import hunterIcon from '~/assets/job-icons/hunter.png'
import minerIcon from '~/assets/job-icons/miner.png'
import {
  IconProps,
  SmallAlchemistJobIcon,
  SmallFarmerJobIcon,
  SmallHunterJobIcon,
  SmallMinerJobIcon,
} from '~/components/icons'
import type { Job } from '~/types'

export const icons: Record<Job, string> = {
  alchemist: alchemistIcon,
  farmer: farmerIcon,
  hunter: hunterIcon,
  miner: minerIcon,
}

export const smallIcons: Record<Job, React.FC<IconProps>> = {
  alchemist: SmallAlchemistJobIcon,
  farmer: SmallFarmerJobIcon,
  hunter: SmallHunterJobIcon,
  miner: SmallMinerJobIcon,
}
