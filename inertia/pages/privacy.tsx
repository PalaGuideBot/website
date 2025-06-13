import { DefaultLayout } from '~/components/layouts/default'
import { Page } from '~/components/page'
import { Head } from '~/components/shared/head'
import { Markdown } from '~/components/ui/markdown'

type PrivacyPageProps = {
  content: string
}

export default function PrivacyPage(props: PrivacyPageProps) {
  const { content } = props

  return (
    <>
      <Head descriptors={[{ title: 'Politique de confidentialité' }]} />
      <DefaultLayout>
        <Page className="gap-0">
          <Markdown>{content}</Markdown>
        </Page>
      </DefaultLayout>
    </>
  )
}
