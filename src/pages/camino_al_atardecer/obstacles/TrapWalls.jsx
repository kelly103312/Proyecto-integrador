import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody, useRapier } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";

export default function TrapWalls(props) {
  const trapWall1Ref = useRef();
  const trapWall2Ref = useRef();

  const { nodes, materials } = useGLTF(
    "/assets/camino_al_atardecer/models/trapWalls.glb"
  );
  const { world } = useRapier();

  return (
    <group {...props} dispose={null}>
      <group>
        <group>
          <RigidBody
            name="trapWall1Body"
            type="fixed"
            colliders="trimesh"
            ref={trapWall1Ref}
    
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.trapwall1.geometry}
              material={materials.trapWallMaterial}
              position={[0, 0, 50]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.trapwall1_1.geometry}
              material={materials["spikesMaterial.003"]}
              position={[0, 0, 50]}
            />
          </RigidBody>
        </group>

        <group>
          <RigidBody
            name="trapWall2Body"
            type="fixed"
            colliders="trimesh"
            ref={trapWall2Ref}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.trapWall2_1.geometry}
              material={materials["trapWallMaterial.001"]}
              position={[0, 0, 50]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.trapWall2_2.geometry}
              material={materials["spikesMaterial.003"]}
              position={[0, 0, 50]}
            />
          </RigidBody>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/assets/camino_al_atardecer/models/trapWalls.glb");