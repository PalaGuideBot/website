import { OrbitControls, useAnimations, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useEffect } from 'react'
import * as THREE from 'three'

import { MountType, getMountAnimation } from '~/content/mounts'
import { cn } from '~/lib/utils'

const Mount = ({ model, isLooping }: { model: MountType; isLooping: boolean }) => {
  const { scene, animations } = useGLTF(`/mount-model/${model}.gltf`)
  const { actions } = useAnimations(animations, scene)

  useEffect(() => {
    const mountAnimation = getMountAnimation(model)
    const runningAction = actions?.[mountAnimation] || actions[0]

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

  return (
    <primitive object={scene} scale={1.2} rotation={[0, Math.PI / 0.8, 0]} position={[0, -1, 0]} />
  )
}

interface MountViewerProps extends Omit<React.ComponentProps<typeof Canvas>, 'children'> {
  model: MountType
  isLooping: boolean
}

export const MountViewer = React.forwardRef<HTMLCanvasElement, MountViewerProps>(
  ({ model, className, isLooping, ...props }, ref) => (
    <Canvas ref={ref} className={cn('!h-[200px]', className)} {...props}>
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Mount model={model} isLooping={isLooping} />
      <OrbitControls
        enableZoom={false}
        enableRotate={true}
        target={[0, 0.5, 0]}
        enablePan={false}
        rotateSpeed={0.3}
      />
    </Canvas>
  )
)
