import { BakeShadows, KeyboardControls, Loader } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { Suspense, useEffect } from 'react'
import { World } from './World/World'
import { Physics } from '@react-three/rapier'
import { Ligths } from './Lights/Ligths'
import { EnviromentSky } from './Enviroment/EnviromentSky'
import { WelcomeText } from './World/WelcomeText'
import { Sphere } from './Figures/Sphere'
import { AvatarPrincipal } from './Charaters/AvatarPrincipal'
import { Controls } from './Controls/Controls'
import { Bear } from './Charaters/Bear'
import { Box } from './Figures/Box'
import { Pane } from '../castillo/layout/Pane'
import { Coins } from './Figures/Coins'
import { Laberinto } from './Figures/Laberinto'
import useMovements from '../../utils/key-movements'
import { Charaters } from './Charaters/Charaters'
import { socket } from '../../socket/socket-manager'

export const Castillo = () => {
  const map = useMovements();
  console.log(map);

  useEffect(()=>{
    socket.emit("player-connected")
  },[])
  return (
    <KeyboardControls map={map}>
      <Pane />
      <Canvas
        shadows={true}
        camera={{
          position: [0, 1.5, -0.5],
          rotation: [0, 0, 0],
        }}
      >
        
        <Suspense fallback={null}>
          <Ligths />
          <EnviromentSky />
          <BakeShadows />
          <Physics debug={false}>
            <World />            
            <Charaters />

            <Sphere position={[0,1,-35]} velocity={3} />
            <Sphere position={[0,1,-40]} velocity={4} />
            <Sphere position={[0,1,-40]} velocity={5} />
            <Sphere position={[0,1,-45]} velocity={6} />
            <Sphere position={[0,1,-50]} velocity={7} />
            
            <Box position={[0,2,-5]} />
            
            <Laberinto position={[-4.6, 2, -15]} />
            <Coins position={[0, 2, -32]}/>
            <Coins position={[0, 2, -38]} />
            <Coins position={[0, 2, -42]}/>
            <Coins position={[0, 2, -47]}/>
            <Coins position={[0, 2, -55]}/>
          </Physics>
          <WelcomeText position={[0, 4, -96]} />
        </Suspense>
        <Controls />
      </Canvas>
      <Loader />
    </KeyboardControls>
  )
}
