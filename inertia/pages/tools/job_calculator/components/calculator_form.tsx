import { useForm, usePage } from '@inertiajs/react'
import { Select as SelectPrimitive } from 'radix-ui'
import { Infer } from '@vinejs/vine/types'
import { CalculatorIcon, XIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useIMask } from 'react-imask'
import { toast } from 'sonner'

import type { playerJobsValidator } from '#stats/validators/player_validator'
import { parseItems, stringifyItems } from '#tools/helpers/item'
import { ArrowRightIcon } from '~/components/icons'
import { SummerBoostButton } from '~/components/shared/summer_boost_button'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardFooter } from '~/components/ui/card'
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
import { Table, TableBody, TableCell, TableRow } from '~/components/ui/table'
import { useSearchParams } from '~/hooks/use_search_params'
import { client } from '~/lib/client'
import { getItemIconUrl } from '../contents/item'
import { useJobCalculator } from './job_calculator_wrapper'
import { JobLevelControls } from './job_level_controls'

interface CalculatorFormProps {
  onSuccess?: () => void
}

export function CalculatorForm(props: CalculatorFormProps) {
  const { mode } = useJobCalculator()

  if (mode === 'standard') {
    return <StandardCalculatorForm {...props} />
  }

  if (mode === 'reverse') {
    return <ReverseCalculatorForm {...props} />
  }

  return null
}

interface StandardCalculatorFormProps extends CalculatorFormProps {}

