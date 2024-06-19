import { Environment, Loader, OrbitControls } from "@react-three/drei";
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


export const CaminoAlAtardecer = () => {

  const cameraBodyCollider = useRef();
  
  // useFrame(({camera}, delta)=>{
  //   const position = vec3(camera.position);
  //   cameraBodyCollider.current?.setTranslation(position, true);
  //   console.log(cameraBodyCollider?.current?.translation());
  // })

  return (
    <>
      <Canvas
        shadows={true}
        camera={{
          position: [0, 4, 150],
          rotation: [0, 0, -180],
        }}
      >
        <OrbitControls
          target={[0, 6, 80]}
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
          <FloatingText position={[0, 4, 160]} />

          <Physics debug={true} gravity={[0, -10, 0]}>
            <World />
            <Villains />
            <RigidBody ref={cameraBodyCollider} position={[0,2,60]}>
              <BallCollider args={[5]}  />
            </RigidBody>
          </Physics>
        </Suspense>
      </Canvas>

      <Loader />
      <CharacterHubCamino />

    </>
  );
}
