import { DefaultLayout } from '~/components/layouts/default'
import { Page } from '~/components/page'
import { Head } from '~/components/shared/head'
import { Markdown } from '~/components/ui/markdown'

type KnowEverythingPageProps = {
  content: string
}

export default function KnowEverythingPage(props: KnowEverythingPageProps) {
  const { content } = props

  return (
    <>
      <Head
        title="Article tout savoir sur PalaGuideBot"
        description="Tout ce qui à savoir sur l'existence du bot."
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
