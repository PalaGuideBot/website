import type UsersController from '#stats/controllers/users_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/react'
import DefaultLayout from '~/components/layouts/default'

export default function UserShow(props: InferPageProps<UsersController, 'show'>) {
  const { user } = props
  return (
    <>
      <Head title={user?.username || 'Utilisateur'} />
      <DefaultLayout>{user && <pre>{JSON.stringify(user, null, 1)}</pre>}</DefaultLayout>
    </>
  )
}
