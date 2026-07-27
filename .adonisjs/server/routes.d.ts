import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'leaderboard.index': { paramsTuple?: []; params?: {} }
    'leaderboard.factions.index': { paramsTuple?: []; params?: {} }
    'leaderboard.money.index': { paramsTuple?: []; params?: {} }
    'leaderboard.trixium.index': { paramsTuple?: []; params?: {} }
    'leaderboard.clicker.index': { paramsTuple?: []; params?: {} }
    'leaderboard.boss.index': { paramsTuple?: []; params?: {} }
    'leaderboard.chorus.index': { paramsTuple?: []; params?: {} }
    'leaderboard.egghunt.index': { paramsTuple?: []; params?: {} }
    'leaderboard.koth.index': { paramsTuple?: []; params?: {} }
    'leaderboard.alliance.index': { paramsTuple?: []; params?: {} }
    'leaderboard.jobs.index': { paramsTuple?: []; params?: {} }
    'stats.players.show': { paramsTuple?: [ParamValue?]; params?: {'username'?: ParamValue} }
    'stats.players.jobs': { paramsTuple: [ParamValue]; params: {'username': ParamValue} }
    'stats.players.og': { paramsTuple: [ParamValue]; params: {'username': ParamValue} }
    'stats.players.search': { paramsTuple?: []; params?: {} }
    'stats.factions.show': { paramsTuple?: [ParamValue?]; params?: {'name'?: ParamValue} }
    'stats.players.wrapped': { paramsTuple?: [ParamValue?]; params?: {'username'?: ParamValue} }
    'stats.players.wrapped.end': { paramsTuple: [ParamValue]; params: {'username': ParamValue} }
    'status.index': { paramsTuple?: []; params?: {} }
    'status.paladium.index': { paramsTuple?: []; params?: {} }
    'tools.index': { paramsTuple?: []; params?: {} }
    'tools.clicker.show': { paramsTuple?: [ParamValue?]; params?: {'username'?: ParamValue} }
    'tools.job_calculator.index': { paramsTuple?: []; params?: {} }
    'tools.pog_calculator.index': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.redirect': { paramsTuple?: []; params?: {} }
    'auth.callback': { paramsTuple?: []; params?: {} }
    'auth.profile': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'event.index': { paramsTuple?: []; params?: {} }
    'giveaway.index': { paramsTuple?: []; params?: {} }
    'giveaway.participate': { paramsTuple?: []; params?: {} }
    'minecraft.generateToken': { paramsTuple?: []; params?: {} }
    'minecraft.unlinkAccount': { paramsTuple?: []; params?: {} }
    'staff.dashboard': { paramsTuple?: []; params?: {} }
    'staff.users.index': { paramsTuple?: []; params?: {} }
    'staff.users.create': { paramsTuple?: []; params?: {} }
    'staff.users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'staff.users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'staff.roles.index': { paramsTuple?: []; params?: {} }
    'staff.roles.create': { paramsTuple?: []; params?: {} }
    'staff.roles.update': { paramsTuple: [ParamValue]; params: {'name': ParamValue} }
    'staff.roles.destroy': { paramsTuple: [ParamValue]; params: {'name': ParamValue} }
    'staff.giveaways.index': { paramsTuple?: []; params?: {} }
    'staff.giveaways.create': { paramsTuple?: []; params?: {} }
    'staff.giveaways.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'staff.giveaways.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'staff.giveaways.draw': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'giveaway.delete_participant': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'participantId': ParamValue} }
    'event_stream': { paramsTuple?: []; params?: {} }
    'subscribe': { paramsTuple?: []; params?: {} }
    'unsubscribe': { paramsTuple?: []; params?: {} }
    'home': { paramsTuple?: []; params?: {} }
    'informations': { paramsTuple?: []; params?: {} }
    'discord': { paramsTuple?: []; params?: {} }
    'privacy': { paramsTuple?: []; params?: {} }
    'terms': { paramsTuple?: []; params?: {} }
    'changelog': { paramsTuple?: []; params?: {} }
    'know_everything': { paramsTuple?: []; params?: {} }
    'faq': { paramsTuple?: []; params?: {} }
    'og': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'leaderboard.index': { paramsTuple?: []; params?: {} }
    'leaderboard.factions.index': { paramsTuple?: []; params?: {} }
    'leaderboard.money.index': { paramsTuple?: []; params?: {} }
    'leaderboard.trixium.index': { paramsTuple?: []; params?: {} }
    'leaderboard.clicker.index': { paramsTuple?: []; params?: {} }
    'leaderboard.boss.index': { paramsTuple?: []; params?: {} }
    'leaderboard.chorus.index': { paramsTuple?: []; params?: {} }
    'leaderboard.egghunt.index': { paramsTuple?: []; params?: {} }
    'leaderboard.koth.index': { paramsTuple?: []; params?: {} }
    'leaderboard.alliance.index': { paramsTuple?: []; params?: {} }
    'leaderboard.jobs.index': { paramsTuple?: []; params?: {} }
    'stats.players.show': { paramsTuple?: [ParamValue?]; params?: {'username'?: ParamValue} }
    'stats.players.og': { paramsTuple: [ParamValue]; params: {'username': ParamValue} }
    'stats.factions.show': { paramsTuple?: [ParamValue?]; params?: {'name'?: ParamValue} }
    'stats.players.wrapped': { paramsTuple?: [ParamValue?]; params?: {'username'?: ParamValue} }
    'stats.players.wrapped.end': { paramsTuple: [ParamValue]; params: {'username': ParamValue} }
    'status.index': { paramsTuple?: []; params?: {} }
    'status.paladium.index': { paramsTuple?: []; params?: {} }
    'tools.index': { paramsTuple?: []; params?: {} }
    'tools.clicker.show': { paramsTuple?: [ParamValue?]; params?: {'username'?: ParamValue} }
    'tools.job_calculator.index': { paramsTuple?: []; params?: {} }
    'tools.pog_calculator.index': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.redirect': { paramsTuple?: []; params?: {} }
    'auth.callback': { paramsTuple?: []; params?: {} }
    'auth.profile': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'event.index': { paramsTuple?: []; params?: {} }
    'giveaway.index': { paramsTuple?: []; params?: {} }
    'staff.dashboard': { paramsTuple?: []; params?: {} }
    'staff.users.index': { paramsTuple?: []; params?: {} }
    'staff.roles.index': { paramsTuple?: []; params?: {} }
    'staff.giveaways.index': { paramsTuple?: []; params?: {} }
    'event_stream': { paramsTuple?: []; params?: {} }
    'home': { paramsTuple?: []; params?: {} }
    'informations': { paramsTuple?: []; params?: {} }
    'discord': { paramsTuple?: []; params?: {} }
    'privacy': { paramsTuple?: []; params?: {} }
    'terms': { paramsTuple?: []; params?: {} }
    'changelog': { paramsTuple?: []; params?: {} }
    'know_everything': { paramsTuple?: []; params?: {} }
    'faq': { paramsTuple?: []; params?: {} }
    'og': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'leaderboard.index': { paramsTuple?: []; params?: {} }
    'leaderboard.factions.index': { paramsTuple?: []; params?: {} }
    'leaderboard.money.index': { paramsTuple?: []; params?: {} }
    'leaderboard.trixium.index': { paramsTuple?: []; params?: {} }
    'leaderboard.clicker.index': { paramsTuple?: []; params?: {} }
    'leaderboard.boss.index': { paramsTuple?: []; params?: {} }
    'leaderboard.chorus.index': { paramsTuple?: []; params?: {} }
    'leaderboard.egghunt.index': { paramsTuple?: []; params?: {} }
    'leaderboard.koth.index': { paramsTuple?: []; params?: {} }
    'leaderboard.alliance.index': { paramsTuple?: []; params?: {} }
    'leaderboard.jobs.index': { paramsTuple?: []; params?: {} }
    'stats.players.show': { paramsTuple?: [ParamValue?]; params?: {'username'?: ParamValue} }
    'stats.players.og': { paramsTuple: [ParamValue]; params: {'username': ParamValue} }
    'stats.factions.show': { paramsTuple?: [ParamValue?]; params?: {'name'?: ParamValue} }
    'stats.players.wrapped': { paramsTuple?: [ParamValue?]; params?: {'username'?: ParamValue} }
    'stats.players.wrapped.end': { paramsTuple: [ParamValue]; params: {'username': ParamValue} }
    'status.index': { paramsTuple?: []; params?: {} }
    'status.paladium.index': { paramsTuple?: []; params?: {} }
    'tools.index': { paramsTuple?: []; params?: {} }
    'tools.clicker.show': { paramsTuple?: [ParamValue?]; params?: {'username'?: ParamValue} }
    'tools.job_calculator.index': { paramsTuple?: []; params?: {} }
    'tools.pog_calculator.index': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.redirect': { paramsTuple?: []; params?: {} }
    'auth.callback': { paramsTuple?: []; params?: {} }
    'auth.profile': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'event.index': { paramsTuple?: []; params?: {} }
    'giveaway.index': { paramsTuple?: []; params?: {} }
    'staff.dashboard': { paramsTuple?: []; params?: {} }
    'staff.users.index': { paramsTuple?: []; params?: {} }
    'staff.roles.index': { paramsTuple?: []; params?: {} }
    'staff.giveaways.index': { paramsTuple?: []; params?: {} }
    'event_stream': { paramsTuple?: []; params?: {} }
    'home': { paramsTuple?: []; params?: {} }
    'informations': { paramsTuple?: []; params?: {} }
    'discord': { paramsTuple?: []; params?: {} }
    'privacy': { paramsTuple?: []; params?: {} }
    'terms': { paramsTuple?: []; params?: {} }
    'changelog': { paramsTuple?: []; params?: {} }
    'know_everything': { paramsTuple?: []; params?: {} }
    'faq': { paramsTuple?: []; params?: {} }
    'og': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'stats.players.jobs': { paramsTuple: [ParamValue]; params: {'username': ParamValue} }
    'stats.players.search': { paramsTuple?: []; params?: {} }
    'giveaway.participate': { paramsTuple?: []; params?: {} }
    'minecraft.generateToken': { paramsTuple?: []; params?: {} }
    'staff.users.create': { paramsTuple?: []; params?: {} }
    'staff.roles.create': { paramsTuple?: []; params?: {} }
    'staff.giveaways.create': { paramsTuple?: []; params?: {} }
    'staff.giveaways.draw': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subscribe': { paramsTuple?: []; params?: {} }
    'unsubscribe': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'minecraft.unlinkAccount': { paramsTuple?: []; params?: {} }
    'staff.users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'staff.roles.destroy': { paramsTuple: [ParamValue]; params: {'name': ParamValue} }
    'staff.giveaways.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'giveaway.delete_participant': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'participantId': ParamValue} }
  }
  PUT: {
    'staff.users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'staff.roles.update': { paramsTuple: [ParamValue]; params: {'name': ParamValue} }
    'staff.giveaways.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}