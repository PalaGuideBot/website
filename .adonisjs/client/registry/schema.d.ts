/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'leaderboard.index': {
    methods: ["GET","HEAD"]
    pattern: '/leaderboard'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'leaderboard.factions.index': {
    methods: ["GET","HEAD"]
    pattern: '/leaderboard/factions'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#core/validators/filter_validator').distanceValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/leaderboard/controllers/factions_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/leaderboard/controllers/factions_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'leaderboard.money.index': {
    methods: ["GET","HEAD"]
    pattern: '/leaderboard/money'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#core/validators/filter_validator').distanceValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/leaderboard/controllers/money_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/leaderboard/controllers/money_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'leaderboard.trixium.index': {
    methods: ["GET","HEAD"]
    pattern: '/leaderboard/trixium'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#core/validators/filter_validator').distanceValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/leaderboard/controllers/trixium_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/leaderboard/controllers/trixium_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'leaderboard.clicker.index': {
    methods: ["GET","HEAD"]
    pattern: '/leaderboard/clicker'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#core/validators/filter_validator').distanceValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/leaderboard/controllers/clicker_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/leaderboard/controllers/clicker_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'leaderboard.boss.index': {
    methods: ["GET","HEAD"]
    pattern: '/leaderboard/boss'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#core/validators/filter_validator').distanceValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/leaderboard/controllers/boss_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/leaderboard/controllers/boss_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'leaderboard.chorus.index': {
    methods: ["GET","HEAD"]
    pattern: '/leaderboard/chorus'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#core/validators/filter_validator').distanceValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/leaderboard/controllers/chorus_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/leaderboard/controllers/chorus_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'leaderboard.egghunt.index': {
    methods: ["GET","HEAD"]
    pattern: '/leaderboard/egghunt'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#core/validators/filter_validator').distanceValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/leaderboard/controllers/egghunt_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/leaderboard/controllers/egghunt_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'leaderboard.koth.index': {
    methods: ["GET","HEAD"]
    pattern: '/leaderboard/koth'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#core/validators/filter_validator').distanceValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/leaderboard/controllers/koth_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/leaderboard/controllers/koth_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'leaderboard.alliance.index': {
    methods: ["GET","HEAD"]
    pattern: '/leaderboard/alignement'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#core/validators/filter_validator').distanceValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/leaderboard/controllers/alliance_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/leaderboard/controllers/alliance_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'leaderboard.jobs.index': {
    methods: ["GET","HEAD"]
    pattern: '/leaderboard/jobs'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#core/validators/filter_validator').distanceValidator)>|InferInput<(typeof import('#leaderboard/validators/leaderboard_validator').jobQueryValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/leaderboard/controllers/jobs_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/leaderboard/controllers/jobs_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'stats.players.show': {
    methods: ["GET","HEAD"]
    pattern: '/players/:username?'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#core/validators/filter_validator').distanceValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/stats/controllers/player_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/stats/controllers/player_controller').default['show']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'stats.players.jobs': {
    methods: ["POST"]
    pattern: '/players/:username/jobs'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { username: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/stats/controllers/player_controller').default['jobs']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/stats/controllers/player_controller').default['jobs']>>>
    }
  }
  'stats.players.og': {
    methods: ["GET","HEAD"]
    pattern: '/players/:username/og'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { username: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/stats/controllers/player_controller').default['openGraph']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/stats/controllers/player_controller').default['openGraph']>>>
    }
  }
  'stats.players.search': {
    methods: ["POST"]
    pattern: '/players/search'
    types: {
      body: ExtractBody<InferInput<(typeof import('#stats/validators/player_validator').playerSearchQueryValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#stats/validators/player_validator').playerSearchQueryValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/stats/controllers/player_controller').default['search']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/stats/controllers/player_controller').default['search']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'stats.factions.show': {
    methods: ["GET","HEAD"]
    pattern: '/factions/:name?'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/stats/controllers/faction_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/stats/controllers/faction_controller').default['show']>>>
    }
  }
  'stats.players.wrapped': {
    methods: ["GET","HEAD"]
    pattern: '/wrapped/:username?'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/stats/controllers/player_controller').default['wrapped']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/stats/controllers/player_controller').default['wrapped']>>>
    }
  }
  'stats.players.wrapped.end': {
    methods: ["GET","HEAD"]
    pattern: '/wrapped/:username/end'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { username: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/stats/controllers/player_controller').default['wrappedEnd']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/stats/controllers/player_controller').default['wrappedEnd']>>>
    }
  }
  'status.index': {
    methods: ["GET","HEAD"]
    pattern: '/status'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'status.paladium.index': {
    methods: ["GET","HEAD"]
    pattern: '/status/paladium'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/status/controllers/paladium_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/status/controllers/paladium_controller').default['index']>>>
    }
  }
  'tools.index': {
    methods: ["GET","HEAD"]
    pattern: '/tools'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'tools.clicker.show': {
    methods: ["GET","HEAD"]
    pattern: '/tools/clicker/:username?'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#tools/controller/clicker_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#tools/controller/clicker_controller').default['show']>>>
    }
  }
  'tools.job_calculator.index': {
    methods: ["GET","HEAD"]
    pattern: '/tools/job-calculator'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#tools/controller/job_calculator_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#tools/controller/job_calculator_controller').default['index']>>>
    }
  }
  'tools.pog_calculator.index': {
    methods: ["GET","HEAD"]
    pattern: '/tools/pog-calculator'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#tools/controller/pog_calculator_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#tools/controller/pog_calculator_controller').default['index']>>>
    }
  }
  'auth.login': {
    methods: ["GET","HEAD"]
    pattern: '/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/controllers/auth_controller').default['login']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/controllers/auth_controller').default['login']>>>
    }
  }
  'auth.redirect': {
    methods: ["GET","HEAD"]
    pattern: '/auth/redirect'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/controllers/auth_controller').default['redirect']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/controllers/auth_controller').default['redirect']>>>
    }
  }
  'auth.callback': {
    methods: ["GET","HEAD"]
    pattern: '/auth/callback'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/controllers/auth_controller').default['callback']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/controllers/auth_controller').default['callback']>>>
    }
  }
  'auth.profile': {
    methods: ["GET","HEAD"]
    pattern: '/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/controllers/auth_controller').default['profile']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/controllers/auth_controller').default['profile']>>>
    }
  }
  'auth.logout': {
    methods: ["GET","HEAD"]
    pattern: '/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/controllers/auth_controller').default['logout']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/controllers/auth_controller').default['logout']>>>
    }
  }
  'event.index': {
    methods: ["GET","HEAD"]
    pattern: '/events'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/event/controllers/event_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/event/controllers/event_controller').default['index']>>>
    }
  }
  'giveaway.index': {
    methods: ["GET","HEAD"]
    pattern: '/giveaway'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/event/controllers/giveaway_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/event/controllers/giveaway_controller').default['index']>>>
    }
  }
  'giveaway.participate': {
    methods: ["POST"]
    pattern: '/giveaway/participate'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/event/controllers/giveaway_controller').default['participate']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/event/controllers/giveaway_controller').default['participate']>>>
    }
  }
  'minecraft.generateToken': {
    methods: ["POST"]
    pattern: '/minecraft/link/generate-token'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/controllers/minecraft_controller').default['generateToken']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/controllers/minecraft_controller').default['generateToken']>>>
    }
  }
  'minecraft.unlinkAccount': {
    methods: ["DELETE"]
    pattern: '/minecraft/unlink'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/controllers/minecraft_controller').default['unlinkAccount']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/controllers/minecraft_controller').default['unlinkAccount']>>>
    }
  }
  'staff.dashboard': {
    methods: ["GET","HEAD"]
    pattern: '/staff'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/staff/controllers/dashboard_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/staff/controllers/dashboard_controller').default['index']>>>
    }
  }
  'staff.users.index': {
    methods: ["GET","HEAD"]
    pattern: '/staff/users'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/staff/controllers/user_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/staff/controllers/user_controller').default['index']>>>
    }
  }
  'staff.users.create': {
    methods: ["POST"]
    pattern: '/staff/users'
    types: {
      body: ExtractBody<InferInput<(typeof import('#staff/validators/staff_validator').createUserValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#staff/validators/staff_validator').createUserValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/staff/controllers/user_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/staff/controllers/user_controller').default['create']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'staff.users.update': {
    methods: ["PUT"]
    pattern: '/staff/users/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#staff/validators/staff_validator').updateUserValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#staff/validators/staff_validator').updateUserValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/staff/controllers/user_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/staff/controllers/user_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'staff.users.destroy': {
    methods: ["DELETE"]
    pattern: '/staff/users/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/staff/controllers/user_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/staff/controllers/user_controller').default['destroy']>>>
    }
  }
  'staff.roles.index': {
    methods: ["GET","HEAD"]
    pattern: '/staff/roles'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/staff/controllers/role_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/staff/controllers/role_controller').default['index']>>>
    }
  }
  'staff.roles.create': {
    methods: ["POST"]
    pattern: '/staff/roles'
    types: {
      body: ExtractBody<InferInput<(typeof import('#staff/validators/staff_validator').createRoleValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#staff/validators/staff_validator').createRoleValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/staff/controllers/role_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/staff/controllers/role_controller').default['create']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'staff.roles.update': {
    methods: ["PUT"]
    pattern: '/staff/roles/:name'
    types: {
      body: ExtractBody<InferInput<(typeof import('#staff/validators/staff_validator').updateRoleValidator)>>
      paramsTuple: [ParamValue]
      params: { name: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#staff/validators/staff_validator').updateRoleValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/staff/controllers/role_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/staff/controllers/role_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'staff.roles.destroy': {
    methods: ["DELETE"]
    pattern: '/staff/roles/:name'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { name: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/staff/controllers/role_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/staff/controllers/role_controller').default['destroy']>>>
    }
  }
  'staff.giveaways.index': {
    methods: ["GET","HEAD"]
    pattern: '/staff/giveaways'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/staff/controllers/giveaway_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/staff/controllers/giveaway_controller').default['index']>>>
    }
  }
  'staff.giveaways.create': {
    methods: ["POST"]
    pattern: '/staff/giveaways'
    types: {
      body: ExtractBody<InferInput<(typeof import('#event/validators/giveaway_validator').createGiveawayValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#event/validators/giveaway_validator').createGiveawayValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/staff/controllers/giveaway_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/staff/controllers/giveaway_controller').default['create']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'staff.giveaways.update': {
    methods: ["PUT"]
    pattern: '/staff/giveaways/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#event/validators/giveaway_validator').updateGiveawayValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#event/validators/giveaway_validator').updateGiveawayValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/staff/controllers/giveaway_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/staff/controllers/giveaway_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'staff.giveaways.destroy': {
    methods: ["DELETE"]
    pattern: '/staff/giveaways/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/staff/controllers/giveaway_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/staff/controllers/giveaway_controller').default['destroy']>>>
    }
  }
  'staff.giveaways.draw': {
    methods: ["POST"]
    pattern: '/staff/giveaways/:id/draw'
    types: {
      body: ExtractBody<InferInput<(typeof import('#event/validators/giveaway_validator').drawGiveawayValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#event/validators/giveaway_validator').drawGiveawayValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/staff/controllers/giveaway_controller').default['draw']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/staff/controllers/giveaway_controller').default['draw']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'giveaway.delete_participant': {
    methods: ["DELETE"]
    pattern: '/staff/giveaways/:id/participants/:participantId'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { id: ParamValue; participantId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/staff/controllers/giveaway_controller').default['deleteParticipant']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/staff/controllers/giveaway_controller').default['deleteParticipant']>>>
    }
  }
  'event_stream': {
    methods: ["GET","HEAD"]
    pattern: '/__transmit/events'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'subscribe': {
    methods: ["POST"]
    pattern: '/__transmit/subscribe'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'unsubscribe': {
    methods: ["POST"]
    pattern: '/__transmit/unsubscribe'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'home': {
    methods: ["GET","HEAD"]
    pattern: '/'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/controllers/page_controller').default['home']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/controllers/page_controller').default['home']>>>
    }
  }
  'informations': {
    methods: ["GET","HEAD"]
    pattern: '/informations'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/controllers/page_controller').default['informations']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/controllers/page_controller').default['informations']>>>
    }
  }
  'discord': {
    methods: ["GET","HEAD"]
    pattern: '/discord'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/controllers/page_controller').default['discord']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/controllers/page_controller').default['discord']>>>
    }
  }
  'privacy': {
    methods: ["GET","HEAD"]
    pattern: '/privacy'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/controllers/page_controller').default['privacy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/controllers/page_controller').default['privacy']>>>
    }
  }
  'terms': {
    methods: ["GET","HEAD"]
    pattern: '/terms'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/controllers/page_controller').default['terms']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/controllers/page_controller').default['terms']>>>
    }
  }
  'changelog': {
    methods: ["GET","HEAD"]
    pattern: '/changelog'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/controllers/page_controller').default['changelog']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/controllers/page_controller').default['changelog']>>>
    }
  }
  'know_everything': {
    methods: ["GET","HEAD"]
    pattern: '/know-everything'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/controllers/page_controller').default['know_everything']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/controllers/page_controller').default['know_everything']>>>
    }
  }
  'faq': {
    methods: ["GET","HEAD"]
    pattern: '/faq'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/controllers/page_controller').default['faq']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/controllers/page_controller').default['faq']>>>
    }
  }
  'og': {
    methods: ["GET","HEAD"]
    pattern: '/og'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/controllers/page_controller').default['openGraph']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/controllers/page_controller').default['openGraph']>>>
    }
  }
}
