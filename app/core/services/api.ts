import {
  minecraftAccountLinkValidator,
  minecraftTokenLinkValidator,
} from '#core/validators/minecraft_valiadator'
import {
  default as leaderboardCategories,
  type LeaderboardCategory,
} from '#leaderboard/content/categories'
import { validators as leaderboardValidators } from '#leaderboard/validators/leaderboard_validator'
import { staffStatisticsValidator } from '#staff/validators/staff_validator'
import env from '#start/env'
import { discordStatsValidator } from '#stats/validators/discord_validator'
import { factionInfoValidator } from '#stats/validators/faction_validator'
import { userInfoValidator } from '#stats/validators/user_validator'
import { paladiumStatusValidator } from '#status/validators/status_validator'
import { Exception } from '@adonisjs/core/exceptions'
import { errors } from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'
import ky, { HTTPError } from 'ky'

const client = ky.create({
  prefixUrl: env.get('API_URL'),
  headers: { Authorization: env.get('API_KEY'), Accept: 'application/json' },
})

export class ApiService {
  async getUser(username: string) {
    try {
      const response = await client.get(`players/${username}`)
      const data = (await response.json()) as Record<string, unknown>
      return await userInfoValidator.validate({ ...data, username })
    } catch (error) {
      if (error instanceof HTTPError && error.response.status === 404) {
        throw new Exception(`User "${username}" not found`, {
          code: 'E_USER_NOT_FOUND',
          status: 404,
        })
      }
      if (error instanceof errors.E_VALIDATION_ERROR) {
        throw new Exception('Invalid user data', {
          code: 'E_USER_INVALID',
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
      return await factionInfoValidator.validate(data)
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
      const response = await client.get('leaderboard/' + category)
      const data = await response.json()
      const validatedData = await leaderboardValidators[category].validate(data)
      return validatedData
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

  async getPaladiumStatus() {
    try {
      const response = await client.get('status')
      const data = await response.json()
      return await paladiumStatusValidator.validate(data)
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

  async getDiscordStatistics() {
    try {
      const response = await client.get('home')
      const data = await response.json()
      return await discordStatsValidator.validate(data)
    } catch (error: unknown) {
      throw new Exception('Invalid discord statistics data', {
        code: 'E_DISCORD_INVALID',
        status: 500,
      })
    }
  }

  async getStaffStatistics() {
    try {
      const response = await client.get('staff/statistics')
      const data = await response.json()
      return await staffStatisticsValidator.validate(data)
    } catch (error: unknown) {
      console.log(error)
      throw new Exception('Invalid staff statistics data', {
        code: 'E_STAFF_INVALID',
        status: 500,
      })
    }
  }

  async generateDiscordTokenLink(id: string) {
    try {
      const response = await client.post('minecraft/link/generateToken', {
        body: JSON.stringify({ discordId: id }),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json()
      return await minecraftTokenLinkValidator.validate(data)
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
      const response = await client.get(`minecraft/link/discord/${discordId}`)
      const data = await response.json()
      return await minecraftAccountLinkValidator.validate(data)
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
      await client.delete(`minecraft/link/discord/${discordId}`)
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
