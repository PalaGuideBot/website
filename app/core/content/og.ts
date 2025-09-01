import { container, image, percentage, text, type ContainerNode } from '@takumi-rs/helpers'

import { ImageRenderer } from '#og/services/image_renderer'

export const PRIMARY_COLOR = '#ffb702'
export const BACKGROUND_COLOR = '#121217'
export const FOREGROUND_COLOR = '#fafafa'
export const MUTED_COLOR = '#a1a1a1'

export async function baseAppContainer(children: ContainerNode['children']) {
  return container({
    style: {
      width: percentage(100),
      height: percentage(100),
      display: 'flex',
      flexDirection: 'column',
      gap: 64,
      padding: 32,
      backgroundImage:
        'linear-gradient(0deg,rgba(18, 18, 23, 1) 60%, rgba(255, 166, 2, 0.42) 89%, rgba(255, 183, 2, 0.30) 100%)',
      backgroundColor: BACKGROUND_COLOR,
      color: FOREGROUND_COLOR,
    },
    children: [
      container({
        style: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 24,
        },
        children: [
          image({
            src: await ImageRenderer.imageToDataURL(`https://image.palaguidebot.fr/logo.webp`),
            style: {
              width: 192,
              aspectRatio: 1 / 1,
              borderRadius: percentage(25),
            },
          }),
          container({
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            },
            children: [
              text('PalaGuideBot', {
                fontSize: 64,
                letterSpacing: -4,
              }),
              text('#1 Paladium Bot | Website', {
                fontSize: 32,
                color: MUTED_COLOR,
              }),
            ],
          }),
        ],
      }),
      container({
        style: {
          display: 'flex',
          flexGrow: 1,
        },
        children: children,
      }),
    ],
  })
}
