import type { PageError } from '#app/types'
import { Page } from '~/components/page'
import { DisplayError } from '~/components/shared/display_error'
import { Head } from '~/components/shared/head'

type NotFoundProps = {
  error: PageError
}

export default function NotFound(props: NotFoundProps) {
  const { error } = props

  return (
    <>
      <Head descriptors={[{ title: 'Page introuvable' }]} />
      <main className="min-h-dvh flex w-full flex-col justify-center">
        <Page>
          <DisplayError error={error}>
            <div className="space-y-1.5">
              <h3 className="font-semibold">Information complémentaire</h3>
              <p>
                La page que vous avez demandée est introuvable, vérifiez qu'il n'y ait pas d'erreur
                au niveau de l'URL.
              </p>
            </div>
          </DisplayError>
        </Page>
      </main>
    </>
  )
}
