import { Head } from '@inertiajs/react'
import DefaultLayout from '~/components/layouts/default'
import { Page } from '~/components/page'
import { Markdown } from '~/components/ui/markdown'

type PrivacyPageProps = {
  content: string
}

export default function PrivacyPage(props: PrivacyPageProps) {
  const { content } = props

  return (
    <>
      <Head title="Politique de confidentialité" />
      <DefaultLayout>
        <Page className="gap-0">
          <Markdown>{content}</Markdown>
        </Page>
      </DefaultLayout>
    </>
  )
}
