import { BakeShadows, KeyboardControls, Loader } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { Suspense } from 'react'
import { World } from './World/World'
import { Physics } from '@react-three/rapier'
import { Ligths } from './Lights/Ligths'
import { EnviromentSky } from './Enviroment/EnviromentSky'
import { WelcomeText } from './World/WelcomeText'
import { Sphere } from './Figures/Sphere'
import { AvatarPrincipal } from './Charaters/AvatarPrincipal'
import { Controls } from './Controls/Controls'
import useMovements from '../../utils/key-movements'

export const Castillo = () => {
  const map = useMovements();

  return (
    <KeyboardControls map={map}>
      <Canvas
        shadows={true}
        camera={{
          position: [0, 1.5, -0.5],
          rotation: [0, 0, 0],
        }}
      >
        
        <Suspense fallback={null}>
          <Ligths />
          <BakeShadows />
          <EnviromentSky />
          <Physics>
            <World />            
            <AvatarPrincipal />
          </Physics>
          <WelcomeText position={[0, 4, -96]} />
        </Suspense>
        <Controls />
      </Canvas>
      <Loader />
    </KeyboardControls>
  )
}
