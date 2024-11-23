import type { Infer } from '@vinejs/vine/types'

import type { factionInfoValidator } from '#stats/validators/faction_validator'
import {
  AllianceChaosIcon,
  AllianceOrderIcon,
  FactionAeloriaIcon,
  FactionEgopolisIcon,
  FactionEventIcon,
  FactionKilmordraIcon,
  FactionRunegardIcon,
  FactionXanothIcon,
  IconProps,
} from '~/components/icons'
import { PaladiumFaction } from '~/types'

type FactionAlliance = Infer<typeof factionInfoValidator>['alliance']

export const icons: Record<PaladiumFaction, React.FC<IconProps>> = {
  Aeloria: FactionAeloriaIcon,
  Egopolis: FactionEgopolisIcon,
  Event: FactionEventIcon,
  Kilmordra: FactionKilmordraIcon,
  Runegard: FactionRunegardIcon,
  Xanoth: FactionXanothIcon,
}

export const allianceIcons: Record<FactionAlliance, React.FC<IconProps>> = {
  CHAOS: AllianceChaosIcon,
  ORDER: AllianceOrderIcon,
}

export const allianceToIcon = (alliance: FactionAlliance) => {
  return allianceIcons[alliance]
}
