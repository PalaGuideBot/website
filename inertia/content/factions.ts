import {
  FactionAeloriaIcon,
  FactionEgopolisIcon,
  FactionEventIcon,
  FactionKilmordraIcon,
  FactionRunegardIcon,
  FactionXanothIcon,
  IconProps,
} from '~/components/icons'
import { PaladiumFaction } from '~/types'

export const icons: Record<PaladiumFaction, React.FC<IconProps>> = {
  Aeloria: FactionAeloriaIcon,
  Egopolis: FactionEgopolisIcon,
  Event: FactionEventIcon,
  Kilmordra: FactionKilmordraIcon,
  Runegard: FactionRunegardIcon,
  Xanoth: FactionXanothIcon,
}
