import type DashboardController from '#staff/controllers/dashboard_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/react'
import StaffLayout from '~/components/layouts/staff'
import { Page, PageTitle } from '~/components/page'

type DashboardIndexPageProps = InferPageProps<DashboardController, 'index'>

export default function DashboardIndexPage(props: DashboardIndexPageProps) {
  const { stats } = props
  return (
    <>
      <Head title="Tableau de bord" />
      <StaffLayout>
        <Page>
          <PageTitle>Tableau de bord</PageTitle>
          <pre>{JSON.stringify(stats, null, 2)}</pre>
        </Page>
      </StaffLayout>
    </>
  )
}
