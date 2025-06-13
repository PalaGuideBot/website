import { BadgeInfoIcon } from 'lucide-react'

import { DefaultLayout } from '~/components/layouts/default'
import { Page } from '~/components/page'
import { Head } from '~/components/shared/head'
import { LinkTrigger } from '~/components/shared/link_trigger'
import { Badge } from '~/components/ui/badge'
import { Markdown, implementedComponents } from '~/components/ui/markdown'

type ChangelogPageProps = {
  content: string
}

export default function ChangelogPage(props: ChangelogPageProps) {
  const { content } = props

  return (
    <>
      <Head descriptors={[{ title: 'Changelog' }]} />
      <DefaultLayout>
        <Page className="gap-0">
          <Markdown
            components={{
              h2({ node, ...h2Props }) {
                const title = (h2Props.children as string | undefined) ?? undefined

                if (title) {
                  return (
                    <LinkTrigger href={`#${title}`}>
                      {implementedComponents.h2({
                        node,
                        id: title,
                        ...h2Props,
                      })}
                    </LinkTrigger>
                  )
                }

                return implementedComponents.h2({ node, ...h2Props })
              },
              h3({ node, ...h3Props }) {
                const match = /^(?<type>Website|Bot|Other)/.exec(String(h3Props.children))

                if (match?.groups) {
                  return (
                    <h3 className="mb-2">
                      <Badge variant="secondary" className="py-0.5" stroke>
                        <BadgeInfoIcon />
                        {match.groups.type}
                      </Badge>
                    </h3>
                  )
                }

                return implementedComponents.h3({ node, ...h3Props })
              },
              li({ node, ...liProps }) {
                return <li className="text-sm" {...liProps} />
              },
            }}
          >
            {content}
          </Markdown>
        </Page>
      </DefaultLayout>
    </>
  )
}
