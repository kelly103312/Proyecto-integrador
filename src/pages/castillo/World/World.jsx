import { useGLTF } from '@react-three/drei'
import { CylinderCollider, RigidBody } from '@react-three/rapier'
import React from 'react'

export const World = (props) => {
    const { nodes, materials } = useGLTF('/assets/castillo/world/World.glb')

    return (
      <group {...props} dispose={null}>
        <group>
          <RigidBody type='fixed' name="floor" colliders="trimesh">
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Floor.geometry}
                material={materials.floormaterial}
              />
          </RigidBody>

          <RigidBody type='fixed' colliders="trimesh" name="walls">
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Walls.geometry}
              material={materials.wallsMaterial}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Mesa.geometry}
              material={materials.mesamaterial}
            />
            {/* <mesh
              castShadow
              receiveShadow
              geometry={nodes.caballeros.geometry}
              material={materials['12943_Stone_Chess_Night_Side_A.001']}
            /> */}
          </RigidBody>
        </group>
      </group>
    )
}
useGLTF.preload('/assets/castillo/world/World.glb')