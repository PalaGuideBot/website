import type UsersController from '#stats/controllers/users_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Head, router, usePage } from '@inertiajs/react'
import { Button } from '@lemonsqueezy/wedges'
import { SearchIcon, TriangleAlertIcon } from 'lucide-react'
import { FormEvent, useState } from 'react'
import DefaultLayout from '~/components/layouts/default'
import { Page, PageSubTitle, PageTitle } from '~/components/page'
import Input from '~/components/ui/input'
import { UserDetails } from './components/user_details'

export type UserShowProps = InferPageProps<UsersController, 'show'>

export default function UserShow(props: UserShowProps) {
  const { user, exampleUser } = props
  const {
    props: { error },
  } = usePage<{ error?: string }>()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const username = formData.get('username') as string
    router.visit(`/stats/users/${username}`, {
      preserveState: true,
      onStart: () => setIsLoading(true),
      onFinish: () => setIsLoading(false),
    })
  }

  return (
    <>
      <Head title={user?.username || 'Utilisateur'} />
      <DefaultLayout>
        <Page>
          <PageTitle>Statistiques utilisateur</PageTitle>
          <form onSubmit={onSubmit}>
            <div className="flex">
              <Input
                className="rounded-r-none w-full"
                placeholder="Pseudo"
                name="username"
                defaultValue={user?.username}
                disabled={isLoading}
              />
              <Button
                variant="tertiary"
                className="rounded-l-none w-12"
                disabled={isLoading}
                isIconOnly
              >
                <SearchIcon className="size-4" />
              </Button>
            </div>
          </form>
          {!error && !user && (
            <div className="flex flex-col gap-2 [&>p]:text-sm xs:[&>p]:text-base">
              <PageSubTitle>Informations</PageSubTitle>
              <p>
                Pour commencer à voir les statistiques, tapez le pseudo d'un joueur sur la barre de
                recherche au-dessus.
              </p>
              <p>
                Cet outil permet d'afficher les statistiques avancées d'un utilisateur jouant à
                Paladium. On y retrouve des statistiques telles que l'évolution des niveaux de
                métier, l'argent, et le temps de jeu.
              </p>
              <p>
                On a également l'historique de sa faction et de son rang. Toutes ces informations
                seront présentées sous forme d'une page intuitive et facile à lire.
              </p>
              {exampleUser && (
                <>
                  <p>Un exemple d'utilisateur est disponible juste en dessous.</p>
                  <PageSubTitle>Exemple</PageSubTitle>
                  <UserDetails user={exampleUser} />
                </>
              )}
            </div>
          )}
          {error && !user && (
            <div className="flex flex-col gap-4 items-center justify-center">
              <TriangleAlertIcon className="size-20 animate-blink" />
              <span className="font-pixel animate-blink">Une erreur est survenue</span>
              <span className="font-bold text-lg text-destructive">{error}</span>
            </div>
          )}
          {user && <UserDetails user={user} />}
        </Page>
      </DefaultLayout>
    </>
  )
}
