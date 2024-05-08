import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import React from 'react'

export const Rampla = (props) => {
    const { nodes, materials } = useGLTF('/assets/castillo/world/rampla.glb')
  return (
    <RigidBody type='fixed' colliders="hull">
        <group {...props} dispose={null}>
        <group name="Scene">
            <mesh
            name="Cube"
            geometry={nodes.Cube.geometry}
            material={materials.Material}
            userData={{ name: 'Cube' }}
            />
        </group>
        </group>

    </RigidBody>
  )
}
useGLTF.preload('/assets/castillo/world/rampla.glb')