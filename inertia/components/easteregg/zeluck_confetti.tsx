import confetti from 'canvas-confetti'

import { Button } from '~/components/ui/button'

export function ZeluckConfetti() {
  const CanonConfetti = () => {
    const end = Date.now() + 3 * 1000 // 3 seconds
    const colors = ['#ffb700', '#2dca72', '#6c6c89', '#f53d6b']

    const frame = () => {
      if (Date.now() > end) return

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      })
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      })

      requestAnimationFrame(frame)
    }

    frame()
  }

  return (
    <Button
      variant="link"
      size="sm"
      className="h-auto p-0 text-xs text-primary hover:no-underline cursor-default"
      onClick={CanonConfetti}
    >
      Zeluck
    </Button>
  )
}
