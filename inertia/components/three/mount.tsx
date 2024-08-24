import { OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'

import { MountType } from '~/content/mounts'
import { cn } from '~/lib/utils'

const Mount = ({ model }: { model: MountType }) => {
  const { scene } = useGLTF(`/mount-model/${model}.gltf`)

  return (
    <primitive object={scene} scale={1.2} rotation={[0, Math.PI / 0.8, 0]} position={[0, -1, 0]} />
  )
}

interface MountViewerProps extends Omit<React.ComponentProps<typeof Canvas>, 'children'> {
  model: MountType
}

export const MountViewer = React.forwardRef<HTMLCanvasElement, MountViewerProps>(
  ({ model, className, ...props }, ref) => {
    return (
      <Canvas ref={ref} className={cn('!h-[200px]', className)} {...props}>
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Mount model={model} />
        <OrbitControls enableZoom={false} enableRotate={true} target={[0, 0.5, 0]} />
      </Canvas>
    )
  }
)
