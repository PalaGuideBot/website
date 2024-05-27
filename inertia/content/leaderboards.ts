import {
  LeaderboardBossIcon,
  LeaderboardChorusIcon,
  LeaderboardClickerIcon,
  LeaderboardEgghuntIcon,
  LeaderboardEndIcon,
  LeaderboardKothIcon,
  LeaderboardMoneyIcon,
  leaderboardTrixiumIcon,
  SmallAlchemistJobIcon,
  SmallFarmerJobIcon,
  SmallHunterJobIcon,
  SmallMinerJobIcon,
} from '~/components/icons'

export const icons = {
  boss: LeaderboardBossIcon,
  money: LeaderboardMoneyIcon,
  end: LeaderboardEndIcon,
  koth: LeaderboardKothIcon,
  chorus: LeaderboardChorusIcon,
  egghunt: LeaderboardEgghuntIcon,
  clicker: LeaderboardClickerIcon,
  job_miner: SmallMinerJobIcon,
  job_farmer: SmallFarmerJobIcon,
  job_hunter: SmallHunterJobIcon,
  job_alchemist: SmallAlchemistJobIcon,
  trixium: leaderboardTrixiumIcon,
} as const
