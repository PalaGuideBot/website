import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

const Mount = ({ model }: { model: string }) => {
  const { scene } = useGLTF(`/inertia/assets/mount-model/${model}.gltf`)

  return (
    <primitive object={scene} scale={1} rotation={[0, Math.PI / 0.8, 0]} position={[0, -1, 0]} />
  )
}

export const MountViewer = ({ model }: { model: string }) => {
  return (
    <div className="w-full h-full bg-[#1e1e22] rounded-lg">
      <Canvas className="w-full h-full rounded-lg">
        <Suspense fallback={null}>
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Mount model={model} /> {}
          <OrbitControls enableZoom={false} enableRotate={true} target={[0, 0.5, 0]} />
        </Suspense>
      </Canvas>
    </div>
  )
}
