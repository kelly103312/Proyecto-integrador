import { Environment, EnvironmentMap, Loader, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import World from "./world/World";
import { Color } from "three";
import {Lights} from "./lights/lights";
import {Environments} from "./staging/environments";
import React, { Suspense } from "react";
import WelcomeText from "./abstractions/WelcomeText";
import { Canvas } from "@react-three/fiber";

export const CaminoAlAtardecer = () => {
  return (
    <>
        <Canvas>
                <PerspectiveCamera makeDefault position={[0, 4 , 165]} />
                <OrbitControls   />
                <Suspense fallback={null}>
                    <Lights />
                    <Environments />
                    <World />
                    <WelcomeText position={[0, 4 , 160]} />
                </Suspense>
        </Canvas>

        <Loader />
    </>
  )
}


