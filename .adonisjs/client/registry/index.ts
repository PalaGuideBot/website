/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'leaderboard.index': {
    methods: ["GET","HEAD"],
    pattern: '/leaderboard',
    tokens: [{"old":"/leaderboard","type":0,"val":"leaderboard","end":""}],
    types: placeholder as Registry['leaderboard.index']['types'],
  },
  'leaderboard.factions.index': {
    methods: ["GET","HEAD"],
    pattern: '/leaderboard/factions',
    tokens: [{"old":"/leaderboard/factions","type":0,"val":"leaderboard","end":""},{"old":"/leaderboard/factions","type":0,"val":"factions","end":""}],
    types: placeholder as Registry['leaderboard.factions.index']['types'],
  },
  'leaderboard.money.index': {
    methods: ["GET","HEAD"],
    pattern: '/leaderboard/money',
    tokens: [{"old":"/leaderboard/money","type":0,"val":"leaderboard","end":""},{"old":"/leaderboard/money","type":0,"val":"money","end":""}],
    types: placeholder as Registry['leaderboard.money.index']['types'],
  },
  'leaderboard.trixium.index': {
    methods: ["GET","HEAD"],
    pattern: '/leaderboard/trixium',
    tokens: [{"old":"/leaderboard/trixium","type":0,"val":"leaderboard","end":""},{"old":"/leaderboard/trixium","type":0,"val":"trixium","end":""}],
    types: placeholder as Registry['leaderboard.trixium.index']['types'],
  },
  'leaderboard.clicker.index': {
    methods: ["GET","HEAD"],
    pattern: '/leaderboard/clicker',
    tokens: [{"old":"/leaderboard/clicker","type":0,"val":"leaderboard","end":""},{"old":"/leaderboard/clicker","type":0,"val":"clicker","end":""}],
    types: placeholder as Registry['leaderboard.clicker.index']['types'],
  },
  'leaderboard.boss.index': {
    methods: ["GET","HEAD"],
    pattern: '/leaderboard/boss',
    tokens: [{"old":"/leaderboard/boss","type":0,"val":"leaderboard","end":""},{"old":"/leaderboard/boss","type":0,"val":"boss","end":""}],
    types: placeholder as Registry['leaderboard.boss.index']['types'],
  },
  'leaderboard.chorus.index': {
    methods: ["GET","HEAD"],
    pattern: '/leaderboard/chorus',
    tokens: [{"old":"/leaderboard/chorus","type":0,"val":"leaderboard","end":""},{"old":"/leaderboard/chorus","type":0,"val":"chorus","end":""}],
    types: placeholder as Registry['leaderboard.chorus.index']['types'],
  },
  'leaderboard.egghunt.index': {
    methods: ["GET","HEAD"],
    pattern: '/leaderboard/egghunt',
    tokens: [{"old":"/leaderboard/egghunt","type":0,"val":"leaderboard","end":""},{"old":"/leaderboard/egghunt","type":0,"val":"egghunt","end":""}],
    types: placeholder as Registry['leaderboard.egghunt.index']['types'],
  },
  'leaderboard.koth.index': {
    methods: ["GET","HEAD"],
    pattern: '/leaderboard/koth',
    tokens: [{"old":"/leaderboard/koth","type":0,"val":"leaderboard","end":""},{"old":"/leaderboard/koth","type":0,"val":"koth","end":""}],
    types: placeholder as Registry['leaderboard.koth.index']['types'],
  },
  'leaderboard.alliance.index': {
    methods: ["GET","HEAD"],
    pattern: '/leaderboard/alignement',
    tokens: [{"old":"/leaderboard/alignement","type":0,"val":"leaderboard","end":""},{"old":"/leaderboard/alignement","type":0,"val":"alignement","end":""}],
    types: placeholder as Registry['leaderboard.alliance.index']['types'],
  },
  'leaderboard.jobs.index': {
    methods: ["GET","HEAD"],
    pattern: '/leaderboard/jobs',
    tokens: [{"old":"/leaderboard/jobs","type":0,"val":"leaderboard","end":""},{"old":"/leaderboard/jobs","type":0,"val":"jobs","end":""}],
    types: placeholder as Registry['leaderboard.jobs.index']['types'],
  },
  'stats.players.show': {
    methods: ["GET","HEAD"],
    pattern: '/players/:username?',
    tokens: [{"old":"/players/:username?","type":0,"val":"players","end":""},{"old":"/players/:username?","type":3,"val":"username","end":""}],
    types: placeholder as Registry['stats.players.show']['types'],
  },
  'stats.players.jobs': {
    methods: ["POST"],
    pattern: '/players/:username/jobs',
    tokens: [{"old":"/players/:username/jobs","type":0,"val":"players","end":""},{"old":"/players/:username/jobs","type":1,"val":"username","end":""},{"old":"/players/:username/jobs","type":0,"val":"jobs","end":""}],
    types: placeholder as Registry['stats.players.jobs']['types'],
  },
  'stats.players.og': {
    methods: ["GET","HEAD"],
    pattern: '/players/:username/og',
    tokens: [{"old":"/players/:username/og","type":0,"val":"players","end":""},{"old":"/players/:username/og","type":1,"val":"username","end":""},{"old":"/players/:username/og","type":0,"val":"og","end":""}],
    types: placeholder as Registry['stats.players.og']['types'],
  },
  'stats.players.search': {
    methods: ["POST"],
    pattern: '/players/search',
    tokens: [{"old":"/players/search","type":0,"val":"players","end":""},{"old":"/players/search","type":0,"val":"search","end":""}],
    types: placeholder as Registry['stats.players.search']['types'],
  },
  'stats.factions.show': {
    methods: ["GET","HEAD"],
    pattern: '/factions/:name?',
    tokens: [{"old":"/factions/:name?","type":0,"val":"factions","end":""},{"old":"/factions/:name?","type":3,"val":"name","end":""}],
    types: placeholder as Registry['stats.factions.show']['types'],
  },
  'stats.players.wrapped': {
    methods: ["GET","HEAD"],
    pattern: '/wrapped/:username?',
    tokens: [{"old":"/wrapped/:username?","type":0,"val":"wrapped","end":""},{"old":"/wrapped/:username?","type":3,"val":"username","end":""}],
    types: placeholder as Registry['stats.players.wrapped']['types'],
  },
  'stats.players.wrapped.end': {
    methods: ["GET","HEAD"],
    pattern: '/wrapped/:username/end',
    tokens: [{"old":"/wrapped/:username/end","type":0,"val":"wrapped","end":""},{"old":"/wrapped/:username/end","type":1,"val":"username","end":""},{"old":"/wrapped/:username/end","type":0,"val":"end","end":""}],
    types: placeholder as Registry['stats.players.wrapped.end']['types'],
  },
  'status.index': {
    methods: ["GET","HEAD"],
    pattern: '/status',
    tokens: [{"old":"/status","type":0,"val":"status","end":""}],
    types: placeholder as Registry['status.index']['types'],
  },
  'status.paladium.index': {
    methods: ["GET","HEAD"],
    pattern: '/status/paladium',
    tokens: [{"old":"/status/paladium","type":0,"val":"status","end":""},{"old":"/status/paladium","type":0,"val":"paladium","end":""}],
    types: placeholder as Registry['status.paladium.index']['types'],
  },
  'tools.index': {
    methods: ["GET","HEAD"],
    pattern: '/tools',
    tokens: [{"old":"/tools","type":0,"val":"tools","end":""}],
    types: placeholder as Registry['tools.index']['types'],
  },
  'tools.clicker.show': {
    methods: ["GET","HEAD"],
    pattern: '/tools/clicker/:username?',
    tokens: [{"old":"/tools/clicker/:username?","type":0,"val":"tools","end":""},{"old":"/tools/clicker/:username?","type":0,"val":"clicker","end":""},{"old":"/tools/clicker/:username?","type":3,"val":"username","end":""}],
    types: placeholder as Registry['tools.clicker.show']['types'],
  },
  'tools.job_calculator.index': {
    methods: ["GET","HEAD"],
    pattern: '/tools/job-calculator',
    tokens: [{"old":"/tools/job-calculator","type":0,"val":"tools","end":""},{"old":"/tools/job-calculator","type":0,"val":"job-calculator","end":""}],
    types: placeholder as Registry['tools.job_calculator.index']['types'],
  },
  'tools.pog_calculator.index': {
    methods: ["GET","HEAD"],
    pattern: '/tools/pog-calculator',
    tokens: [{"old":"/tools/pog-calculator","type":0,"val":"tools","end":""},{"old":"/tools/pog-calculator","type":0,"val":"pog-calculator","end":""}],
    types: placeholder as Registry['tools.pog_calculator.index']['types'],
  },
  'auth.login': {
    methods: ["GET","HEAD"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.login']['types'],
  },
  'auth.redirect': {
    methods: ["GET","HEAD"],
    pattern: '/auth/redirect',
    tokens: [{"old":"/auth/redirect","type":0,"val":"auth","end":""},{"old":"/auth/redirect","type":0,"val":"redirect","end":""}],
    types: placeholder as Registry['auth.redirect']['types'],
  },
  'auth.callback': {
    methods: ["GET","HEAD"],
    pattern: '/auth/callback',
    tokens: [{"old":"/auth/callback","type":0,"val":"auth","end":""},{"old":"/auth/callback","type":0,"val":"callback","end":""}],
    types: placeholder as Registry['auth.callback']['types'],
  },
  'auth.profile': {
    methods: ["GET","HEAD"],
    pattern: '/profile',
    tokens: [{"old":"/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['auth.profile']['types'],
  },
  'auth.logout': {
    methods: ["GET","HEAD"],
    pattern: '/logout',
    tokens: [{"old":"/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.logout']['types'],
  },
  'event.index': {
    methods: ["GET","HEAD"],
    pattern: '/events',
    tokens: [{"old":"/events","type":0,"val":"events","end":""}],
    types: placeholder as Registry['event.index']['types'],
  },
  'giveaway.index': {
    methods: ["GET","HEAD"],
    pattern: '/giveaway',
    tokens: [{"old":"/giveaway","type":0,"val":"giveaway","end":""}],
    types: placeholder as Registry['giveaway.index']['types'],
  },
  'giveaway.participate': {
    methods: ["POST"],
    pattern: '/giveaway/participate',
    tokens: [{"old":"/giveaway/participate","type":0,"val":"giveaway","end":""},{"old":"/giveaway/participate","type":0,"val":"participate","end":""}],
    types: placeholder as Registry['giveaway.participate']['types'],
  },
  'minecraft.generateToken': {
    methods: ["POST"],
    pattern: '/minecraft/link/generate-token',
    tokens: [{"old":"/minecraft/link/generate-token","type":0,"val":"minecraft","end":""},{"old":"/minecraft/link/generate-token","type":0,"val":"link","end":""},{"old":"/minecraft/link/generate-token","type":0,"val":"generate-token","end":""}],
    types: placeholder as Registry['minecraft.generateToken']['types'],
  },
  'minecraft.unlinkAccount': {
    methods: ["DELETE"],
    pattern: '/minecraft/unlink',
    tokens: [{"old":"/minecraft/unlink","type":0,"val":"minecraft","end":""},{"old":"/minecraft/unlink","type":0,"val":"unlink","end":""}],
    types: placeholder as Registry['minecraft.unlinkAccount']['types'],
  },
  'staff.dashboard': {
    methods: ["GET","HEAD"],
    pattern: '/staff',
    tokens: [{"old":"/staff","type":0,"val":"staff","end":""}],
    types: placeholder as Registry['staff.dashboard']['types'],
  },
  'staff.users.index': {
    methods: ["GET","HEAD"],
    pattern: '/staff/users',
    tokens: [{"old":"/staff/users","type":0,"val":"staff","end":""},{"old":"/staff/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['staff.users.index']['types'],
  },
  'staff.users.create': {
    methods: ["POST"],
    pattern: '/staff/users',
    tokens: [{"old":"/staff/users","type":0,"val":"staff","end":""},{"old":"/staff/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['staff.users.create']['types'],
  },
  'staff.users.update': {
    methods: ["PUT"],
    pattern: '/staff/users/:id',
    tokens: [{"old":"/staff/users/:id","type":0,"val":"staff","end":""},{"old":"/staff/users/:id","type":0,"val":"users","end":""},{"old":"/staff/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['staff.users.update']['types'],
  },
  'staff.users.destroy': {
    methods: ["DELETE"],
    pattern: '/staff/users/:id',
    tokens: [{"old":"/staff/users/:id","type":0,"val":"staff","end":""},{"old":"/staff/users/:id","type":0,"val":"users","end":""},{"old":"/staff/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['staff.users.destroy']['types'],
  },
  'staff.roles.index': {
    methods: ["GET","HEAD"],
    pattern: '/staff/roles',
    tokens: [{"old":"/staff/roles","type":0,"val":"staff","end":""},{"old":"/staff/roles","type":0,"val":"roles","end":""}],
    types: placeholder as Registry['staff.roles.index']['types'],
  },
  'staff.roles.create': {
    methods: ["POST"],
    pattern: '/staff/roles',
    tokens: [{"old":"/staff/roles","type":0,"val":"staff","end":""},{"old":"/staff/roles","type":0,"val":"roles","end":""}],
    types: placeholder as Registry['staff.roles.create']['types'],
  },
  'staff.roles.update': {
    methods: ["PUT"],
    pattern: '/staff/roles/:name',
    tokens: [{"old":"/staff/roles/:name","type":0,"val":"staff","end":""},{"old":"/staff/roles/:name","type":0,"val":"roles","end":""},{"old":"/staff/roles/:name","type":1,"val":"name","end":""}],
    types: placeholder as Registry['staff.roles.update']['types'],
  },
  'staff.roles.destroy': {
    methods: ["DELETE"],
    pattern: '/staff/roles/:name',
    tokens: [{"old":"/staff/roles/:name","type":0,"val":"staff","end":""},{"old":"/staff/roles/:name","type":0,"val":"roles","end":""},{"old":"/staff/roles/:name","type":1,"val":"name","end":""}],
    types: placeholder as Registry['staff.roles.destroy']['types'],
  },
  'staff.giveaways.index': {
    methods: ["GET","HEAD"],
    pattern: '/staff/giveaways',
    tokens: [{"old":"/staff/giveaways","type":0,"val":"staff","end":""},{"old":"/staff/giveaways","type":0,"val":"giveaways","end":""}],
    types: placeholder as Registry['staff.giveaways.index']['types'],
  },
  'staff.giveaways.create': {
    methods: ["POST"],
    pattern: '/staff/giveaways',
    tokens: [{"old":"/staff/giveaways","type":0,"val":"staff","end":""},{"old":"/staff/giveaways","type":0,"val":"giveaways","end":""}],
    types: placeholder as Registry['staff.giveaways.create']['types'],
  },
  'staff.giveaways.update': {
    methods: ["PUT"],
    pattern: '/staff/giveaways/:id',
    tokens: [{"old":"/staff/giveaways/:id","type":0,"val":"staff","end":""},{"old":"/staff/giveaways/:id","type":0,"val":"giveaways","end":""},{"old":"/staff/giveaways/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['staff.giveaways.update']['types'],
  },
  'staff.giveaways.destroy': {
    methods: ["DELETE"],
    pattern: '/staff/giveaways/:id',
    tokens: [{"old":"/staff/giveaways/:id","type":0,"val":"staff","end":""},{"old":"/staff/giveaways/:id","type":0,"val":"giveaways","end":""},{"old":"/staff/giveaways/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['staff.giveaways.destroy']['types'],
  },
  'staff.giveaways.draw': {
    methods: ["POST"],
    pattern: '/staff/giveaways/:id/draw',
    tokens: [{"old":"/staff/giveaways/:id/draw","type":0,"val":"staff","end":""},{"old":"/staff/giveaways/:id/draw","type":0,"val":"giveaways","end":""},{"old":"/staff/giveaways/:id/draw","type":1,"val":"id","end":""},{"old":"/staff/giveaways/:id/draw","type":0,"val":"draw","end":""}],
    types: placeholder as Registry['staff.giveaways.draw']['types'],
  },
  'giveaway.delete_participant': {
    methods: ["DELETE"],
    pattern: '/staff/giveaways/:id/participants/:participantId',
    tokens: [{"old":"/staff/giveaways/:id/participants/:participantId","type":0,"val":"staff","end":""},{"old":"/staff/giveaways/:id/participants/:participantId","type":0,"val":"giveaways","end":""},{"old":"/staff/giveaways/:id/participants/:participantId","type":1,"val":"id","end":""},{"old":"/staff/giveaways/:id/participants/:participantId","type":0,"val":"participants","end":""},{"old":"/staff/giveaways/:id/participants/:participantId","type":1,"val":"participantId","end":""}],
    types: placeholder as Registry['giveaway.delete_participant']['types'],
  },
  'event_stream': {
    methods: ["GET","HEAD"],
    pattern: '/__transmit/events',
    tokens: [{"old":"/__transmit/events","type":0,"val":"__transmit","end":""},{"old":"/__transmit/events","type":0,"val":"events","end":""}],
    types: placeholder as Registry['event_stream']['types'],
  },
  'subscribe': {
    methods: ["POST"],
    pattern: '/__transmit/subscribe',
    tokens: [{"old":"/__transmit/subscribe","type":0,"val":"__transmit","end":""},{"old":"/__transmit/subscribe","type":0,"val":"subscribe","end":""}],
    types: placeholder as Registry['subscribe']['types'],
  },
  'unsubscribe': {
    methods: ["POST"],
    pattern: '/__transmit/unsubscribe',
    tokens: [{"old":"/__transmit/unsubscribe","type":0,"val":"__transmit","end":""},{"old":"/__transmit/unsubscribe","type":0,"val":"unsubscribe","end":""}],
    types: placeholder as Registry['unsubscribe']['types'],
  },
  'home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['home']['types'],
  },
  'informations': {
    methods: ["GET","HEAD"],
    pattern: '/informations',
    tokens: [{"old":"/informations","type":0,"val":"informations","end":""}],
    types: placeholder as Registry['informations']['types'],
  },
  'discord': {
    methods: ["GET","HEAD"],
    pattern: '/discord',
    tokens: [{"old":"/discord","type":0,"val":"discord","end":""}],
    types: placeholder as Registry['discord']['types'],
  },
  'privacy': {
    methods: ["GET","HEAD"],
    pattern: '/privacy',
    tokens: [{"old":"/privacy","type":0,"val":"privacy","end":""}],
    types: placeholder as Registry['privacy']['types'],
  },
  'terms': {
    methods: ["GET","HEAD"],
    pattern: '/terms',
    tokens: [{"old":"/terms","type":0,"val":"terms","end":""}],
    types: placeholder as Registry['terms']['types'],
  },
  'changelog': {
    methods: ["GET","HEAD"],
    pattern: '/changelog',
    tokens: [{"old":"/changelog","type":0,"val":"changelog","end":""}],
    types: placeholder as Registry['changelog']['types'],
  },
  'know_everything': {
    methods: ["GET","HEAD"],
    pattern: '/know-everything',
    tokens: [{"old":"/know-everything","type":0,"val":"know-everything","end":""}],
    types: placeholder as Registry['know_everything']['types'],
  },
  'faq': {
    methods: ["GET","HEAD"],
    pattern: '/faq',
    tokens: [{"old":"/faq","type":0,"val":"faq","end":""}],
    types: placeholder as Registry['faq']['types'],
  },
  'og': {
    methods: ["GET","HEAD"],
    pattern: '/og',
    tokens: [{"old":"/og","type":0,"val":"og","end":""}],
    types: placeholder as Registry['og']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
