import { Environment, EnvironmentMap, Loader, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import World from "./world/World";
import { Color } from "three";
import {Lights} from "./lights/lights";
import {Environments} from "./staging/environments";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import "./styles.css";
import FloatingText from "./abstractions/FloatingText";
import Pane from "./layout/pane";

export const CaminoAlAtardecer = () => {
  return (
    <>
        {/* <Pane/> */}
        <Canvas
            shadows={true}
            camera={{
                position: [0, 4, 165],
                rotation: [0, 0, 0],
            }}
        >
                <OrbitControls target={[0,0,0]} enableZoom={true} enablePan={true} enableDamping dampingFactor={0.2} rotateSpeed={0.5} minAzimuthAngle={Math.PI / 2} screenSpacePanning={true}
                />
                <Suspense fallback={null}>
                    <Lights />
                    <Environments />
                    <World />
                    <FloatingText position={[0, 4 , 160]} />
                </Suspense>
        </Canvas>

        <Loader />
    </>
  )
}


