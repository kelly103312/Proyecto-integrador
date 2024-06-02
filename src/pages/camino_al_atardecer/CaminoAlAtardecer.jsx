import { Environment, Loader, OrbitControls } from "@react-three/drei";
import World from "./world/World";
import {Lights} from "./lights/lights";
import {Environments} from "./staging/environments";
import { Suspense } from "react";
import react from "react";
import { Canvas } from "@react-three/fiber";
import "./styles.css";
import FloatingText from "./abstractions/FloatingText";
import Pane from "./layout/pane";
import Villains from "./characters/villains/Villains";

export const CaminoAlAtardecer = () => {
  return (
    <>
        {/* <Pane/> */}
        
        <Canvas
            shadows={true}
            camera={{
                position: [0, 4, 100],
                rotation: [0, 0, -180]
            }}
        >
                <OrbitControls 
                  target={[0,6,80]} 
                  enableZoom={true} 
                  enablePan={true} 
                  enableDamping 
                  dampingFactor={0.2} 
                  rotateSpeed={0.5} 
                  minAzimuthAngle={Math.PI / 2} 
                  screenSpacePanning={true}
                />
                <Suspense fallback={null}>
                    <Lights />
                    <Environments />
                    <World />
                    <FloatingText position={[0, 4 , 160]} />
                    <Villains />
                </Suspense>
        </Canvas>

        <Loader />
    </>
  )
}


