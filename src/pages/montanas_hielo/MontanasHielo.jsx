import { Canvas } from '@react-three/fiber'
import React from 'react'
import Lights from './lights/lights'
import Environments from './environments/environments'
import { OrbitControls } from '@react-three/drei'
import World from './world/World'

export const MontanasHielo = () => {
  return (
    <Canvas
        shadows={true}
        camera={{ position: [0, 4, 90], fov: 50 }}
    >
            <Lights />
            <Environments />
            <OrbitControls makeDefault />
            <World />
        
    </Canvas>
  )
}
