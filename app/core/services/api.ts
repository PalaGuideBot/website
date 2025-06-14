import { Exception } from '@adonisjs/core/exceptions'
import { errors } from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'
import ky, { HTTPError } from 'ky'

import type { DistanceFilter } from '#core/validators/filter_validator'
import {
  minecraftAccountLinkValidator,
  minecraftTokenLinkValidator,
} from '#core/validators/minecraft_valiadator'
import {
  dailyEventsValidator,
  eventFactionOnYourMarksValidator,
  eventFactionQuestValidator,
} from '#event/validators/event_validator'
import {
  createGiveawayValidator,
  giveawayStateValidator,
  giveawaysValidator,
  giveawayValidator,
  updateGiveawayValidator,
} from '#event/validators/giveaway_validator'
import {
  categories as leaderboardCategories,
  trixiumCategories as trixiumLeaderboardCategories,
  type LeaderboardCategory,
  type LeaderboardTrixiumCategory,
} from '#leaderboard/content/categories'
import {
  trixiumValidators as leaderboardTrixiumValidators,
  validators as leaderboardValidators,
} from '#leaderboard/validators/leaderboard_validator'
import { usageStatisticsValidator } from '#staff/validators/staff_validator'
import {
  userRolesValidator,
  userRoleValidator,
  usersValidator,
  userValidator,
} from '#staff/validators/user_validator'
import env from '#start/env'
import { botStatsValidator } from '#stats/validators/bot_validator'
import { factionInfoValidator } from '#stats/validators/faction_validator'
import {
  latestPlayerDataValidator,
  playerClickerDataValidator,
  playerInfoValidator,
  playerJobsValidator,
  playerWrappedValidator,
} from '#stats/validators/player_validator'
import { paladiumStatusValidator } from '#status/validators/status_validator'
import {
  calculatorOptionsValidator as calculatorJobOptionsValidator,
  calculatorResultValidator as calculatorJobResultValidator,
} from '#tools/validators/calculator_validator'
import {
  calculatorItemsValidator,
  calculatorOptionsValidator as calculatorPogOptionsValidator,
  calculatorResultValidator as calculatorPogResultValidator,
} from '#tools/validators/pog_validator'
import { upgradesValidator } from '#tools/validators/upgrade_validator'
import { paladiumSeasonValidator } from '#core/validators/paladium_validator'

const client = ky.create({
  prefixUrl: env.get('API_URL'),
  headers: { Authorization: `Bearer ${env.get('API_KEY')}`, Accept: 'application/json' },
  timeout: 50000,
})

export class ApiService {
  async getPlayer(username: string, options?: { from?: string; to?: string } | null) {
    const parsedOptions = new URLSearchParams(options || {})
    try {
      const response = await client.get(`players/${username}`, {
        searchParams: parsedOptions,
      })
      const data = (await response.json()) as Record<string, unknown>
      return playerInfoValidator.validate({ ...data, username })
    } catch (error) {
      if (error instanceof HTTPError) {
        throw new Exception(`Player "${username}" not found`, {
          code: 'E_PLAYER_NOT_FOUND',
          status: 404,
        })
      }
      if (error instanceof errors.E_VALIDATION_ERROR) {
        throw new Exception('Invalid player data', {
          code: 'E_PLAYER_INVALID',
          status: 500,
        })
      }
      throw error
    }
  }

  async getPlayerClickerData(username: string) {
    try {
      const response = await client.get(`players/${username}/clicker`)
      const data = await response.json()
      return playerClickerDataValidator.validate(data)
    } catch (error) {
      if (error instanceof HTTPError) {
        throw new Exception(`Player "${username}" not found`, {
          code: 'E_PLAYER_NOT_FOUND',
          status: 404,
        })
      }
      if (error instanceof errors.E_VALIDATION_ERROR) {
        throw new Exception('Invalid player data', {
          code: 'E_PLAYER_INVALID',
          status: 500,
        })
      }
      throw error
    }
  }

