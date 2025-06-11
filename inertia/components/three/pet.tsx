import { OrbitControls, useAnimations, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useEffect } from 'react'
import * as THREE from 'three'

import { PetType } from '~/content/pets'
import { cn } from '~/lib/utils'

interface PetProps {
  model: PetType
  isLooping: boolean
  rotation?: [number, number, number]
}

const PetModel = ({ model, isLooping, rotation = [0, Math.PI / 0.8, 0] }: PetProps) => {
  const { scene, animations } = useGLTF(`/pet-model/${model}.gltf`)
  const { actions } = useAnimations(animations, scene)

  useEffect(() => {
    const runningAction = actions?.['walk'] || actions[0]

    if (runningAction) {
      runningAction.loop = THREE.LoopRepeat

      if (isLooping) {
        runningAction.reset().play()
      } else {
        runningAction.stop()
      }
    }

    return () => {
      runningAction?.stop()
    }
  }, [isLooping, actions])

  return <primitive object={scene} scale={3.0} rotation={rotation} position={[0, -1, 0]} />
}

interface PetViewerProps extends Omit<React.ComponentProps<typeof Canvas>, 'children'> {
  model: PetType
  isLooping: boolean
  enableControls?: boolean
  rotation?: PetProps['rotation']
}

export const PetViewer = React.forwardRef<HTMLCanvasElement, PetViewerProps>(
  ({ model, className, enableControls = true, rotation, isLooping, ...props }, ref) => (
    <Canvas ref={ref} className={cn('h-[200px]!', className)} {...props}>
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <PetModel model={model} isLooping={isLooping} rotation={rotation} />
      {enableControls && (
        <OrbitControls
          enableZoom={false}
          enableRotate={true}
          target={[0, 0.5, 0]}
          enablePan={false}
          rotateSpeed={0.3}
        />
      )}
    </Canvas>
  )
)
