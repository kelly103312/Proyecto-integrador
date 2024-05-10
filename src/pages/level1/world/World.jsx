import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody, CuboidCollider, CylinderCollider } from '@react-three/rapier'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/assets/level1/models/world/game.glb')

  return (
    <group {...props} dispose={null}>
      <group>
        <RigidBody type="fixed" colliders="trimesh">
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Floor.geometry}
            material={materials['floorMaterial.001']}
          />
        </RigidBody>
        <RigidBody type="fixed" colliders="trimesh">
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Walls.geometry}
            material={materials['wallMaterial.001']}
          />
        </RigidBody>
      </group>
    </group>
  );
}
useGLTF.preload("/assets/level1/models/world/game.glb");