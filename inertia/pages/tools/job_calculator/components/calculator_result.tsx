import { useForm } from '@inertiajs/react'
import type { Infer } from '@vinejs/vine/types'
import { ChevronRightIcon, SearchIcon, Trash2Icon } from 'lucide-react'
import { useMemo } from 'react'

import type {
  calculatorOptionsValidator,
  calculatorResultValidator,
} from '#tools/validators/calculator_validator'
import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible'
import { Input } from '~/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { formatNumber, formatPrice } from '~/lib/utils'
import { ExperienceMethod } from './experience_method'

interface CalculatorResultProps {
  options: Infer<typeof calculatorOptionsValidator>
  result: Infer<typeof calculatorResultValidator>
}

export function CalculatorResult({ options, result }: CalculatorResultProps) {
  const form = useForm({
    search: '',
    selectedBonus: 'without',
  })

  const items = useMemo(() => {
    if (!(form.data.selectedBonus in result.items)) {
      return []
    }

    if (form.data.search.length === 0) {
      return result.items[form.data.selectedBonus as keyof typeof result.items]
    }

    return [...result.items[form.data.selectedBonus as keyof typeof result.items]].filter(
      (item) => {
        return [item.item.type, item.item.action]
          .map((value) => value.toLowerCase())
          .some((value) => value.includes(form.data.search.toLowerCase()))
      }
    )
  }, [result.items, form.data.search, form.data.selectedBonus])

  return (
    <Card>
      <CardContent className="pt-4 text-sm space-y-1.5">
        <p>
          Pour atteindre le niveau{' '}
          <span className="font-bold text-primary">{options.targetLevel}</span> à partir du niveau{' '}
          <span className="font-bold text-primary">{options.currentLevel}</span> avec un bonus
          d'expérience de <span className="font-bold text-primary">{options.bonusXp}%</span>.
        </p>
        <p>
          La quantité d'expérience nécessaire est de{' '}
          <span className="font-bold text-primary">
            {formatNumber(result.xpTotal, { notation: 'standard' })}
          </span>
          .
        </p>
        <Collapsible className="group/collapsible">
          <CollapsibleTrigger asChild>
            <Button variant="tertiary" size="sm">
              Voir les récompenses
              <ChevronRightIcon className="size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <ul className="list-disc list-inside [&>li]:pl-4">
              {result.rewards.map((reward) => (
                <li key={reward.id}>
                  {reward.quantity && reward.id === 'money' && (
                    <span className="text-primary font-bold">{formatPrice(reward.quantity)}</span>
                  )}
                  {reward.quantity && reward.id !== 'money' && (
                    <>
                      <span className="font-bold text-primary">
                        {formatNumber(reward.quantity, { notation: 'standard' })}
                      </span>{' '}
                      <span>{reward.label}</span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
        <p>
          Ci-dessous vous retrouverez les différentes méthodes pour atteintre le niveau que vous
          avez choisi:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div className="relative col-span-1 sm:col-span-2">
            <SearchIcon className="absolute top-1/2 left-2 transform -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Recherche..."
              className="pl-[28px] bg-transparent w-full h-10"
              value={form.data.search}
              onChange={(event) => form.setData('search', event.target.value)}
            />
          </div>
          <div className="col-span-1">
            <div className="flex flex-row gap-2">
              <Select
                value={form.data.selectedBonus}
                onValueChange={(value) => form.setData('selectedBonus', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Bonus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="without">Sans bonus</SelectItem>
                    <SelectItem value="x2">Bonus x2</SelectItem>
                    <SelectItem value="x10">Bonus x10</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button
                className="disabled:hidden w-10 aspect-square"
                disabled={!form.isDirty}
                onClick={() => form.reset()}
                variant="outline"
                size="icon"
              >
                <Trash2Icon />
              </Button>
            </div>
          </div>
        </div>
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {items.length !== 0 &&
            items.map((item) => (
              <ExperienceMethod
                key={item.item.id + item.item.action}
                item={item}
                unlocked={options.currentLevel >= item.item.from}
              />
            ))}
          {items.length === 0 && (
            <p className="col-span-2 text-center text-muted-foreground">
              Aucun résultat trouvé pour la recherche{' '}
              <span className="font-bold">{form.data.search}</span>.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
