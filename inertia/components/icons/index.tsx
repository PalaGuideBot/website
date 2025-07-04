import { cn } from '~/lib/utils'

import Elo from '~/assets/elo-icons/8.png'
import ArrowRight from '~/assets/icons/arrow-right.png'
import Boss from '~/assets/icons/boss.png'
import Coin from '~/assets/icons/coin.png'
import ProfileToggleDisabled from '~/assets/icons/profile-toggle-disabled.png'
import Question from '~/assets/icons/question.png'
import Xp from '~/assets/icons/xp.png'

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
import LeaderboardAlliance from '~/assets/leaderboard-icons/alliance.png'

import FactionAeloria from '~/assets/faction-icons/aeloria.png'
import FactionEgopolis from '~/assets/faction-icons/egopolis.png'
import FactionEvent from '~/assets/faction-icons/event.png'
import FactionKilmordra from '~/assets/faction-icons/kilmordra.png'
import FactionRunegard from '~/assets/faction-icons/runegard.png'
import FactionXanoth from '~/assets/faction-icons/xanoth.png'

import AllianceChaos from '~/assets/icons/alliance-chaos.png'
import AllianceOrder from '~/assets/icons/alliance-order.png'

import MarketMoney from '~/assets/icons/market-money.png'
import MarketPb from '~/assets/icons/market-pb.png'

export interface IconProps extends React.ComponentProps<'img'> {}

const iconFactory =
  (src: string) =>
  ({ className, ...props }: IconProps) => {
    return (
      <img
        src={src}
        alt="Icon image"
        className={cn('inline-block w-4 h-auto object-contain', className)}
        {...props}
      />
    )
  }

export const ArrowRightIcon = iconFactory(ArrowRight)
export const BossIcon = iconFactory(Boss)
export const MoneyIcon = iconFactory(LeaderboardMoney)
export const XpIcon = iconFactory(Xp)
export const QuestionIcon = iconFactory(Question)
export const EloIcon = iconFactory(Elo)
export const ProfileToggleDisabledIcon = iconFactory(ProfileToggleDisabled)
export const CoinIcon = iconFactory(Coin)

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
export const LeaderboardTrixiumIcon = iconFactory(LeaderboardTrixium)
export const LeaderboardAllianceIcon = iconFactory(LeaderboardAlliance)

export const FactionAeloriaIcon = iconFactory(FactionAeloria)
export const FactionEgopolisIcon = iconFactory(FactionEgopolis)
export const FactionEventIcon = iconFactory(FactionEvent)
export const FactionKilmordraIcon = iconFactory(FactionKilmordra)
export const FactionRunegardIcon = iconFactory(FactionRunegard)
export const FactionXanothIcon = iconFactory(FactionXanoth)

export const AllianceChaosIcon = iconFactory(AllianceChaos)
export const AllianceOrderIcon = iconFactory(AllianceOrder)

export const MarketMoneyIcon = iconFactory(MarketMoney)
export const MarketPbIcon = iconFactory(MarketPb)

export const DiscordIcon = ({
  fill = 'currentColor',
  height = 24,
  width = 24,
  ...props
}: React.ComponentProps<'svg'>) => {
  return (
    <svg
      fill={fill}
      height={height}
      width={width}
      {...props}
      viewBox="0 0 25 19"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.7602 15.4335L18.5511 14.9794C14.6374 16.7815 10.3731 16.7828 6.40897 14.9791C6.24964 14.9058 6.0023 14.8897 5.80393 15.0549C5.7393 15.1023 5.67597 15.1511 5.61808 15.1957L5.61541 15.1977C5.54887 15.249 5.4892 15.2949 5.43061 15.3374L5.39887 15.3604L5.3711 15.3881C5.24034 15.5185 5.19083 15.6905 5.19973 15.8414C5.20879 15.995 5.28726 16.1994 5.49691 16.3119C6.00909 16.6007 6.53047 16.86 7.07264 17.0893C6.81844 17.5496 6.53898 17.9951 6.23754 18.4259C4.39171 17.8273 2.52484 16.9483 0.585644 15.5541C0.199829 11.1038 1.07111 6.61493 4.13991 1.98759C5.58021 1.33265 7.10943 0.845694 8.70967 0.545087C8.88288 0.866108 9.05604 1.22328 9.17879 1.52054L9.32819 1.88238L9.71531 1.82414C11.5601 1.54664 13.4362 1.54664 15.281 1.82414L15.6639 1.88174L15.8155 1.52544C15.9392 1.23473 16.1128 0.871484 16.2812 0.546273C17.888 0.848432 19.4307 1.33802 20.863 1.99576C23.5405 5.97354 24.8685 10.4283 24.4112 15.5537C22.4632 16.9543 20.5881 17.8349 18.7243 18.4336C18.4298 18.0041 18.1517 17.5598 17.8934 17.1006C18.4293 16.8777 18.9545 16.6253 19.4606 16.3259C19.6418 16.2329 19.758 16.0537 19.7698 15.8532C19.7814 15.6572 19.6923 15.4767 19.5478 15.3628C19.4785 15.3064 19.4101 15.2537 19.3475 15.2054L19.3452 15.2037C19.2831 15.1558 19.2266 15.1122 19.171 15.0672C18.9643 14.8836 18.6994 14.9052 18.5371 14.9861L18.7602 15.4335ZM18.7602 15.4335C14.7125 17.2974 10.2957 17.2974 6.20037 15.4335L18.8436 15.4454C18.8198 15.4216 18.784 15.4216 18.7602 15.4335ZM5.60512 10.4354C5.60512 12.0488 6.80372 13.4523 8.35519 13.4523C9.93299 13.4523 11.1042 12.0465 11.1052 10.4376C11.118 8.83647 9.94439 7.41861 8.35519 7.41861C6.77668 7.41861 5.60512 8.8257 5.60512 10.4354ZM13.903 10.4354C13.903 12.0488 15.1016 13.4523 16.653 13.4523C18.2443 13.4523 19.4021 12.0446 19.4031 10.4376C19.4159 8.83647 18.2422 7.41861 16.653 7.41861C15.0745 7.41861 13.903 8.8257 13.903 10.4354Z" />
    </svg>
  )
}
