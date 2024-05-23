import type MoneyController from '#leaderboard/controllers/money_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/react'
import DefaultLayout from '~/components/layouts/default'

export default function MoneyIndex(props: InferPageProps<MoneyController, 'index'>) {
  const { leaderboard } = props
  return (
    <>
      <Head title="Leaderboard: Money" />
      <DefaultLayout>
        <pre>{JSON.stringify(leaderboard, null, 1)}</pre>
      </DefaultLayout>
    </>
  )
}
