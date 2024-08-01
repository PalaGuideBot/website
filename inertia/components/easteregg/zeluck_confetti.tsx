import confetti from 'canvas-confetti'
import { ConfettiButton } from '~/components/magicui/confetti'

const ZeluckConfetti = () => {
  const scalar = 4
  const paintbrush = safeShapeFromText({ text: '🖌️', scalar })

  return (
    <ConfettiButton
      variant="link"
      size="sm"
      className="text-xs text-primary no-underline cursor-default [&>span]:p-0"
      options={{
        particleCount: 5,
        spread: 100,
        ticks: 120,
        gravity: 0,
        decay: 0.96,
        angle: 120,
        shapes: [paintbrush],
        scalar,
      }}
    >
      Zeluck
    </ConfettiButton>
  )
}

function safeShapeFromText(
  options: Parameters<typeof confetti.shapeFromText>[0]
): ReturnType<typeof confetti.shapeFromText> {
  //@ts-ignore - not available server-side
  if (typeof document === 'undefined') return
  return confetti.shapeFromText(options)
}

export { ZeluckConfetti }
