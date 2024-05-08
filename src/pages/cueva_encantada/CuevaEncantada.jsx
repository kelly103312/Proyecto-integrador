import { Physics } from '@react-three/rapier'
import WelcomeText from "./world/WelcomText";
import {
    Environment,
    FlyControls,
    Loader,
    OrbitControls,
  } from "@react-three/drei";
import World from "./world/World";
import Lights from "./lights/Lights";
import Environments from "./environments/Environments";
import { Perf } from "r3f-perf";
import React from 'react'
import { Canvas } from '@react-three/fiber';

export const CuevaEncantada = () => {
  return (
    <>
        <Canvas
            camera={{
            position: [0, 1, 2],
            }}
        >
            <ambientLight />
            <FlyControls />
            <OrbitControls enableZoom={false} enablePan={false} />

            <Perf position={"top-left"} />
            <directionalLight position={[10, 1.5, -95]} />
            <OrbitControls makeDefault />
            <Lights />
            <WelcomeText position={[0, 1.5, -92]} />
            <Environments />
            <Physics debug={true}>
                <World />
            </Physics>

        </Canvas>
        <Loader />
    </>
  )
}
