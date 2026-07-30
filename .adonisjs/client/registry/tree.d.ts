/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  leaderboard: {
    index: typeof routes['leaderboard.index']
    factions: {
      index: typeof routes['leaderboard.factions.index']
    }
    money: {
      index: typeof routes['leaderboard.money.index']
    }
    trixium: {
      index: typeof routes['leaderboard.trixium.index']
    }
    clicker: {
      index: typeof routes['leaderboard.clicker.index']
    }
    boss: {
      index: typeof routes['leaderboard.boss.index']
    }
    chorus: {
      index: typeof routes['leaderboard.chorus.index']
    }
    egghunt: {
      index: typeof routes['leaderboard.egghunt.index']
    }
    koth: {
      index: typeof routes['leaderboard.koth.index']
    }
    alliance: {
      index: typeof routes['leaderboard.alliance.index']
    }
    jobs: {
      index: typeof routes['leaderboard.jobs.index']
    }
  }
  stats: {
    players: {
      show: typeof routes['stats.players.show']
      jobs: typeof routes['stats.players.jobs']
      og: typeof routes['stats.players.og']
      search: typeof routes['stats.players.search']
      wrapped: typeof routes['stats.players.wrapped'] & {
        end: typeof routes['stats.players.wrapped.end']
      }
    }
    factions: {
      show: typeof routes['stats.factions.show']
    }
  }
  status: {
    index: typeof routes['status.index']
    paladium: {
      index: typeof routes['status.paladium.index']
    }
  }
  tools: {
    index: typeof routes['tools.index']
    clicker: {
      show: typeof routes['tools.clicker.show']
    }
    jobCalculator: {
      index: typeof routes['tools.job_calculator.index']
    }
    pogCalculator: {
      index: typeof routes['tools.pog_calculator.index']
    }
  }
  auth: {
    login: typeof routes['auth.login']
    redirect: typeof routes['auth.redirect']
    callback: typeof routes['auth.callback']
    profile: typeof routes['auth.profile']
    logout: typeof routes['auth.logout']
  }
  event: {
    index: typeof routes['event.index']
  }
  giveaway: {
    index: typeof routes['giveaway.index']
    participate: typeof routes['giveaway.participate']
    deleteParticipant: typeof routes['giveaway.delete_participant']
  }
  minecraft: {
    generateToken: typeof routes['minecraft.generateToken']
    unlinkAccount: typeof routes['minecraft.unlinkAccount']
  }
  staff: {
    dashboard: typeof routes['staff.dashboard']
    users: {
      index: typeof routes['staff.users.index']
      create: typeof routes['staff.users.create']
      update: typeof routes['staff.users.update']
      destroy: typeof routes['staff.users.destroy']
    }
    roles: {
      index: typeof routes['staff.roles.index']
      create: typeof routes['staff.roles.create']
      update: typeof routes['staff.roles.update']
      destroy: typeof routes['staff.roles.destroy']
    }
    giveaways: {
      index: typeof routes['staff.giveaways.index']
      create: typeof routes['staff.giveaways.create']
      update: typeof routes['staff.giveaways.update']
      destroy: typeof routes['staff.giveaways.destroy']
      draw: typeof routes['staff.giveaways.draw']
    }
  }
  eventStream: typeof routes['event_stream']
  subscribe: typeof routes['subscribe']
  unsubscribe: typeof routes['unsubscribe']
  home: typeof routes['home']
  informations: typeof routes['informations']
  discord: typeof routes['discord']
  privacy: typeof routes['privacy']
  terms: typeof routes['terms']
  changelog: typeof routes['changelog']
  knowEverything: typeof routes['know_everything']
  faq: typeof routes['faq']
  og: typeof routes['og']
}
