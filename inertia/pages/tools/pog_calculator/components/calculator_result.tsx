import { useForm } from '@inertiajs/react'
import type { Infer } from '@vinejs/vine/types'
import { SearchIcon, Trash2Icon } from 'lucide-react'
import { useMemo } from 'react'

import type {
  calculatorOptionsValidator,
  calculatorResultValidator,
} from '#tools/validators/pog_validator'
import { Alert, AlertDescription } from '~/components/ui/alert'
import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { getMinecraftItemUrl } from '~/lib/minecraft'
import { formatNumber } from '~/lib/utils'
import { ExperienceMethod } from './experience_method'

interface CalculatorResultProps {
  options: Infer<typeof calculatorOptionsValidator>
  result: Infer<typeof calculatorResultValidator>
}

export function CalculatorResult({ options, result }: CalculatorResultProps) {
  const form = useForm({
    search: '',
    selectedMethod: 'default',
  })

  const items = useMemo(() => {
    if (form.data.search.length === 0) {
      return result.items
    }

    return [...result.items].filter((item) => {
      return [item.name, item.id]
        .map((value) => value.toLowerCase())
        .some((value) => value.includes(form.data.search.toLowerCase()))
    })
  }, [result.items, form.data.search])

  return (
    <Card>
      <CardContent className="pt-4 text-sm space-y-1.5">
        <p>
          Pour one-shot le bloc de{' '}
          <img
            style={{ imageRendering: 'pixelated' }}
            className="w-auto h-6 object-contain inline-block pr-1"
            src={getMinecraftItemUrl(result.item.id)}
          />
          <span className="font-bold text-primary">{result.item.name}</span> à partir du niveau{' '}
          <span className="font-bold text-primary">{options.currentLevel}</span>{' '}
          {[
            options.currentXp,
            options.experiencedPickaxePercentage,
            options.goodPickaxePercentage,
          ].some((value) => value > 0)
            ? 'et les paramètres suivants :'
            : '.'}
        </p>
        {[
          options.currentXp,
          options.experiencedPickaxePercentage,
          options.goodPickaxePercentage,
        ].some((value) => value > 0) && (
          <ul className="list-inside list-disc [&>li]:pl-2">
            {options.currentXp > 0 && (
              <li>
                L'XP actuelle à{' '}
                <span className="font-bold text-primary">
                  {formatNumber(options.currentXp, { notation: 'standard' })}
                </span>
              </li>
            )}
            {options.goodPickaxePercentage > 0 && (
              <li>
                La compétence "Bonne pioche" à{' '}
                <span className="font-bold text-primary">
                  {formatNumber(options.goodPickaxePercentage, { notation: 'standard' })}
                </span>
                %
              </li>
            )}
            {options.experiencedPickaxePercentage > 0 && (
              <li>
                La compétence "Pioche expériementée" à{' '}
                <span className="font-bold text-primary">
                  {formatNumber(options.experiencedPickaxePercentage, { notation: 'standard' })}
                </span>
                %
              </li>
            )}
          </ul>
        )}
        <p>
          La quantité d'expérience nécessaire est de{' '}
          <span className="font-bold text-primary">
            {formatNumber(result.item.os[form.data.selectedMethod as 'default'].xp, {
              notation: 'standard',
            })}
          </span>
          .
        </p>
        {options.currentLevel >= result.item.os[form.data.selectedMethod as 'default'].from && (
          <Alert variant="success">
            <AlertDescription>Vous pouvez déjà one-shot ce bloc.</AlertDescription>
          </Alert>
        )}
        <h3 className="text-center text-2xl uppercase font-bold py-4">Aperçu</h3>
        <div className="flex flex-row items-center justify-evenly gap-2 pb-2">
          <div className="flex flex-col items-center gap-2">
            <img
              className="w-24 aspect-square object-cover"
              style={{ imageRendering: 'pixelated' }}
              src={getPogTierUrl(result.currentTier)}
            />
            <div className="uppercase font-bold">Actuellement</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <img
              className="w-24 aspect-square object-cover"
              style={{ imageRendering: 'pixelated' }}
              src={getPogTierUrl(result.item.os[form.data.selectedMethod as 'default'].targetTier)}
            />
            <div className="uppercase font-bold">Cible</div>
          </div>
        </div>
        <p>
          Ci-dessous vous retrouverez les différents blocs à casser pour atteintre le niveau que
          vous avez choisi:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          <div className="relative col-span-1 sm:col-span-2">
            <SearchIcon className="absolute top-1/2 left-2 transform -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Recherche..."
              className="pl-[28px] bg-transparent w-full h-10"
              value={form.data.search}
              onChange={(event) => form.setData('search', event.target.value)}
            />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <div className="flex flex-row gap-2">
              <Select
                value={form.data.selectedMethod}
                onValueChange={(value) => form.setData('selectedMethod', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Méthode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="default">Par défaut</SelectItem>
                    <SelectItem value="with_mixed">Avec pantalon en endium mixé</SelectItem>
                    <SelectItem value="with_green">Avec pantalon en paladium vert</SelectItem>
                    <SelectItem value="with_pet_skill">Avec le pet</SelectItem>
                    <SelectItem value="with_pet_skill_and_mixed">Endium mixé + Pet</SelectItem>
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
                key={item.id}
                item={item}
                os={form.data.selectedMethod as 'default'}
                target={item.id === result.item.id}
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

function getPogTierUrl(tier: number) {
  return `https://image.palaguidebot.fr/pog/${tier}.webp`
}
