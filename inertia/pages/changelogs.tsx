import { Badge } from '@lemonsqueezy/wedges'
import { BadgeInfoIcon } from 'lucide-react'
import DefaultLayout from '~/components/layouts/default'
import { Page } from '~/components/page'
import { Head } from '~/components/shared/head'
import { LinkTrigger } from '~/components/shared/link_trigger'
import { Markdown, implementedComponents } from '~/components/ui/markdown'

type ChangelogsPageProps = {
  content: string
}

export default function ChangelogsPage(props: ChangelogsPageProps) {
  const { content } = props

  return (
    <>
      <Head descriptors={[{ title: 'Changelogs' }]} />
      <DefaultLayout>
        <Page className="gap-0">
          <Markdown
            components={{
              h2({ node, ...h2Props }) {
                const title = (h2Props.children as string | undefined) ?? undefined

                if (title) {
                  return (
                    <LinkTrigger href={`#${title}`} className="text-primary">
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
              li({ node, ...liProps }) {
                return <li className="text-sm" {...liProps} />
              },
              p({ node, ...pProps }) {
                const match = /^-> (?<type>Website|Bot)/.exec(String(pProps.children))

                if (match?.groups) {
                  return (
                    <p className="mb-2">
                      <Badge className="py-0.5" stroke before={<BadgeInfoIcon />}>
                        {match.groups.type}
                      </Badge>
                    </p>
                  )
                }

                return implementedComponents.p({ node, className: 'mb-2', ...pProps })
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
