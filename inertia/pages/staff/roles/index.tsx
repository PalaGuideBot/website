import { InferPageProps } from '@adonisjs/inertia/types'

import type RoleController from '#staff/controllers/role_controller'
import { StaffLayout } from '~/components/layouts/staff'
import { Page } from '~/components/page'
import { Head } from '~/components/shared/head'
import { columns } from './columns'
import { DataTable } from './data_table'

type RoleIndexPageProps = InferPageProps<RoleController, 'index'>

export default function RoleIndexPage(props: RoleIndexPageProps) {
  const { roles } = props

  return (
    <>
      <Head title="Rôles" />
      <StaffLayout>
        <Page className="mx-0 max-w-none">
          <DataTable columns={columns} data={roles} />
        </Page>
      </StaffLayout>
    </>
  )
}
