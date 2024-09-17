import type { PageError } from '#app/types'
import { Page } from '~/components/page'
import { DisplayError } from '~/components/shared/display_error'
import { Head } from '~/components/shared/head'

type ServerErrorProps = {
  error: PageError
}

export default function ServerError(props: ServerErrorProps) {
  const { error } = props

  return (
    <>
      <Head descriptors={[{ title: 'Erreur' }]} />
      <main className="min-h-dvh flex w-full flex-col justify-center">
        <Page>
          <DisplayError error={error}>
            <div className="space-y-1.5">
              <h3 className="font-semibold">Information complémentaire</h3>
              <p>
                Ceci est une erreur serveur. Vous ne pourrez pas y faire grand chose, à part nous
                contacter si le problème persiste.
              </p>
            </div>
          </DisplayError>
        </Page>
      </main>
    </>
  )
}
