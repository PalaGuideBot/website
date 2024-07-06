import type UsersController from '#stats/controllers/users_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { usePage } from '@inertiajs/react'
import DefaultLayout from '~/components/layouts/default'
import { Page, PageSubTitle, PageTitle } from '~/components/page'
import { DisplayError } from '~/components/shared/display_error'
import { Head } from '~/components/shared/head'
import { getHeadUrl } from '~/lib/minecraft'
import { SearchUserForm } from './components/search_user_form'
import { UserDetails } from './components/user_details'

export type UserShowProps = InferPageProps<UsersController, 'show'>

export default function UserShow(props: UserShowProps) {
  const { user, exampleUser } = props
  const {
    props: { error },
  } = usePage<{ error?: string }>()

  return (
    <>
      {user ? (
        <Head
          descriptors={[
            { title: user.username },
            { name: 'og:image', content: getHeadUrl(user.username) },
            { name: 'twitter:image', content: getHeadUrl(user.username) },
          ]}
        />
      ) : (
        <Head descriptors={[{ title: 'Utilisateur' }]} />
      )}
      <DefaultLayout>
        <Page>
          <PageTitle>Statistiques utilisateur</PageTitle>
          <SearchUserForm defaultValue={user?.username} />
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
          {error && !user && <DisplayError>{error}</DisplayError>}
          {user && <UserDetails user={user} />}
        </Page>
      </DefaultLayout>
    </>
  )
}
