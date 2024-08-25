import { OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'

import { PetType } from '~/content/pets'
import { cn } from '~/lib/utils'

const PetModel = ({ model }: { model: PetType }) => {
  const { scene } = useGLTF(`/pet-model/${model}.gltf`)

  return (
    <primitive object={scene} scale={3.0} rotation={[0, Math.PI / 0.8, 0]} position={[0, -1, 0]} />
  )
}

interface PetViewerProps extends Omit<React.ComponentProps<typeof Canvas>, 'children'> {
  model: PetType
}

export const PetViewer = React.forwardRef<HTMLCanvasElement, PetViewerProps>(
  ({ model, className, ...props }, ref) => {
    return (
      <Canvas ref={ref} className={cn('!h-[200px]', className)} {...props}>
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <PetModel model={model} />
        <OrbitControls enableZoom={false} enableRotate={true} target={[0, 0.5, 0]} />
      </Canvas>
    )
  }
)
