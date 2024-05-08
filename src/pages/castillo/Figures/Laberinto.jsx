import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import React from 'react'

export const Laberinto = (props) => {
    const { nodes, materials } = useGLTF('/assets/castillo/world/laberinto.glb')
  return (
    <RigidBody position={props.position} type='fixed' colliders="trimesh">
        <group dispose={null}>
           <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube001.geometry}
                material={nodes.Cube001.material}
            />
        </group>

    </RigidBody>
  )
}
useGLTF.preload('/assets/castillo/world/laberinto.glb')