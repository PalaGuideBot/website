import {
  LeaderboardBossIcon,
  LeaderboardChorusIcon,
  LeaderboardClickerIcon,
  LeaderboardEgghuntIcon,
  LeaderboardEndIcon,
  LeaderboardKothIcon,
  LeaderboardMoneyIcon,
  LeaderboardTrixiumIcon,
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
  trixium: LeaderboardTrixiumIcon,
} as const

export const graphColors = [
  '#7F0AB0',
  '#36C3F0',
  '#31CC2E',
  '#DF57BC',
  '#F21818',
  '#17B79A',
  '#C78F00',
  '#1647C3',
  '#8555EB',
  '#E3A062',
]
