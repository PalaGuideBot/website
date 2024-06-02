import { cn } from '~/lib/utils'

import ArrowRight from '~/assets/icons/arrow-right.png'

import SmallAlchemistJob from '~/assets/job-icons/alchemist-small.png'
import SmallFarmerJob from '~/assets/job-icons/farmer-small.png'
import SmallHunterJob from '~/assets/job-icons/hunter-small.png'
import SmallMinerJob from '~/assets/job-icons/miner-small.png'

import LeaderboardBoss from '~/assets/leaderboard-icons/boss.png'
import LeaderboardChorus from '~/assets/leaderboard-icons/chorus.png'
import LeaderboardClicker from '~/assets/leaderboard-icons/clicker.png'
import LeaderboardEgghunt from '~/assets/leaderboard-icons/egghunt.png'
import LeaderboardEnd from '~/assets/leaderboard-icons/end.png'
import LeaderboardKoth from '~/assets/leaderboard-icons/koth.png'
import LeaderboardMoney from '~/assets/leaderboard-icons/money.png'
import LeaderboardTrixium from '~/assets/leaderboard-icons/trixium.png'

import FactionSoleralt from '~/assets/faction-icons/soleratl.png'
import FactionMuzdan from '~/assets/faction-icons/muzdan.png'
import FactionManashino from '~/assets/faction-icons/manashino.png'
import FactionEvent from '~/assets/faction-icons/event.png'
import FactionLuccento from '~/assets/faction-icons/luccento.png'
import FactionImbali from '~/assets/faction-icons/imbali.png'
import FactionKeltis from '~/assets/faction-icons/keltis.png'
import FactionNeolith from '~/assets/faction-icons/neolith.png'
import FactionUntaa from '~/assets/faction-icons/untaa.png'

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

export const LeaderboardBossIcon = iconFactory(LeaderboardBoss)
export const LeaderboardChorusIcon = iconFactory(LeaderboardChorus)
export const LeaderboardClickerIcon = iconFactory(LeaderboardClicker)
export const LeaderboardEgghuntIcon = iconFactory(LeaderboardEgghunt)
export const LeaderboardEndIcon = iconFactory(LeaderboardEnd)
export const LeaderboardKothIcon = iconFactory(LeaderboardKoth)
export const LeaderboardMoneyIcon = iconFactory(LeaderboardMoney)
export const leaderboardTrixiumIcon = iconFactory(LeaderboardTrixium)

export const FactionSoleraltIcon = iconFactory(FactionSoleralt)
export const FactionMuzdanIcon = iconFactory(FactionMuzdan)
export const FactionManashinoIcon = iconFactory(FactionManashino)
export const FactionEventIcon = iconFactory(FactionEvent)
export const FactionLuccentoIcon = iconFactory(FactionLuccento)
export const FactionImbaliIcon = iconFactory(FactionImbali)
export const FactionKeltisIcon = iconFactory(FactionKeltis)
export const FactionNeolithIcon = iconFactory(FactionNeolith)
export const FactionUntaaIcon = iconFactory(FactionUntaa)
