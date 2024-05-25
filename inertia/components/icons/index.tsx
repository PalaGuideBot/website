import { cn } from '~/lib/utils'

import ArrowRight from '~/assets/icons/arrow-right.png'
import SmallAlchemistJob from '~/assets/job-icons/alchemist-small.png'
import SmallFarmerJob from '~/assets/job-icons/farmer-small.png'
import SmallHunterJob from '~/assets/job-icons/hunter-small.png'
import SmallMinerJob from '~/assets/job-icons/miner-small.png'

export interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const iconFactory =
  (src: string) =>
  ({ className, ...props }: IconProps) => {
    return (
      <img
        src={src}
        className={cn('inline-block w-4 h-auto object-contain invert dark:invert-0', className)}
        {...props}
      />
    )
  }

export const ArrowRightIcon = iconFactory(ArrowRight)

export const SmallAlchemistJobIcon = iconFactory(SmallAlchemistJob)
export const SmallFarmerJobIcon = iconFactory(SmallFarmerJob)
export const SmallHunterJobIcon = iconFactory(SmallHunterJob)
export const SmallMinerJobIcon = iconFactory(SmallMinerJob)
