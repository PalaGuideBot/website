import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import shibaImage from '~/assets/images/shiba.png'
import { Button } from '~/components/ui/button'

interface ShibaProps {
  id: number
  position: { x: number; y: number }
  direction: 'top' | 'right' | 'bottom' | 'left'
}

function Shiba({ id, position, direction }: ShibaProps) {
  const getRotation = () => {
    switch (direction) {
      case 'top':
        return 180
      case 'right':
        return -90
      case 'bottom':
        return 0
      case 'left':
        return 90
    }
  }

  const getAnimation = () => {
    switch (direction) {
      case 'top':
        return { y: ['-100%', '-20%'] }
      case 'right':
        return { x: ['100%', '20%'] }
      case 'bottom':
        return { y: ['100%', '20%'] }
      case 'left':
        return { x: ['-100%', '-20%'] }
    }
  }

  const getExitAnimation = () => {
    switch (direction) {
      case 'top':
        return { y: '-100%' }
      case 'right':
        return { x: '100%' }
      case 'bottom':
        return { y: '100%' }
      case 'left':
        return { x: '-100%' }
    }
  }

  return (
    <motion.img
      key={id}
      src={shibaImage}
      alt="Shiba"
      className="z-20 fixed size-24 object-contain pointer-events-none"
      style={{
        rotate: getRotation(),
        top: position.y,
        left: position.x,
      }}
      animate={{
        ...getAnimation(),
      }}
      exit={{ ...getExitAnimation() }}
      transition={{ duration: 0.5 }}
    />
  )
}

export function ShibaInfestation() {
  const [shiba, setShiba] = useState<ShibaProps | null>(null)
  const timerRef = useRef<number | null>(null)

  const createShiba = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current)
    }

    const directions = ['top', 'right', 'bottom', 'left'] as const
    const direction = directions[Math.floor(Math.random() * 4)]

    let x: number
    let y: number

    switch (direction) {
      case 'top':
        x = Math.random() * (window.innerWidth - 100)
        y = 0
        break
      case 'right':
        x = window.innerWidth - 100
        y = Math.random() * (window.innerHeight - 100)
        break
      case 'bottom':
        x = Math.random() * (window.innerWidth - 100)
        y = window.innerHeight - 100
        break
      case 'left':
        x = 0
        y = Math.random() * (window.innerHeight - 100)
        break
    }

    setShiba({ id: Date.now(), position: { x, y }, direction })

    // @ts-ignore
    timerRef.current = setTimeout(() => {
      setShiba(null)
      timerRef.current = null
    }, 2000)
  }, [])

  return (
    <>
      <Button
        variant="link"
        size="sm"
        className="h-auto p-0 text-xs text-primary hover:no-underline cursor-default"
        onClick={createShiba}
      >
        Tonykun
      </Button>
      {typeof window !== 'undefined' &&
        createPortal(
          <AnimatePresence>{shiba && <Shiba {...shiba} />}</AnimatePresence>,
          document.body
        )}
    </>
  )
}
