import { Exception } from '@adonisjs/core/exceptions'
import { errors } from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'
import ky, { HTTPError } from 'ky'

import {
  minecraftAccountLinkValidator,
  minecraftTokenLinkValidator,
} from '#core/validators/minecraft_valiadator'
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
import env from '#start/env'
import { botStatsValidator } from '#stats/validators/bot_validator'
import { factionInfoValidator } from '#stats/validators/faction_validator'
import { playerInfoValidator } from '#stats/validators/player_validator'
import { paladiumStatusValidator } from '#status/validators/status_validator'

const client = ky.create({
  prefixUrl: env.get('API_URL'),
  headers: { Authorization: `Bearer ${env.get('API_KEY')}`, Accept: 'application/json' },
})

export class ApiService {
  async getPlayer(username: string) {
    try {
      const response = await client.get(`players/${username}`)
      const data = (await response.json()) as Record<string, unknown>
      return playerInfoValidator.validate({ ...data, username })
    } catch (error) {
      if (error instanceof HTTPError && error.response.status === 404) {
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

  async getFaction(name: string) {
    try {
      const response = await client.get(`factions/${name}`)
      const data = await response.json()
      return factionInfoValidator.validate(data)
    } catch (error) {
      if (error instanceof HTTPError && error.response.status === 404) {
        throw new Exception(`Faction "${name}" not found`, {
          code: 'E_FACTION_NOT_FOUND',
          status: 404,
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
    category: T
  ): Promise<Infer<(typeof leaderboardValidators)[T]>> {
    try {
      if (!leaderboardCategories.includes(category)) {
        throw new Exception(`Leaderboard category "${category}" don't exists`, {
          code: 'E_BAD_CATEGORY',
          status: 400,
        })
      }
      const response = await client.get(`leaderboard/${category}`)
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
    category: T
  ): Promise<Infer<(typeof leaderboardTrixiumValidators)[T]>> {
    try {
      if (!trixiumLeaderboardCategories.includes(category)) {
        throw new Exception(`Leaderboard trixium category "${category}" don't exists`, {
          code: 'E_BAD_CATEGORY',
          status: 400,
        })
      }
      const response = await client.get(`leaderboard/trixium/${category}`)
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
      const response = await client.get('status/paladium', { timeout: 50000 })
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
}
