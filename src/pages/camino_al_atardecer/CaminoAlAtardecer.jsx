import { Environment, KeyboardControls, Loader, OrbitControls } from "@react-three/drei";
import World from "./world/World";
import {Lights} from "./lights/lights";
import {Environments} from "./staging/environments";
import { Suspense, useRef } from "react";
import react from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import "./styles.css";
import FloatingText from "./abstractions/FloatingText";
import Pane from "./layout/pane";
import Villains from "./characters/villains/Villains";
import { BallCollider, Physics, RigidBody } from "@react-three/rapier";
import TrapWalls from "./obstacles/TrapWalls";
import CharacterHubCamino from './hub/CharacterHub';
import Controls from "./controls/Controls";
import Avatar from "./characters/avatar/Avatar";
import useMovements from "../../utils/key-movements";


export function CaminoAlAtardecer () {

  const map = useMovements();
  const cameraBodyCollider = useRef();
  
  // useFrame(({camera}, delta)=>{
  //   const position = vec3(camera.position);
  //   cameraBodyCollider.current?.setTranslation(position, true);
  //   console.log(cameraBodyCollider?.current?.translation());
  // })

  return (
      <KeyboardControls map={map} > 
      <Canvas
        shadows={true}
        camera={{
          position: [0, 4, 150],
          rotation: [0, 180, 0]
        }}
      >
      
        <Suspense fallback={null}>
          <Lights />
          <Environments />
          <FloatingText position={[0, 4, 160]} />

          <Physics debug={true}>
            <World />
            <Villains />
            <Avatar />
          </Physics>

        </Suspense>
        <Controls />
      </Canvas>

      <Loader />
      <CharacterHubCamino />
      </KeyboardControls>
 
  );
}