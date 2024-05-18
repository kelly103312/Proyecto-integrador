import React, { useRef } from 'react';
import { Perf } from "r3f-perf";
import { KeyboardControls, BakeShadows,Loader } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";
import Lights from "./lights/Lights";
import Environments from "./staging/Environments";
import { Canvas } from "@react-three/fiber";
import World from "./world/World";
import Controls from "./controls/Controls";
import {Charaters} from "./characters/Charaters";

import { Pane } from '../level1/layout/Pane'
import { Coins } from '../level1/Figures/Coins'
import useMovements from "../../utils/key-movements";
import Ecctrl from "ecctrl";
import Zombie1 from "./characters/zombies/Zombie1"
import Zombie2 from "./characters/zombies/Zombie2"
import Zombie3 from "./characters/zombies/Zombie3"

export default function Level1() {
   
    const map = useMovements();

    return (
        <KeyboardControls map={map} >
            <Pane />
            <Canvas
                shadows={true}
                
                camera={{
                position: [0, 1.5, -0.5],
                rotation: [0, 0, 0],
        }}
            >
                <Perf position="top-right" />
                <Suspense fallback={null}>
                    <Lights />
                    <BakeShadows />
                    <Environments />
                    <Physics debug={false}>
                        <World />
                       
                        
                        <Charaters/>

                       <Coins position={[0, 2, -32]}/>
                       <Coins position={[0, 2, -38]} />
                       <Coins position={[0, 2, -42]}/>
                       <Coins position={[0, 2, -47]}/>
                       <Coins position={[0, 2, -55]}/>

                    </Physics>
                    
                </Suspense>
                <Controls />
            </Canvas>
            <Loader />
        </KeyboardControls>
    )
}