import { DefaultLayout } from '~/components/layouts/default'
import { Page } from '~/components/page'
import { HalloweenEyes } from '~/components/shared/halloween_decorations'
import { Head } from '~/components/shared/head'
import SpiderWeb from '~/components/shared/spider_web'
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
        <SpiderWeb /> {/* Halloween decoration */}
          <Markdown>{content}</Markdown>
        </Page>
      </DefaultLayout>
      <HalloweenEyes /> {/* Halloween decoration */}
    </>
  )
}
