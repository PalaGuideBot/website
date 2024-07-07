import DefaultLayout from '~/components/layouts/default'
import { Page } from '~/components/page'
import { Head } from '~/components/shared/head'
import { Markdown } from '~/components/ui/markdown'

type LinkPageProps = {
  content: string
}

export default function LinkPage(props: LinkPageProps) {
  const { content } = props

  return (
    <>
      <Head descriptors={[{ title: 'Comment lier son compte Minecraft ?' }]} />
      <DefaultLayout>
        <Page className="gap-0">
          <Markdown>{content}</Markdown>
        </Page>
      </DefaultLayout>
    </>
  )
}
