import type { InferPageProps } from '@adonisjs/inertia/types'
import { useForm, usePage } from '@inertiajs/react'
import { CalculatorIcon, Trash2Icon } from 'lucide-react'
import { FormEvent, useRef } from 'react'

import type PogCalculatorController from '#tools/controller/pog_calculator_controller'
import { DefaultLayout } from '~/components/layouts/default'
import { Page, PageSubTitle, PageTitle } from '~/components/page'
import { Head } from '~/components/shared/head'
import { SummerBoostButton } from '~/components/shared/summer_boost_button'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardFooter } from '~/components/ui/card'
import { Checkbox } from '~/components/ui/checkbox'
import { FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { Spinner } from '~/components/ui/spinner'
import { useSearchParams } from '~/hooks/use_search_params'
import { getMinecraftItemUrl } from '~/lib/minecraft'
import { trackEvent } from '~/lib/umami'
import { cn } from '~/lib/utils'
import { BetaAlert } from './components/beta_alert'
import { CalculatorResult } from './components/calculator_result'
import { PogLevelControls } from './components/pog_level_controls'
import { SpiderWeb } from '~/components/shared/spider_web'
import { HalloweenEyes } from '~/components/shared/halloween_decorations'

type PogCalculatorIndexProps = InferPageProps<PogCalculatorController, 'index'>

export default function PogCalculatorIndex(props: PogCalculatorIndexProps) {
  const { items, options, result } = props

  const { errors = {} } = usePage().props
  const resultSubTitleRef = useRef<HTMLHeadingElement>(null)
  const [searchParams] = useSearchParams()

  const form = useForm({
    'block': searchParams.get('block') || '',
    'current-level': Number(searchParams.get('current-level') || 1),
    'current-xp': Number(searchParams.get('current-xp') || 0),
    'use-good-pickaxe': Boolean(
      searchParams.get('use-good-pickaxe') || searchParams.get('good-pickaxe-percentage')
    ),
    'good-pickaxe-percentage': Number(searchParams.get('good-pickaxe-percentage') || 0),
    'use-experienced-pickaxe': Boolean(
      searchParams.get('use-experienced-pickaxe') ||
        searchParams.get('experienced-pickaxe-percentage')
    ),
    'experienced-pickaxe-percentage': Number(
      searchParams.get('experienced-pickaxe-percentage') || 0
    ),
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
        const item = items.find((i) => i.id === form.data.block)
        trackEvent('pog-calculator', { block: item?.name || form.data.block })
      },
    })
  }

  return (
    <>
      <Head
        title="Calculateur de la Pickaxe Of the Gods"
        description="Calculez l'expérience et visualisez les éléments dont vous avez besoin pour améliorer votre pioche."
        defaultOg
      />
      <DefaultLayout>
        <Page>
          <SpiderWeb /> {/* Halloween decoration */}
          <PageTitle>Calculateur de la Pickaxe Of the Gods</PageTitle>
          <p>
            Calculez l'expérience et visualisez les éléments dont vous avez besoin pour améliorer
            votre pioche.
          </p>
          <BetaAlert />
          <div className="flex flex-row items-center justify-between gap-2">
            <PageSubTitle>Paramètres</PageSubTitle>
            <Button
              className={cn('opacity-0', form.isDirty && 'opacity-100')}
              variant="outline"
              size="icon"
              onClick={() => form.reset()}
            >
              <Trash2Icon />
            </Button>
          </div>
          <Card className="gap-4">
            <CardContent>
              <form id="calculator" className="space-y-4" onSubmit={onSubmit}>
                <FormItem>
                  <FormLabel /* tooltip="Le bloc que vous voulez one-shot" */>Bloc</FormLabel>
                  <Select
                    value={form.data.block}
                    onValueChange={(value) => form.setData('block', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choissisez un bloc" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {items.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            <div className="flex items-center gap-1">
                              <img
                                className="w-auto h-6 object-contain"
                                src={getMinecraftItemUrl(item.id)}
                              />
                              <span>{item.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage message={errors?.block} />
                </FormItem>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="use-good-pickaxe"
                    onCheckedChange={(checked) => {
                      form.setData('use-good-pickaxe', Boolean(checked))

                      if (!checked) {
                        form.setData('good-pickaxe-percentage', 0)
                      }
                    }}
                    checked={form.data['use-good-pickaxe']}
                  />
                  <label htmlFor="use-good-pickaxe" className="text-sm">
                    Utiliser la compétence "Bonne pioche" du pet ?
                  </label>
                </div>
                {form.data['use-good-pickaxe'] && (
                  <FormItem>
                    <FormLabel htmlFor="good-pickaxe-percentage">
                      Pourcentage de la compétence
                    </FormLabel>
                    <Input
                      id="good-pickaxe-percentage"
                      type="number"
                      className="bg-transparent"
                      min={0}
                      value={form.data['good-pickaxe-percentage']}
                      onChange={(event) =>
                        form.setData('good-pickaxe-percentage', Number(event.target.value))
                      }
                    />
                    <FormMessage message={errors?.['good-pickaxe-percentage']} />
                  </FormItem>
                )}
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="use-experienced-pickaxe"
                    onCheckedChange={(checked) => {
                      form.setData('use-experienced-pickaxe', Boolean(checked))

                      if (!checked) {
                        form.setData('experienced-pickaxe-percentage', 0)
                      }
                    }}
                    checked={form.data['use-experienced-pickaxe']}
                  />
                  <label htmlFor="use-experienced-pickaxe" className="text-sm">
                    Utiliser la compétence "Pioche expérimentée" du pet ?
                  </label>
                </div>
                {form.data['use-experienced-pickaxe'] && (
                  <FormItem>
                    <FormLabel htmlFor="experienced-pickaxe-percentage">
                      Pourcentage de la compétence
                    </FormLabel>
                    <Input
                      id="experienced-pickaxe-percentage"
                      type="number"
                      className="bg-transparent"
                      min={0}
                      value={String(form.data['experienced-pickaxe-percentage'])}
                      onChange={(event) =>
                        form.setData('experienced-pickaxe-percentage', Number(event.target.value))
                      }
                    />
                    <FormMessage message={errors?.['experienced-pickaxe-percentage']} />
                  </FormItem>
                )}
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <FormItem className="items-center md:items-baseline">
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
                  <FormItem className="grow">
                    <FormLabel
                      id="current-xp"
                      /* tooltip="La valeur qui s'affiche lorsque vous passez la souris sur la pioche" */
                    >
                      XP actuelle (facultatif)
                    </FormLabel>
                    <Input
                      id="current-xp"
                      type="number"
                      className="bg-transparent"
                      min={0}
                      value={form.data['current-xp']}
                      onChange={(event) => form.setData('current-xp', Number(event.target.value))}
                    />
                    <FormMessage message={errors?.['current-xp']} />
                  </FormItem>
                </div>
              </form>
            </CardContent>
            <CardFooter className="justify-between">
              <SummerBoostButton
                tooltip={{
                  children: (
                    <span>
                      <span className="text-primary">+300%</span> XP obtenues sur les POG.
                    </span>
                  ),
                }}
              />
              <Button
                form="calculator"
                disabled={Boolean(form.processing)}
                type="submit"
                variant="secondary"
              >
                {form.processing ? <Spinner className="size-4" /> : <CalculatorIcon />}
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
    <HalloweenEyes /> {/* Halloween decoration */}
    </>
  )
}
