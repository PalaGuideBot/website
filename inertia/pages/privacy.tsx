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
      <Head
        title="Politique de confidentialité"
        description="Consultez notre politique de confidentialité."
        defaultOg
      />
      <DefaultLayout>
        <Page className="gap-0">
          <Markdown>{content}</Markdown>
        </Page>
      </DefaultLayout>
    </>
  )
}
