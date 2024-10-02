import { Button } from '@lemonsqueezy/wedges'
import { MinusIcon, PlusIcon } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { useIMask } from 'react-imask'
import { useMediaQuery } from 'usehooks-ts'

import type { ClickerBuilding } from '#tools/types'
import Input from '~/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { CLICKER_OPTIONS, getBuildingPrice, getClickerBuildingImage } from '~/lib/clicker'
import { cn, formatNumber } from '~/lib/utils'
import { usePlayerClickerStore } from '../stores/player_clicker_store'
import { useClickerSettings } from './clicker_settings'
import { CoinWrapper } from './coin_wrapper'

interface BuildingQuantityControlsProps {
  building: ClickerBuilding
  onIncreaseQuantity?: () => void
  onDecreaseQuantity?: () => void
  onQuantityChange?: (quantity: number) => void
}

const BuildingQuantityControls = ({
  building,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onQuantityChange,
}: BuildingQuantityControlsProps) => {
  const {
    ref,
    setValue: setMaskValue,
    value: maskValue,
  } = useIMask(
    {
      mask: Number,
      min: CLICKER_OPTIONS.MIN_BUILDING_QUANTITY,
      max: CLICKER_OPTIONS.MAX_BUILDING_QUANTITY,
    },
    {
      defaultValue: String(building.quantity),
      onAccept: (value) => {
        if (
          Number(value) >= CLICKER_OPTIONS.MIN_BUILDING_QUANTITY &&
          Number(value) <= CLICKER_OPTIONS.MAX_BUILDING_QUANTITY
        ) {
          onQuantityChange?.(Number(value))
        }
      },
    }
  )

  useEffect(() => {
    if (maskValue !== String(building.quantity)) {
      setMaskValue(String(building.quantity))
    }
  }, [building.quantity])

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        shape="pill"
        isIconOnly
        onClick={onDecreaseQuantity}
        disabled={Number(maskValue) <= CLICKER_OPTIONS.MIN_BUILDING_QUANTITY}
      >
        <MinusIcon className="size-4" />
      </Button>
      <Input
        // @ts-ignore
        ref={ref}
        autoFocus
        autoComplete="none"
        inputMode="numeric"
        className={cn('px-1 max-w-12 text-xl text-center font-bold')}
        onBlur={() => {
          if (!maskValue) {
            setMaskValue(String(building.quantity))
          }
        }}
      />
      <Button
        variant="outline"
        shape="pill"
        isIconOnly
        onClick={onIncreaseQuantity}
        disabled={Number(maskValue) >= CLICKER_OPTIONS.MAX_BUILDING_QUANTITY}
      >
        <PlusIcon className="size-4" />
      </Button>
    </div>
  )
}

interface BuildingCardProps {
  building: ClickerBuilding
  onIncreaseQuantity: BuildingQuantityControlsProps['onIncreaseQuantity']
  onDecreaseQuantity: BuildingQuantityControlsProps['onDecreaseQuantity']
  onQuantityChange: BuildingQuantityControlsProps['onQuantityChange']
}

const BuildingCard = ({
  building,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onQuantityChange,
}: BuildingCardProps) => {
  const isLg = useMediaQuery('(max-width: 1024px)')
  const { calculator } = useClickerSettings()
  const playerClickerStore = usePlayerClickerStore()

  const production = useMemo(
    () =>
      playerClickerStore.data
        ? formatNumber(
            calculator.calculateBuildingProduction(building.name, playerClickerStore.data) *
              building.quantity,
            {
              notation: 'standard',
              maximumFractionDigits: 2,
            }
          )
        : 'Inconnu',
    [playerClickerStore.data]
  )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="rounded-md border bg-surface shadow outline-2 outline-primary hover:outline hover:border-primary data-[state=open]:outline data-[state=open]:border-primary">
          <div className="p-2 flex flex-row items-center gap-2">
            <img
              className="w-10 h-auto object-cover"
              src={getClickerBuildingImage(building.name)}
            />
            <div className="flex flex-col flex-grow space-y-1">
              <p className="text-sm lg:text-xs xl:text-sm text-left">{building.label}</p>
              <CoinWrapper>
                {formatNumber(getBuildingPrice(building.base_price, building.quantity), {
                  notation: 'standard',
                  maximumFractionDigits: 0,
                })}
              </CoinWrapper>
            </div>
            <p className="font-mc-dungueons text-2xl drop-shadow-[0px_2px_0px_hsl(var(--wg-primary))]">
              {String(building.quantity).padStart(2, '0')}
            </p>
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent
        side={isLg ? 'bottom' : 'left'}
        align={isLg ? 'end' : 'start'}
        className="bg-background p-0 text-sm min-w-72"
      >
        <div className="border-b p-2">
          <p className="font-bold">{building.label}</p>
        </div>
        <div className="p-4 space-y-1.5">
          <p>
            Production (RPS): <span className="font-bold text-primary">{production}</span>
          </p>
          <div className="flex flex-row items-baseline gap-1">
            <p>Prochain prix: </p>
            <CoinWrapper>
              {formatNumber(getBuildingPrice(building.base_price, building.quantity + 1), {
                notation: 'standard',
                maximumFractionDigits: 0,
              })}
            </CoinWrapper>
          </div>
          <BuildingQuantityControls
            building={building}
            onIncreaseQuantity={onIncreaseQuantity}
            onDecreaseQuantity={onDecreaseQuantity}
            onQuantityChange={onQuantityChange}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { BuildingCard }
