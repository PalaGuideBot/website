import type FactionsController from '#stats/controllers/factions_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Head, router, usePage } from '@inertiajs/react'
import { Button } from '@lemonsqueezy/wedges'
import { SearchIcon, TriangleAlertIcon } from 'lucide-react'
import { FormEvent, useState } from 'react'
import DefaultLayout from '~/components/layouts/default'
import { Page, PageSubTitle, PageTitle } from '~/components/page'
import Input from '~/components/ui/input'
import { factionDetails as FactionDetails } from './components/faction_details'

export type FactionShowProps = InferPageProps<FactionsController, 'show'>

export default function FactionShow(props: FactionShowProps) {
  const { faction, exampleFaction } = props
  const {
    props: { error },
  } = usePage<{ error?: string }>()

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name') as string
    router.visit(`/stats/factions/${name}`, {
      preserveState: true,
      onStart: () => setIsLoading(true),
      onFinish: () => setIsLoading(false),
    })
  }

  return (
    <>
      <Head title={faction?.name || 'Faction'} />
      <DefaultLayout>
        <Page>
          <PageTitle>Statistiques faction</PageTitle>
          <form onSubmit={onSubmit}>
            <div className="flex">
              <Input
                className="rounded-r-none w-full"
                placeholder="Nom"
                name="name"
                defaultValue={faction?.name}
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
          {!error && !faction && (
            <div className="flex flex-col gap-2 [&>p]:text-sm xs:[&>p]:text-base">
              <PageSubTitle>Informations</PageSubTitle>
              <p>
                Pour commencer à voir les statistiques, tapez le nom d'une faction sur la barre de
                recherche au-dessus.
              </p>
              {exampleFaction && (
                <>
                  <p>Un exemple de faction est disponible juste en dessous.</p>
                  <PageSubTitle>Exemple</PageSubTitle>
                  <FactionDetails faction={exampleFaction} />
                </>
              )}
            </div>
          )}
          {error && !faction && (
            <div className="flex flex-col gap-4 items-center justify-center">
              <TriangleAlertIcon className="size-20 animate-blink" />
              <span className="font-pixel animate-blink">Une erreur est survenue</span>
              <span className="font-bold text-lg text-destructive">{error}</span>
            </div>
          )}
          {faction && <FactionDetails faction={faction} />}
        </Page>
      </DefaultLayout>
    </>
  )
}
