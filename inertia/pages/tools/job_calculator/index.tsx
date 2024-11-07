import type { InferPageProps } from '@adonisjs/inertia/types'
import { useForm, usePage } from '@inertiajs/react'
import {
  Button,
  Loading,
  Select,
  SelectContent,
  SelectGroup,
  SelectIcon,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@lemonsqueezy/wedges'
import type { Infer } from '@vinejs/vine/types'
import { AnimatePresence, motion } from 'framer-motion'
import { CalculatorIcon, Trash2Icon } from 'lucide-react'
import { FormEvent, useRef } from 'react'
import { toast } from 'sonner'

import type { playerJobsValidator } from '#stats/validators/player_validator'
import type JobCalculatorController from '#tools/controller/job_calculator_controller'
import { ArrowRightIcon } from '~/components/icons'
import DefaultLayout from '~/components/layouts/default'
import { Page, PageSubTitle, PageTitle } from '~/components/page'
import { Head } from '~/components/shared/head'
import { Card, CardContent, CardFooter } from '~/components/ui/card'
import { FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import Input from '~/components/ui/input'
import { smallIcons } from '~/content/jobs'
import { useSearchParams } from '~/hooks/use_search_params'
import { client } from '~/lib/client'
import { cn } from '~/lib/utils'
import { CalculatorResult } from './components/calculator_result'
import { JobLevelControls } from './components/job_level_controls'

const jobs = [
  {
    label: 'Miner',
    value: 'miner',
    icon: smallIcons.miner,
  },

  {
    label: 'Farmer',
    value: 'farmer',
    icon: smallIcons.farmer,
  },
  {
    label: 'Hunter',
    value: 'hunter',
    icon: smallIcons.hunter,
  },
  {
    label: 'Alchimiste',
    value: 'alchemist',
    icon: smallIcons.alchemist,
  },
]

type JobCalculatorIndexProps = InferPageProps<JobCalculatorController, 'index'>

export default function JobCalculatorIndex(props: JobCalculatorIndexProps) {
  const { options, result } = props

  const { errors = {} } = usePage().props
  const resultSubTitleRef = useRef<HTMLHeadingElement>(null)
  const [searchParams] = useSearchParams()

  const form = useForm({
    'job': searchParams.get('job') || '',
    'current-level': Number(searchParams.get('current-level')),
    'target-level': Number(searchParams.get('target-level')),
    'bonus-xp': Number(searchParams.get('bonus-xp')),
    'pseudo': searchParams.get('pseudo') || '',
  })

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()

    form.transform((data) =>
      Object.fromEntries(Object.entries(data).map(([key, value]) => [key, String(value)]))
    )
    form.get('/tools/job-calculator', {
      onSuccess: () => {
        resultSubTitleRef.current?.scrollIntoView({ behavior: 'smooth' })
      },
    })
  }

  const onSubmitFillJob = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    toast.promise(
      async () => {
        const response = await client.post(`players/${formData.get('pseudo')}/jobs`)
        const data = await response.json<Infer<typeof playerJobsValidator>>()

        const target = data[form.data.job as keyof typeof data]

        if (target) {
          form.setData('current-level', target.level)
        }
      },
      {
        loading: 'Chargement...',
        success: 'Informations récupérées',
        error: 'Impossible de récupérer les informations',
      }
    )
  }

  return (
    <>
      <Head descriptors={[{ title: 'Calculateur de métiers' }]} />
      <DefaultLayout>
        <Page>
          <PageTitle>Calculateur de métiers</PageTitle>
          <p>
            Calculez l'xp et visualisez les éléments dont vous avez besoin pour progresser dans vos
            métiers.
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
              <form id="fill-job" onSubmit={onSubmitFillJob} />
              <form id="calculator" className="space-y-1.5" onSubmit={onSubmit}>
                <FormItem>
                  <FormLabel htmlFor="job">Métier</FormLabel>
                  <Select
                    id="job"
                    name="job"
                    value={form.data.job}
                    onValueChange={(value) => form.setData('job', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choissisez un métier" />
                      <SelectIcon />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {jobs.map((job) => (
                          <SelectItem key={job.value} value={job.value}>
                            <div className="flex items-center gap-1">
                              <job.icon />
                              <span>{job.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage message={errors?.['job']} />
                </FormItem>
                <AnimatePresence>
                  {form.data.job.length !== 0 && (
                    <>
                      <motion.div
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        className="space-y-1.5"
                      >
                        <FormItem>
                          <FormLabel>
                            Entrez votre pseudo pour pré-remplir les informations
                          </FormLabel>
                          <div className="flex flex-row gap-2">
                            <Input
                              name="pseudo"
                              form="fill-job"
                              placeholder="Pseudo"
                              className="min-w-0 flex-grow bg-transparent"
                              value={form.data.pseudo}
                              onChange={(event) => form.setData('pseudo', event.target.value)}
                            />
                            <Button type="submit" form="fill-job" variant="outline">
                              Remplir
                            </Button>
                          </div>
                        </FormItem>
                        <div className="flex flex-col xs:flex-row items-center justify-evenly gap-4">
                          <FormItem className="items-center">
                            <FormLabel>Niveau actuel</FormLabel>
                            <JobLevelControls
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
                          <ArrowRightIcon className="rotate-90 xs:rotate-0 xs:mt-[32px] size-4" />
                          <FormItem className="items-center">
                            <FormLabel>Niveau cible</FormLabel>
                            <JobLevelControls
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
                        <FormItem>
                          <FormLabel>XP bonus</FormLabel>
                          <Input
                            type="number"
                            name="bonus-xp"
                            className="bg-transparent"
                            placeholder="0"
                            min={0}
                            max={33}
                            value={form.data['bonus-xp']}
                            onChange={(event) =>
                              form.setData('bonus-xp', Number(event.target.value))
                            }
                          />
                          <FormMessage message={errors?.['bonus-xp']} />
                        </FormItem>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
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
