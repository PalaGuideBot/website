import {
  FactionEventIcon,
  FactionImbaliIcon,
  FactionKeltisIcon,
  FactionLuccentoIcon,
  FactionManashinoIcon,
  FactionMuzdanIcon,
  FactionNeolithIcon,
  FactionSoleraltIcon,
  FactionUntaaIcon,
  IconProps,
} from '~/components/icons'
import { PaladiumFaction } from '~/types'

export const icons: Record<PaladiumFaction, React.FC<IconProps>> = {
  Soleratl: FactionSoleraltIcon,
  Muzdan: FactionMuzdanIcon,
  Manashino: FactionManashinoIcon,
  Event: FactionEventIcon,
  Luccento: FactionLuccentoIcon,
  Imbali: FactionImbaliIcon,
  Keltis: FactionKeltisIcon,
  Neolith: FactionNeolithIcon,
  Untaa: FactionUntaaIcon,
}
