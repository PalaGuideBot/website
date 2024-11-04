import { Infer } from '@vinejs/vine/types'

import { eventFactionOnYourMarksValidator } from '#event/validators/event_validator'

type FactionEventOnYourMarks = Infer<typeof eventFactionOnYourMarksValidator>

export function translateOnYourMarksGoalType(type: FactionEventOnYourMarks['goalType']) {
  const translations: Record<typeof type, string> = {
    BREAK_BLOCKS: 'Casser',
    MOB_KILL: 'Tuer',
    FISHING: 'Pêcher',
    WALK: 'Marcher',
    ITEM_CRAFT: 'Crafter',
    ITEM_SMELT: 'Cuir',
    ITEM_CRAFT_PALAMACHINE: 'Crafter dans une Palamachine',
    ITEM_ENCHANT: 'Enchanter',
    GRINDER_CRAFT: 'Crafter dans un Grinder',
    GRINDER_SMELT: 'Cuire dans un Grinder',
    USE_ITEM: 'Utiliser',
  }

  return translations[type]
}

export function translateOnYourMarksServerType(type: FactionEventOnYourMarks['serverType']) {
  const translations: Record<typeof type, string> = {
    LOBBY: 'Lobby',
    FACTION: 'Faction',
    MINAGE: 'Minage',
    FARMLAND: 'Farmland',
    GAME: 'Game',
    DIM_MINER: 'Dimension Mineur',
  }

  return translations[type]
}

export function translateOnYourMarksState(state: FactionEventOnYourMarks['state']) {
  const translations: Record<typeof state, string> = {
    NOT_STARTED: 'Non démarrée',
    RUNNING: 'En cours',
    FINISHED: 'Terminée',
  }

  return translations[state]
}

export function getEventImage(event: string) {
  return `https://image.palaguidebot.fr/events/${event}.webp`
}
