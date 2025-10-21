import { useEffect, useState } from 'react'

import { Eye } from '~/components/ui/eye'

type EyePosition = {
  top: number
  left: number
  rotation: number
  width: number
}

export function HalloweenEyes() {
  const [eyes, setEyes] = useState<EyePosition[]>([])

  useEffect(() => {
    const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min

    const count = Math.floor(randomBetween(3, 6))
    const generatedEyes = Array.from({ length: count }, () => ({
      top: randomBetween(15, 80),
      left: randomBetween(10, 90),
      rotation: randomBetween(-25, 25),
      width: randomBetween(35, 70),
    }))

    setEyes(generatedEyes)
  }, [])

  if (eyes.length === 0) return null

  return (
    <>
      {eyes.map((eye, index) => (
        <div
          key={`floating-eye-${index}`}
          aria-hidden
          className="pointer-events-none fixed z-50 hidden md:block"
          style={{
            top: `${eye.top}vh`,
            left: `${eye.left}vw`,
            transform: `translate(-50%, -50%) rotate(${eye.rotation}deg)`,
            filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.45))',
          }}
        >
          <Eye width={eye.width} />
        </div>
      ))}
    </>
  )
}
