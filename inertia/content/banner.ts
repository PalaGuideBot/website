import Build from '~/assets/banners/build.png'
import Docs from '~/assets/banners/docs.png'
import Dune from '~/assets/banners/dune.png'
import Fac from '~/assets/banners/fac.png'
import Hole from '~/assets/banners/hole.png'
import Mast from '~/assets/banners/mast.png'
import Mine from '~/assets/banners/mine.png'
import Pillage from '~/assets/banners/pillage.png'
import Pond from '~/assets/banners/pond.png'
import Pvp from '~/assets/banners/pvp.png'
import Shore from '~/assets/banners/shore.png'
import Sword from '~/assets/banners/sword.png'

import type { ProfileBanner } from '~/types'

export const banners: Record<ProfileBanner, string> = {
  build: Build,
  docs: Docs,
  dune: Dune,
  fac: Fac,
  hole: Hole,
  mast: Mast,
  mine: Mine,
  pillage: Pillage,
  pond: Pond,
  pvp: Pvp,
  shore: Shore,
  sword: Sword,
}
