import { Head as InertiaHead } from '@inertiajs/react'

type MetaDescriptor =
  | { name: string; content: string }
  | { property: string; content: string }
  | { httpEquiv: string; content: string }
  | { tagName: 'meta' | 'link'; [name: string]: string }
  | { [name: string]: unknown }

const keywords = [
  'minecraft',
  'paladium',
  'paladium-pvp',
  'paladium stats',
  'statistiques',
  'classement',
  'factions',
  'joueurs',
  'statut',
  'suivi',
  'stats',
  'top factions',
  'leaderboard',
  'statut serveurs',
  'analyse',
  'rang',
  'trixium',
  'palaguidebot',
  'bot',
  'discord',
  'fuzeiii',
]

interface HeadProps extends React.ComponentProps<typeof InertiaHead> {
  description?: string
  descriptors?: MetaDescriptor[]
  defaultOg?: boolean
}

function Head({
  children,
  title: titleFromProps,
  description: descriptionFromProps,
  descriptors = [],
  defaultOg = false,
}: HeadProps) {
  const description =
    descriptionFromProps ??
    'PalaGuideBot vous met à disposition des outils qui vous accompagnent dans votre aventure sur Paladium.'

  const title = titleFromProps ? `${titleFromProps} - PalaGuideBot` : 'PalaGuideBot'

  const defaultOgUrl = defaultOg
    ? `https://palaguidebot.fr/og?title=${encodeURIComponent(titleFromProps || title)}&description=${encodeURIComponent(description)}`
    : undefined

  const defaultDescriptors: MetaDescriptor[] = [
    { name: 'subject', content: 'Guide pour le serveur Minecraft Paladium' },
    { name: 'url', content: 'https://palaguidebot.fr' },
    { name: 'description', content: description },
    { name: 'og:description', content: description },
    { name: 'og:url', content: 'https://palaguidebot.fr' },
    { name: 'og:type', content: 'website' },
    { name: 'og:title', content: title },
    { name: 'og:site_name', content: 'PalaGuideBot' },
    { name: 'twitter:domain', content: 'palaguidebot.fr' },
    { name: 'twitter:url', content: 'https://palaguidebot.fr' },
    { name: 'twitter:title', content: title },
    { name: 'theme-color', content: '#FFB702' },
    { name: 'keywords', content: keywords.join(', ') },
  ].filter((descriptor) => {
    if ('name' in descriptor) {
      return !descriptors.some((d) => 'name' in d && d.name === descriptor.name)
    }

    /* if ('property' in descriptor) {
      return !descriptors.some((d) => 'property' in d && d.property === descriptor.property)
    }

    if ('httpEquiv' in descriptor) {
      return !descriptors.some((d) => 'httpEquiv' in d && d.httpEquiv === descriptor.httpEquiv)
    } */

    return true
  })

  descriptors = Array.from(new Set([...defaultDescriptors, ...descriptors]))

  return (
    <InertiaHead>
      <title>{title}</title>
      {descriptors.map((metaProps) => {
        if (!metaProps) {
          return null
        }

        if ('tagName' in metaProps) {
          let { tagName, ...rest } = metaProps
          if (!isValidMetaTag(tagName)) {
            console.warn(
              `A meta object uses an invalid tagName: ${tagName}. Expected either 'link' or 'meta'`
            )
            return null
          }
          let Comp = tagName
          return <Comp key={JSON.stringify(rest)} {...rest} />
        }

        if ('charset' in metaProps) {
          metaProps.charSet ??= metaProps.charset
          delete metaProps.charset
        }

        if ('charSet' in metaProps && metaProps.charSet !== null) {
          return typeof metaProps.charSet === 'string' ? (
            <meta key="charSet" charSet={metaProps.charSet} />
          ) : null
        }

        return <meta key={JSON.stringify(metaProps)} {...metaProps} />
      })}
      {defaultOgUrl && <meta property="og:image" content={defaultOgUrl} />}
      {defaultOgUrl && <meta property="twitter:image" content={defaultOgUrl} />}
      {children}
    </InertiaHead>
  )
}

function isValidMetaTag(tagName: unknown): tagName is 'meta' | 'link' {
  return typeof tagName === 'string' && /^(meta|link)$/.test(tagName)
}

export { Head, keywords }
