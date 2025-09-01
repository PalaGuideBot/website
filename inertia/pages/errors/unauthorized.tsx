import type { PageError } from '#app/types'
import { Page } from '~/components/page'
import { DisplayError } from '~/components/shared/display_error'
import { Head } from '~/components/shared/head'

type UnauthorizedErrorProps = {
  error: PageError
}

export default function UnauthorizedError(props: UnauthorizedErrorProps) {
  const { error } = props

  return (
    <>
      <Head title="Non autorisé" />
      <main className="min-h-dvh flex w-full flex-col justify-center">
        <Page>
          <DisplayError error={error}>
            <div className="space-y-1.5">
              <h3 className="font-semibold">Information complémentaire</h3>
              <p>
                Vous n'avez pas les permissions nécessaires pour accéder à cette page. Si vous
                pensez qu'il s'agit d'une erreur, veuillez nous contacter.
              </p>
            </div>
          </DisplayError>
        </Page>
      </main>
    </>
  )
}
