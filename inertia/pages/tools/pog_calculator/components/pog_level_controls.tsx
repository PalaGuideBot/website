import { MinusIcon, PlusIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useIMask } from 'react-imask'
import { useIsClient } from 'usehooks-ts'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { PALADIUM_OPTIONS } from '~/lib/paladium'

interface PogLevelControlsProps {
  level: number
  onIncreaseLevel?: () => void
  onDecreaseLevel?: () => void
  onLevelChange?: (level: number) => void
}

export function PogLevelControls({
  level,
  onIncreaseLevel,
  onDecreaseLevel,
  onLevelChange,
}: PogLevelControlsProps) {
  const isClient = useIsClient()

  const {
    ref,
    setValue: setMaskValue,
    value: maskValue,
  } = useIMask(
    {
      mask: Number,
      min: PALADIUM_OPTIONS.MIN_POG_LEVEL,
      max: PALADIUM_OPTIONS.MAX_POG_LEVEL,
    },
    {
      defaultValue: String(level),
      onAccept: (value) => {
        if (
          Number(value) >= PALADIUM_OPTIONS.MIN_POG_LEVEL &&
          Number(value) <= PALADIUM_OPTIONS.MAX_POG_LEVEL
        ) {
          onLevelChange?.(Number(value))
        }
      },
    }
  )

  useEffect(() => {
    if (maskValue !== String(level)) {
      setMaskValue(String(level))
    }
  }, [level])

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="rounded-full"
        onClick={onDecreaseLevel}
        disabled={Boolean(Number(isClient ? maskValue : level) <= PALADIUM_OPTIONS.MIN_POG_LEVEL)}
      >
        <MinusIcon />
      </Button>
      <Input
        // @ts-ignore
        ref={ref}
        autoComplete="none"
        inputMode="numeric"
        className="bg-transparent px-1 max-w-12 text-center font-bold"
        onBlur={() => {
          if (!maskValue) {
            setMaskValue(String(level))
          }
        }}
      />
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="rounded-full"
        onClick={onIncreaseLevel}
        disabled={Boolean(Number(isClient ? maskValue : level) >= PALADIUM_OPTIONS.MAX_POG_LEVEL)}
      >
        <PlusIcon />
      </Button>
    </div>
  )
}
