import { container, image, percentage, text } from '@takumi-rs/helpers'
import type { Infer } from '@vinejs/vine/types'
import { DateTime } from 'luxon'

import { baseAppContainer, PRIMARY_COLOR } from '#core/content/og'
import { ImageRenderer } from '#og/services/image_renderer'
import { translateRank } from '#stats/content/rank'
import type { playerInfoValidator } from '#stats/validators/player_validator'

export async function createOgPlayerContainer(player: Infer<typeof playerInfoValidator>) {
  const highestFlag = player.flags.toSorted((a, b) => b.priority - a.priority).at(0)
  const rank = player.data.at(0)?.data.rank ?? 'default'
  const faction = player.data.at(0)?.data.faction ?? 'Aucune'

  return await baseAppContainer([
    container({
      style: {
        display: 'flex',
        flexDirection: 'row',
        gap: 24,
        width: percentage(100),
      },
      children: [
        image({
          src: await ImageRenderer.imageToDataURL(
            `https://api.paladium.games/v1/global/launcher/session/minecraft/skin/${player.username}/avatar/100`
          ),
          style: {
            width: 'auto',
            height: percentage(100),
            borderRadius: percentage(4),
          },
        }),
        container({
          style: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'end',
            flexGrow: 1,
            gap: 8,
          },
          children: [
            text(player.username, {
              fontSize: 64,
            }),
            highestFlag
              ? text(highestFlag.label, {
                  fontSize: 36,
                  color: PRIMARY_COLOR,
                  paddingTop: -12,
                  paddingBottom: 12,
                })
              : null,
            text(
              `Première connexion : ${DateTime.fromMillis(player.firstSeen).toLocaleString(DateTime.DATE_MED)}`,
              {
                fontSize: 36,
              }
            ),
            text(`Rang : ${translateRank(rank as 'default')}`, {
              fontSize: 36,
            }),
            text(`Faction : ${faction}`, {
              fontSize: 36,
            }),
          ].filter((c) => c !== null),
        }),
      ],
    }),
  ])
}
