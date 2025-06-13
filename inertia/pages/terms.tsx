import { DefaultLayout } from '~/components/layouts/default'
import { Page } from '~/components/page'
import { Head } from '~/components/shared/head'
import { Markdown } from '~/components/ui/markdown'

type TermsPageProps = {
  content: string
}

export default function TermsPage(props: TermsPageProps) {
  const { content } = props

  return (
    <>
      <Head descriptors={[{ title: "Conditions d'utilisation" }]} />
      <DefaultLayout>
        <Page className="gap-0">
          <Markdown>{content}</Markdown>
        </Page>
      </DefaultLayout>
    </>
  )
}
