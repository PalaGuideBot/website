import { ConfettiButton, safeShapeFromText } from '~/components/magicui/confetti'

const ZeluckConfetti = () => {
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
        shapes: [
          safeShapeFromText({ text: '🎨', scalar: 4 }),
          safeShapeFromText({ text: '✏️', scalar: 4 }),
          safeShapeFromText({ text: '💻', scalar: 4 }),
        ],
        scalar: 5,
      }}
    >
      Zeluck
    </ConfettiButton>
  )
}

export { ZeluckConfetti }