function StandardCalculatorForm({ onSuccess }: StandardCalculatorFormProps) {
  const { errors = {} } = usePage().props
  const [searchParams] = useSearchParams()

  const { jobs } = useJobCalculator()

  const form = useForm({
    'mode': 'standard',
    'job': searchParams.get('job') || '',
    'current-level': Number(searchParams.get('current-level') || 1),
    'target-level': Number(searchParams.get('target-level') || 1),
    'bonus-xp': Number(searchParams.get('bonus-xp')),
    'current-xp': Number(searchParams.get('current-xp')),
    'pseudo': searchParams.get('pseudo') || '',
  })

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    form.transform((data) =>
      Object.fromEntries(Object.entries(data).map(([key, value]) => [key, String(value)]))
    )
    form.get('/tools/job-calculator', {
      onSuccess: onSuccess,
    })
  }

  const onSubmitFillJob = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    toast.promise(
      async () => {
        const response = await client.post(`players/${formData.get('pseudo')}/jobs`)
        const data = await response.json<Infer<typeof playerJobsValidator>>()

        const target = data[form.data.job as keyof typeof data]

        if (target) {
          form.setData('current-level', target.level)
          form.setData('current-xp', target.xp)
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
    <Card className="gap-4">
      <CardContent>
        <form id="fill-job" onSubmit={onSubmitFillJob} />
        <form id="calculator" className="space-y-4" onSubmit={onSubmit}>
          <FormItem>
            <FormLabel htmlFor="job">Métier</FormLabel>
            <Select value={form.data.job} onValueChange={(value) => form.setData('job', value)}>
              <SelectTrigger className="w-full" id="job" name="job">
                <SelectValue placeholder="Choissisez un métier" />
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
          <div className="space-y-4">
            <FormItem>
              <FormLabel>Entrez votre pseudo pour pré-remplir les informations</FormLabel>
              <div className="flex flex-row gap-2">
                <Input
                  name="pseudo"
                  form="fill-job"
                  placeholder="Pseudo"
                  className="min-w-0 grow bg-transparent"
                  value={form.data.pseudo}
                  onChange={(event) => form.setData('pseudo', event.target.value)}
                  disabled={!form.data.job}
                />
                <Button type="submit" form="fill-job" variant="outline" disabled={!form.data.job}>
                  Remplir
                </Button>
              </div>
            </FormItem>
            <div className="flex flex-col sm:flex-row items-center justify-evenly gap-4">
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
              <ArrowRightIcon className="rotate-90 sm:rotate-0 sm:mt-[32px] size-4" />
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
            <div className="grid sm:grid-cols-2 gap-4">
              <FormItem>
                <FormLabel>XP bonus</FormLabel>
                <Input
                  type="number"
                  name="bonus-xp"
                  className="bg-transparent"
                  placeholder="0"
                  min={0}
                  max={500}
                  value={form.data['bonus-xp']}
                  onChange={(event) => form.setData('bonus-xp', Number(event.target.value))}
                />
                <FormMessage message={errors?.['bonus-xp']} />
              </FormItem>
              <FormItem>
                <FormLabel /* tooltip="La valeur qui s'affiche lorsque vous passez votre souris sur un métier" */
                >
                  XP actuelle (facultatif)
                </FormLabel>
                <Input
                  type="number"
                  name="current-xp"
                  className="bg-transparent"
                  placeholder="0"
                  min={0}
                  value={form.data['current-xp']}
                  onChange={(event) => form.setData('current-xp', Number(event.target.value))}
                />
                <FormMessage message={errors?.['current-xp']} />
              </FormItem>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="justify-between">
        <SummerBoostButton
          tooltip={{
            children: (
              <span>
                <span className="text-primary">+300%</span> XP sur les métiers. Appliquez le sur le
                champ "XP bonus" pour le calcul.
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
  )
}

interface ReverseCalculatorFormProps extends CalculatorFormProps {}

function ReverseCalculatorForm({ onSuccess }: ReverseCalculatorFormProps) {
  const { errors = {} } = usePage().props
  const [searchParams] = useSearchParams()

  const { jobs, items } = useJobCalculator()

  const form = useForm({
    'mode': 'reverse',
    'job': searchParams.get('job') || '',
    'items': parseItems(searchParams.get('items') || ''),
    'current-level': Number(searchParams.get('current-level') || 1),
    'bonus-xp': Number(searchParams.get('bonus-xp')),
    'current-xp': Number(searchParams.get('current-xp')),
    'pseudo': searchParams.get('pseudo') || '',
  })

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (form.data.items.length === 0) {
      toast.error('Ajoutez au moins un item.')
      return
    }

    form.transform((data) =>
      Object.fromEntries(
        Object.entries(data).map(([key, value]) => {
          if (key === 'items') {
            return [key, stringifyItems(value as ReturnType<typeof parseItems>)]
          }
          return [key, String(value)]
        })
      )
    )
    form.get('/tools/job-calculator', {
      onSuccess: onSuccess,
    })
  }

  async function onSubmitFillJob(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    toast.promise(
      async () => {
        const response = await client.post(`players/${formData.get('pseudo')}/jobs`)
        const data = await response.json<Infer<typeof playerJobsValidator>>()

        const target = data[form.data.job as keyof typeof data]

        if (target) {
          form.setData('current-level', target.level)
          form.setData('current-xp', target.xp)
        }
      },
      {
        loading: 'Chargement...',
        success: 'Informations récupérées',
        error: 'Impossible de récupérer les informations',
      }
    )
  }

  function addNewItem() {
    if (!form.data.job) {
      return
    }

    const item = items.find(
      (i) =>
        i.job === form.data.job &&
        !form.data.items.some((j) => j.itemId === i.id && j.action === i.action)
    )

    if (!item) {
      toast.error("Plus d'items disponibles pour ce métier.")
      return
    }

    form.setData('items', [
      ...form.data.items,
      { quantity: 1, itemId: item.id, action: item.action },
    ])
  }

  return (
    <Card className="gap-4">
      <CardContent>
        <form id="fill-job" onSubmit={onSubmitFillJob} />
        <form id="calculator" className="space-y-4" onSubmit={onSubmit}>
          <FormItem>
            <FormLabel htmlFor="job">Métier</FormLabel>
            <Select
              value={form.data.job}
              onValueChange={(value) => {
                form.setData('job', value)
                form.setData('items', [])
              }}
            >
              <SelectTrigger className="w-full" id="job" name="job">
                <SelectValue placeholder="Choissisez un métier" />
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
          <div className="flex flex-row items-center gap-4">
            <FormItem>
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
            <FormItem className="flex-1">
              <FormLabel>Entrez votre pseudo pour pré-remplir les informations</FormLabel>
              <div className="flex flex-row gap-2">
                <Input
                  name="pseudo"
                  form="fill-job"
                  placeholder="Pseudo"
                  className="min-w-0 grow bg-transparent"
                  value={form.data.pseudo}
                  onChange={(event) => form.setData('pseudo', event.target.value)}
                  disabled={!form.data.job}
                />
                <Button type="submit" form="fill-job" variant="outline" disabled={!form.data.job}>
                  Remplir
                </Button>
              </div>
            </FormItem>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <FormItem>
              <FormLabel>XP bonus</FormLabel>
              <Input
                type="number"
                name="bonus-xp"
                className="bg-transparent"
                placeholder="0"
                min={0}
                max={500}
                value={form.data['bonus-xp']}
                onChange={(event) => form.setData('bonus-xp', Number(event.target.value))}
              />
              <FormMessage message={errors?.['bonus-xp']} />
            </FormItem>
            <FormItem>
              <FormLabel /* tooltip="La valeur qui s'affiche lorsque vous passez votre souris sur un métier" */
              >
                XP actuelle (facultatif)
              </FormLabel>
              <Input
                type="number"
                name="current-xp"
                className="bg-transparent"
                placeholder="0"
                min={0}
                value={form.data['current-xp']}
                onChange={(event) => form.setData('current-xp', Number(event.target.value))}
              />
              <FormMessage message={errors?.['current-xp']} />
            </FormItem>
          </div>
          <FormItem>
            <FormLabel>Items</FormLabel>
            {form.data.items.length !== 0 && (
              <Table>
                <TableBody>
                  {form.data.items.map((item) => (
                    <TableRow key={item.itemId + item.action}>
                      <TableCell>
                        <JobItem
                          item={item}
                          exisitingItemIds={form.data.items.map((i) => i.itemId)}
                          onChange={(value) => {
                            form.setData(
                              'items',
                              form.data.items.map((i) => {
                                if (i.itemId === item.itemId && i.action === item.action) {
                                  return value
                                }
                                return i
                              })
                            )
                          }}
                          onRemove={() => {
                            form.setData(
                              'items',
                              form.data.items
                                .map((i) =>
                                  i.itemId === item.itemId && i.action === item.action ? null : i
                                )
                                .filter((i) => i !== null)
                            )
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            <Button type="button" variant="outline" onClick={addNewItem}>
              Ajouter un item
            </Button>
          </FormItem>
        </form>
      </CardContent>
      <CardFooter className="justify-between">
        <SummerBoostButton
          tooltip={{
            children: (
              <span>
                <span className="text-primary">+300%</span> XP sur les métiers. Appliquez le sur le
                champ "XP bonus" pour le calcul.
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
  )
}

interface JobItemProps {
  item: ReturnType<typeof parseItems>[number]
  exisitingItemIds?: string[]
  onChange: (item: ReturnType<typeof parseItems>[number]) => void
  onRemove?: () => void
}

function JobItem({ item, exisitingItemIds = [], onChange, onRemove }: JobItemProps) {
  const { items } = useJobCalculator()

  const jobItem = items.find((i) => i.id === item.itemId && i.action === item.action)!

  const {
    ref,
    setValue: setMaskValue,
    value: maskValue,
  } = useIMask(
    {
      mask: Number,
      min: 1,
    },
    {
      defaultValue: String(item.quantity),
      onAccept: (value) => {
        if (Number(value) >= 1) {
          onChange({ ...item, quantity: Number(value) })
        }
      },
    }
  )

  useEffect(() => {
    if (maskValue !== String(item.quantity)) {
      setMaskValue(String(item.quantity))
    }
  }, [item.quantity])

  return (
    <div className="flex items-center gap-2 justify-between">
      <div className="flex flex-row items-center gap-4">
        <Select
          value={[item.itemId, item.action].join(':')}
          onValueChange={(value) =>
            onChange({ ...item, itemId: value.split(':')[0], action: value.split(':')[1] })
          }
        >
          <SelectPrimitive.Trigger data-slot="select-trigger" asChild>
            <Button variant="outline" className="rounded-sm size-auto aspect-square">
              <img
                className="size-8 object-contain"
                style={{ imageRendering: 'pixelated' }}
                src={getItemIconUrl(jobItem.id)}
              />
            </Button>
          </SelectPrimitive.Trigger>
          <SelectContent className="min-w-64">
            {items
              .filter(
                (i) =>
                  i.job === jobItem.job && i.id !== jobItem.id && !exisitingItemIds.includes(i.id)
              )
              .map((i) => (
                <SelectPrimitive.Item
                  data-slot="select-item"
                  className="focus:bg-accent focus:text-accent-foreground relative flex flex-col w-full cursor-default gap-2 rounded-sm py-1.5 px-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  key={i.id + i.action}
                  value={[i.id, i.action].join(':')}
                >
                  <div className="flex-1 flex items-center justify-between gap-4">
                    <span className="uppercase text-xs text-muted-foreground">{i.action}</span>
                    <span className="uppercase text-xs text-muted-foreground">LVL. {i.from}</span>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <img
                      className="size-6 object-contain"
                      style={{ imageRendering: 'pixelated' }}
                      src={getItemIconUrl(i.id)}
                    />
                    {i.type}
                  </div>
                </SelectPrimitive.Item>
              ))}
          </SelectContent>
        </Select>
        <div className="flex flex-col gap-1">
          <span className="uppercase text-xs text-muted-foreground">{jobItem.action}</span>
          <span>{jobItem.type}</span>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2">
        <Input
          // @ts-ignore
          ref={ref}
          autoComplete="none"
          inputMode="numeric"
          className="w-32 font-bold"
          onBlur={() => {
            if (!maskValue) {
              setMaskValue(String(item.quantity))
            }
          }}
        />
        {onRemove && (
          <Button
            type="button"
            onClick={onRemove}
            size="icon"
            variant="outline"
            className="rounded-full"
          >
            <XIcon />
          </Button>
        )}
      </div>
    </div>
  )
}
