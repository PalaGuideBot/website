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

export function getOnYourMarksGoalItem(event: FactionEventOnYourMarks) {
  switch (event.goalType) {
    case 'BREAK_BLOCKS':
    case 'MOB_KILL':
    case 'ITEM_CRAFT':
    case 'ITEM_SMELT':
    case 'ITEM_CRAFT_PALAMACHINE':
    case 'ITEM_ENCHANT':
    case 'GRINDER_CRAFT':
    case 'GRINDER_SMELT':
    case 'USE_ITEM':
      return event.extra ?? ''
    case 'FISHING':
      return 'fishing_rod'
    case 'WALK':
      return 'leather_boots'
    default:
      return ''
  }
}
