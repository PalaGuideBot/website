import { Head as InertiaHead } from '@inertiajs/react'
import React from 'react'

const Head = ({ children, ...props }: React.ComponentPropsWithoutRef<typeof InertiaHead>) => {
  const description =
    'PalaGuideBot vous met à disposition des outils qui vous accompagne dans votre aventure sur Paladium'
  const title = props.title ? `${props.title} - PalaGuideBot` : 'PalaGuideBot'

  return (
    <InertiaHead {...props}>
      <meta name="description" content={description} />
      <meta property="og:url" content="https://palaguidebot.fr" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta property="og:site_name" content="PalaGuideBot" />
      <meta property="twitter:domain" content="palaguidebot.fr" />
      <meta property="twitter:url" content="https://palaguidebot.fr" />
      <meta name="twitter:title" content={title} />
      {children}
    </InertiaHead>
  )
}

export { Head }
