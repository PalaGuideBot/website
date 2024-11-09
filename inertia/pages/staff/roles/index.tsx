import { InferPageProps } from '@adonisjs/inertia/types'
import { Button } from '@lemonsqueezy/wedges'

import type RoleController from '#staff/controllers/role_controller'
import StaffLayout from '~/components/layouts/staff'
import { Page } from '~/components/page'
import { Head } from '~/components/shared/head'
import { Card, CardContent } from '~/components/ui/card'
import { columns } from './columns'
import { DataTable } from './data_table'
import { RoleModal } from './role_modal'

type RoleIndexPageProps = InferPageProps<RoleController, 'index'>

export default function RoleIndexPage(props: RoleIndexPageProps) {
  const { roles } = props

  return (
    <>
      <Head descriptors={[{ title: 'Rôles' }]} />
      <StaffLayout>
        <Page className="mx-0 max-w-none">
          <div className="flex justify-end">
            <RoleModal>
              <Button type="button" size="sm" variant="outline">
                Ajouter un rôle
              </Button>
            </RoleModal>
          </div>
          <Card>
            <CardContent className="p-0">
              <DataTable columns={columns} data={roles} />
            </CardContent>
          </Card>
        </Page>
      </StaffLayout>
    </>
  )
}