  async getPlayerJobs(username: string) {
    try {
      const response = await client.get(`players/${username}/jobs`)
      const data = await response.json()
      return playerJobsValidator.validate(data)
    } catch (error) {
      if (error instanceof HTTPError) {
        throw new Exception(`Player "${username}" not found`, {
          code: 'E_PLAYER_NOT_FOUND',
          status: 404,
        })
      }
      if (error instanceof errors.E_VALIDATION_ERROR) {
        throw new Exception('Invalid player jobs data', {
          code: 'E_PLAYER_JOBS_INVALID',
          status: 500,
        })
      }
      throw error
    }
  }

  async getPlayerWrapped(username: string) {
    try {
      const response = await client.get(`players/${username}/wrapped`)
      const data = await response.json()
      return playerWrappedValidator.validate(data)
    } catch (error) {
      console.log(await error.response.json())
      if (error instanceof HTTPError) {
        throw new Exception(`Player "${username}" not found`, {
          code: 'E_PLAYER_NOT_FOUND',
          status: 404,
        })
      }
      if (error instanceof errors.E_VALIDATION_ERROR) {
        throw new Exception('Invalid player wrapped data', {
          code: 'E_PLAYER_WRAPPED_INVALID',
          status: 500,
        })
      }
      throw error
    }
  }

  async getLatestPlayers() {
    try {
      const response = await client.get('players', { searchParams: { latest: 'true' } })
      const data = await response.json()
      return latestPlayerDataValidator.validate(data)
    } catch (error: unknown) {
      return []
    }
  }

  async getFaction(name: string) {
    try {
      const response = await client.get(`factions/${name}`)
      const data = await response.json()
      return factionInfoValidator.validate(data)
    } catch (error) {
      if (error instanceof HTTPError) {
        throw new Exception(`Faction "${name}" not found`, {
          code: 'E_FACTION_NOT_FOUND',
          status: error.response.status,
        })
      }
      if (error instanceof errors.E_VALIDATION_ERROR) {
        throw new Exception('Invalid faction data', {
          code: 'E_FACTION_INVALID',
          status: 500,
        })
      }
      throw error
    }
  }

