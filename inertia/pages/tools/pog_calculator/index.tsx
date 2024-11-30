import type { InferPageProps } from '@adonisjs/inertia/types'
import { useForm, usePage } from '@inertiajs/react'
import {
  Button,
  Checkbox,
  Loading,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@lemonsqueezy/wedges'
import { CalculatorIcon, Trash2Icon } from 'lucide-react'
import { FormEvent, useRef } from 'react'

import type PogCalculatorController from '#tools/controller/pog_calculator_controller'
import { ArrowRightIcon } from '~/components/icons'
import DefaultLayout from '~/components/layouts/default'
import { Page, PageSubTitle, PageTitle } from '~/components/page'
import { Head } from '~/components/shared/head'
import { Card, CardContent, CardFooter } from '~/components/ui/card'
import { FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { useSearchParams } from '~/hooks/use_search_params'
import { cn } from '~/lib/utils'
import { CalculatorResult } from './components/calculator_result'
import { PogLevelControls } from './components/pog_level_controls'

type PogCalculatorIndexProps = InferPageProps<PogCalculatorController, 'index'>

export default function PogCalculatorIndex(props: PogCalculatorIndexProps) {
  const { options, result } = props

  const { errors = {} } = usePage().props
  const resultSubTitleRef = useRef<HTMLHeadingElement>(null)
  const [searchParams] = useSearchParams()

  const form = useForm({
    'current-level': Number(searchParams.get('current-level') || 1),
    'target-level': Number(searchParams.get('target-level') || 1),
    'use-pet-skill': Boolean(
      searchParams.get('use-pet-skill') || Boolean(searchParams.get('pet-skill-percentage'))
    ),
    'pet-skill-percentage': Number(searchParams.get('pet-skill-percentage') || 0),
  })

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()

    form.transform((data) =>
      Object.fromEntries(
        Object.entries(data)
          .filter(([_, value]) => Boolean(value))
          .map(([key, value]) => [key, String(value)])
      )
    )
    form.get('/tools/pog-calculator', {
      onSuccess: () => {
        resultSubTitleRef.current?.scrollIntoView({ behavior: 'smooth' })
      },
    })
  }

  return (
    <>
      <Head
        descriptors={[
          { title: 'Calculateur de la Pickaxe Of the Gods' },
          {
            name: 'description',
            content:
              "Calculez l'expérience et visualisez les éléments dont vous avez besoin pour améliorer votre pioche.",
          },
          {
            name: 'og:description',
            content:
              "Calculez l'expérience et visualisez les éléments dont vous avez besoin pour améliorer votre pioche.",
          },
        ]}
      />
      <DefaultLayout>
        <Page>
          <PageTitle>Calculateur de la Pickaxe Of the Gods</PageTitle>
          <p>
            Calculez l'expérience et visualisez les éléments dont vous avez besoin pour améliorer
            votre pioche.
          </p>
          <div className="flex flex-row items-center justify-between gap-2">
            <PageSubTitle>Paramètres</PageSubTitle>
            <Button
              className={cn('opacity-0', form.isDirty && 'opacity-100')}
              variant="outline"
              size="sm"
              isIconOnly
              onClick={() => form.reset()}
            >
              <Trash2Icon className="size-4" />
            </Button>
          </div>
          <Card>
            <CardContent className="pt-4">
              <form id="calculator" className="space-y-2" onSubmit={onSubmit}>
                <Checkbox.Root className="items-center" asChild>
                  <label>
                    <Checkbox.Item
                      onCheckedChange={(checked) => {
                        form.setData('use-pet-skill', Boolean(checked))

                        if (!checked) {
                          form.setData('pet-skill-percentage', 0)
                        }
                      }}
                      checked={form.data['use-pet-skill']}
                    />
                    <span className="text-sm">Utiliser la compétence "Bonne pioche" du pet ?</span>
                  </label>
                </Checkbox.Root>
                {form.data['use-pet-skill'] && (
                  <FormItem>
                    <FormLabel>Pourcentage de la compétence</FormLabel>
                    <Select
                      value={String(form.data['pet-skill-percentage'])}
                      onValueChange={(value) => form.setData('pet-skill-percentage', Number(value))}
                    >
                      <SelectTrigger />
                      <SelectContent>
                        <SelectItem value="0">0%</SelectItem>
                        <SelectItem value="10">10%</SelectItem>
                        <SelectItem value="20">20%</SelectItem>
                        <SelectItem value="30">30%</SelectItem>
                        <SelectItem value="40">40%</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage message={errors?.['pet-skill-percentage']} />
                  </FormItem>
                )}
                <div className="flex flex-col xs:flex-row items-center justify-evenly gap-4">
                  <FormItem className="items-center">
                    <FormLabel>Niveau actuel</FormLabel>
                    <PogLevelControls
                      level={form.data['current-level']}
                      onLevelChange={(level) => form.setData('current-level', level)}
                      onDecreaseLevel={() =>
                        form.setData('current-level', form.data['current-level'] - 1)
                      }
                      onIncreaseLevel={() =>
                        form.setData('current-level', form.data['current-level'] + 1)
                      }
                    />
                    <FormMessage message={errors?.['current-level']} />
                  </FormItem>
                  <ArrowRightIcon className="rotate-90 xs:rotate-0 xs:mt-[32px] size-4 invert dark:invert-0" />
                  <FormItem className="items-center">
                    <FormLabel>Niveau cible</FormLabel>
                    <PogLevelControls
                      level={form.data['target-level']}
                      onLevelChange={(level) => form.setData('target-level', level)}
                      onDecreaseLevel={() =>
                        form.setData('target-level', form.data['target-level'] - 1)
                      }
                      onIncreaseLevel={() =>
                        form.setData('target-level', form.data['target-level'] + 1)
                      }
                    />
                    <FormMessage message={errors?.['target-level']} />
                  </FormItem>
                </div>
              </form>
            </CardContent>
            <CardFooter className="justify-end">
              <Button
                form="calculator"
                disabled={Boolean(form.processing)}
                before={
                  form.processing ? (
                    <Loading className="size-4" />
                  ) : (
                    <CalculatorIcon className="size-4" />
                  )
                }
                type="submit"
                variant="secondary"
              >
                Calculer
              </Button>
            </CardFooter>
          </Card>
          {result && options && (
            <>
              <PageSubTitle ref={resultSubTitleRef}>Résultats</PageSubTitle>
              <CalculatorResult options={options} result={result} />
            </>
          )}
        </Page>
      </DefaultLayout>
    </>
  )
}
