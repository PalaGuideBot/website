import { Head } from '@inertiajs/react'
import DefaultLayout from '~/components/layouts/default'

export default function Home() {
  return (
    <>
      <Head title="Accueil" />

      <DefaultLayout>
        <h1 className="text-lg font-semibold">Accueil</h1>
      </DefaultLayout>
    </>
  )
}