  async getLeaderboard<T extends LeaderboardCategory>(
    category: T,
    options?: Partial<DistanceFilter> | null
  ): Promise<Infer<(typeof leaderboardValidators)[T]>> {
    const parsedOptions = new URLSearchParams(options || {})
    try {
      if (!leaderboardCategories.includes(category)) {
        throw new Exception(`Leaderboard category "${category}" don't exists`, {
          code: 'E_BAD_CATEGORY',
          status: 400,
        })
      }
      const response = await client.get(`leaderboard/${category}`, { searchParams: parsedOptions })
      const data = await response.json()
      return leaderboardValidators[category].validate(data)
    } catch (error: unknown) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        throw new Exception(`Invalid leaderboard data for category "${category}"`, {
          code: 'E_LEADERBOARD_INVALID',
          status: 500,
        })
      }
      throw error
    }
  }

  async getLeaderboardTrixium<T extends LeaderboardTrixiumCategory>(
    category: T,
    options?: Partial<DistanceFilter> | null
  ): Promise<Infer<(typeof leaderboardTrixiumValidators)[T]>> {
    const parsedOptions = new URLSearchParams(options || {})
    try {
      if (!trixiumLeaderboardCategories.includes(category)) {
        throw new Exception(`Leaderboard trixium category "${category}" don't exists`, {
          code: 'E_BAD_CATEGORY',
          status: 400,
        })
      }
      const response = await client.get(`leaderboard/trixium/${category}`, {
        searchParams: parsedOptions,
      })
      const data = await response.json()
      return leaderboardTrixiumValidators[category].validate(data)
    } catch (error: unknown) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        throw new Exception(`Invalid leaderboard trixium data for category "${category}"`, {
          code: 'E_LEADERBOARD_TRIXIUM_INVALID',
          status: 500,
        })
      }
      throw error
    }
  }

  async getPaladiumStatus() {
    try {
      const response = await client.get('status/paladium')
      const data = await response.json()
      return paladiumStatusValidator.validate(data)
    } catch (error: unknown) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        throw new Exception('Invalid paladium status data', {
          code: 'E_PALADIUM_STATUS_INVALID',
          status: 500,
        })
      }
      throw error
    }
  }

  async getBotStatistics() {
    try {
      const response = await client.get('bot/statistics')
      const data = await response.json()
      return botStatsValidator.validate(data)
    } catch (error: unknown) {
      throw new Exception('Invalid bot statistics data', {
        code: 'E_BOT_INVALID',
        status: 500,
      })
    }
  }

  async getUsageStatistics() {
    try {
      const response = await client.get('usage/statistics')
      const data = await response.json()
      return usageStatisticsValidator.validate(data)
    } catch (error: unknown) {
      throw new Exception('Invalid usage statistics data', {
        code: 'E_STAFF_INVALID',
        status: 500,
      })
    }
  }

  async generateDiscordTokenLink(id: string) {
    try {
      const response = await client.post('link/generate-token', {
        body: JSON.stringify({ discordId: id }),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json()
      return minecraftTokenLinkValidator.validate(data)
    } catch (error: unknown) {
      if (error instanceof HTTPError && error.response.status === 400) {
        throw new Exception('Discord account already linked', {
          code: 'E_DISCORD_ALREADY_LINKED',
          status: 400,
        })
      }
      throw new Exception('Invalid link data', {
        code: 'E_DISCORD_ACCOUNT_LINK_INVALID',
        status: 500,
      })
    }
  }

  async getMinecraftAccountLinked(discordId: string) {
    try {
      const response = await client.get(`link/discord/${discordId}`)
      const data = await response.json()
      return minecraftAccountLinkValidator.validate(data)
    } catch (error: unknown) {
      if (error instanceof HTTPError && error.response.status === 400) {
        throw new Exception('Discord account not linked', {
          code: 'E_DISCORD_NOT_LINKED',
          status: 400,
        })
      }
      throw new Exception('Invalid link data', {
        code: 'E_DISCORD_ACCOUNT_LINK_INVALID',
        status: 500,
      })
    }
  }

  async unlinkMinecraftAccount(discordId: string) {
    try {
      await client.delete(`link/discord/${discordId}`)
    } catch (error: unknown) {
      if (error instanceof HTTPError && error.response.status === 400) {
        throw new Exception('Discord account not linked', {
          code: 'E_DISCORD_NOT_LINKED',
          status: 400,
        })
      }
      throw error
    }
  }

  async getEventFactionQuest() {
    try {
      const response = await client.get('events/qdf')
      const data = await response.json()
      return eventFactionQuestValidator.validate(data)
    } catch (error: unknown) {
      throw new Exception('Invalid event faction quest data', {
        code: 'E_EVENT_FACTION_QUEST_INVALID',
        status: 500,
      })
    }
  }

  async getEventFactionOnYourMarks() {
    try {
      const response = await client.get('events/on-your-marks')
      const data = await response.json()
      return eventFactionOnYourMarksValidator.validate(data)
    } catch (error: unknown) {
      throw new Exception('Invalid event faction on your marks data', {
        code: 'E_EVENT_FACTION_ON_YOUR_MARKS_INVALID',
        status: 500,
      })
    }
  }

  async getDailyEvents() {
    try {
      const response = await client.get('events/daily')
      const data = await response.json()
      return dailyEventsValidator.validate(data)
    } catch (error: unknown) {
      throw new Exception('Invalid daily events data', {
        code: 'E_DAILY_EVENTS_INVALID',
        status: 500,
      })
    }
  }

  async getClickerUpgrades() {
    try {
      const response = await client.get('utils/clicker/upgrades')
      const data = await response.json()
      return upgradesValidator.validate(data)
    } catch (error: unknown) {
      throw new Exception('Invalid clicker upgrades data', {
        code: 'E_CLICKER_UPGRADES_INVALID',
        status: 500,
      })
    }
  }

  async createUser(payload: {
    discordId: string
    username: string
    avatarUrl: string
    roles?: string[]
  }) {
    try {
      const response = await client.post('users', {
        body: JSON.stringify({ ...payload, roles: payload.roles || [] }),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json()
      return userValidator.validate(data)
    } catch (error: unknown) {
      throw new Exception('Unable to create user', {
        code: 'E_USER_CREATE_INVALID',
        status: 500,
      })
    }
  }

  async updateUser(
    discordId: string,
    payload: {
      username?: string
      avatarUrl?: string
      roles?: string[]
    }
  ) {
    try {
      const response = await client.put(`users/${discordId}`, {
        body: JSON.stringify({ ...payload, roles: payload.roles || [] }),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json()
      return userValidator.validate(data)
    } catch (error: unknown) {
      throw new Exception('Unable to update user', {
        code: 'E_USER_UPDATE_INVALID',
        status: 500,
      })
    }
  }

  async deleteUser(discordId: string) {
    try {
      await client.delete(`users/${discordId}`)
    } catch (error: unknown) {
      throw new Exception('Unable to delete user', {
        code: 'E_USER_DELETE_INVALID',
        status: 500,
      })
    }
  }

  async getUsers() {
    try {
      const response = await client.get('users')
      const data = await response.json()
      return usersValidator.validate(data)
    } catch (error: unknown) {
      throw new Exception('Unable retreive users', {
        code: 'E_USERS_INVALID',
        status: 500,
      })
    }
  }

  async getUser(discordId: string) {
    try {
      const response = await client.get(`users/${discordId}`)
      const data = await response.json()
      const [, result] = await userValidator.tryValidate(data)
      return result
    } catch (error: unknown) {
      return null
    }
  }

  async createRole(payload: Infer<typeof userRoleValidator>) {
    try {
      const response = await client.post('roles', {
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json()
      return userRoleValidator.validate(data)
    } catch (error: unknown) {
      throw new Exception('Unable to create role', {
        code: 'E_ROLE_CREATE_INVALID',
        status: 500,
      })
    }
  }

  async updateRole(name: string, payload: Partial<Infer<typeof userRoleValidator>>) {
    try {
      const response = await client.put(`roles/${name}`, {
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json()
      return userRoleValidator.validate(data)
    } catch (error: unknown) {
      throw new Exception('Unable to update role', {
        code: 'E_ROLE_UPDATE_INVALID',
        status: 500,
      })
    }
  }

  async deleteRole(name: string) {
    try {
      await client.delete(`roles/${name}`)
    } catch (error: unknown) {
      throw new Exception('Unable to delete role', {
        code: 'E_ROLE_DELETE_INVALID',
        status: 500,
      })
    }
  }

  async getRoles() {
    try {
      const response = await client.get('roles')
      const data = await response.json()
      return userRolesValidator.validate(data)
    } catch (error: unknown) {
      throw new Exception('Unable retreive roles', {
        code: 'E_ROLES_INVALID',
        status: 500,
      })
    }
  }

  async getRole(name: string) {
    try {
      const response = await client.get(`roles/${name}`)
      const data = await response.json()
      const [, result] = await userRoleValidator.tryValidate(data)
      return result
    } catch (error: unknown) {
      return null
    }
  }

  async calculateJob(options: Infer<typeof calculatorJobOptionsValidator>) {
    try {
      const response = await client.post('utils/jobs/calculate', {
        body: JSON.stringify({ body: options }),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json()
      return calculatorJobResultValidator.validate(data)
    } catch (error: unknown) {
      throw new Exception('Invalid job calculation data', {
        code: 'E_JOB_CALCULATION_INVALID',
        status: 500,
      })
    }
  }

  async calculatePog(options: Infer<typeof calculatorPogOptionsValidator>) {
    try {
      const response = await client.post('utils/pog/calculate', {
        body: JSON.stringify({ body: options }),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json()
      return calculatorPogResultValidator.validate(data)
    } catch (error: unknown) {
      throw new Exception('Invalid pog calculation data', {
        code: 'E_POG_CALCULATION_INVALID',
        status: 500,
      })
    }
  }

  async getPogItems() {
    try {
      const response = await client.get('utils/pog/items')
      const data = await response.json()
      return calculatorItemsValidator.validate(data)
    } catch (error: unknown) {
      throw new Exception('Invalid pog items data', {
        code: 'E_POG_ITEMS_INVALID',
        status: 500,
      })
    }
  }

  async getActiveGiveaway() {
    try {
      const response = await client.get('giveaways/active')
      const data = await response.json()
      return giveawayValidator.validate(data)
    } catch (error: unknown) {
      return null
    }
  }

  async getUserGiveawayState(id: string, discordId: string) {
    try {
      const response = await client.get(`giveaways/${id}/state/${discordId}`)
      const data = await response.json()
      return giveawayStateValidator.validate(data)
    } catch (error: unknown) {
      return { participated: false, linked: false }
    }
  }

  async participateGiveaway(id: string, discordId: string) {
    try {
      await client.post(`giveaways/${id}/participate`, {
        body: JSON.stringify({ id: discordId }),
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error: unknown) {
      throw new Exception('Unable to participate to giveaway', {
        code: 'E_GIVEAWAY_PARTICIPATE_INVALID',
        status: 500,
      })
    }
  }

  async getGiveaways() {
    try {
      const response = await client.get('giveaways')
      const data = await response.json()
      return giveawaysValidator.validate(data)
    } catch (error: unknown) {
      throw new Exception('Unable retreive giveaways', {
        code: 'E_GIVEAWAYS_INVALID',
        status: 500,
      })
    }
  }

  async createGiveaway(payload: Infer<typeof createGiveawayValidator>) {
    try {
      await client.post('giveaways', {
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      })
      // const data = await response.json()
      // return giveawayValidator.validate(data)
    } catch (error: unknown) {
      if (error instanceof HTTPError) {
        console.log(await error.response.json())
      }
      throw new Exception('Unable to create giveaway', {
        code: 'E_GIVEAWAY_CREATE_INVALID',
        status: 500,
      })
    }
  }

  async updateGiveaway(id: string, payload: Infer<typeof updateGiveawayValidator>) {
    try {
      await client.put(`giveaways/${id}`, {
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      })
      // const data = await response.json()
      // return giveawayValidator.validate(data)
    } catch (error: unknown) {
      throw new Exception('Unable to update giveaway', {
        code: 'E_GIVEAWAY_UPDATE_INVALID',
        status: 500,
      })
    }
  }

  async deleteGiveaway(id: string) {
    try {
      await client.delete(`giveaways/${id}`)
    } catch (error: unknown) {
      throw new Exception('Unable to delete giveaway', {
        code: 'E_GIVEAWAY_DELETE_INVALID',
        status: 500,
      })
    }
  }

  async drawGiveaway(id: string, count: number) {
    try {
      await client.post(`giveaways/${id}/draw`, {
        body: JSON.stringify({ count }),
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error: unknown) {
      throw new Exception('Unable to draw giveaway', {
        code: 'E_GIVEAWAY_DRAW_INVALID',
        status: 500,
      })
    }
  }

  async checkGiveaway() {
    try {
      const response = await client.get('giveaways/check')
      const data = await response.json<{ active: boolean }>()
      return data.active
    } catch (error: unknown) {
      return false
    }
  }

  async deleteGiveawayParticipant(id: string, discordId: string) {
    try {
      await client.post(`giveaways/${id}/leave`, {
        body: JSON.stringify({ id: discordId }),
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error: unknown) {
      throw new Exception('Unable to remove user to giveaway', {
        code: 'E_GIVEAWAY_LEAVE_INVALID',
        status: 500,
      })
    }
  }

  async getPaladiumSeasons() {
    try {
      const response = await client.get('paladium/seasons')
      const data = await response.json()
      return paladiumSeasonValidator.validate(data)
    } catch (error: unknown) {
      throw new Exception('Unable retreive paladium seasons', {
        code: 'E_PALADIUM_SEASONS_INVALID',
        status: 500,
      })
    }
  }
}
