import { Head as InertiaHead } from '@inertiajs/react'
import React from 'react'

type MetaDescriptor =
  | { title: string }
  | { name: string; content: string }
  | { property: string; content: string }
  | { httpEquiv: string; content: string }
  | { tagName: 'meta' | 'link'; [name: string]: string }
  | { [name: string]: unknown }

const Head = ({
  children,
  descriptors = [],
}: React.ComponentProps<typeof InertiaHead> & { descriptors?: MetaDescriptor[] }) => {
  const description =
    'PalaGuideBot vous met à disposition des outils qui vous accompagne dans votre aventure sur Paladium'

  const titleMeta = descriptors.find((d) => 'title' in d) as { title: string } | undefined
  const title = titleMeta ? `${titleMeta.title} - PalaGuideBot` : 'PalaGuideBot'

  const defaultDescriptors: MetaDescriptor[] = [
    { title: title },
    { name: 'description', content: description },
    { name: 'og:description', content: description },
    { name: 'og:url', content: 'https://palaguidebot.fr' },
    { name: 'og:type', content: 'website' },
    { name: 'og:title', content: title },
    { name: 'og:site_name', content: 'PalaGuideBot' },
    { name: 'twitter:domain', content: 'palaguidebot.fr' },
    { name: 'twitter:url', content: 'https://palaguidebot.fr' },
    { name: 'twitter:title', content: title },
  ].filter((descriptor) => {
    if ('name' in descriptor) {
      return !descriptors.some((d) => 'name' in d && d.name === descriptor.name)
    }

    if ('property' in descriptor) {
      return !descriptors.some((d) => 'property' in d && d.property === descriptor.property)
    }

    if ('httpEquiv' in descriptor) {
      return !descriptors.some((d) => 'httpEquiv' in d && d.httpEquiv === descriptor.httpEquiv)
    }

    return true
  })

  descriptors = Array.from(new Set([...defaultDescriptors, ...descriptors]))

  return (
    <InertiaHead>
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

        if ('title' in metaProps) {
          return <title key="title">{String(metaProps.title)}</title>
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
      {children}
    </InertiaHead>
  )
}

function isValidMetaTag(tagName: unknown): tagName is 'meta' | 'link' {
  return typeof tagName === 'string' && /^(meta|link)$/.test(tagName)
}

export { Head }
