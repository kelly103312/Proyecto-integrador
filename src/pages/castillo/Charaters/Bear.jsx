import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export const Bear = (props) => {
    const { nodes, materials } = useGLTF('/assets/castillo/avatars/bear.glb')
 
  return (
    <group {...props} dispose={null}>
      <group>
        <mesh
          geometry={nodes.bear.geometry}
          material={materials['Material.002']}
          userData={{ name: 'bear' }}
        />
      </group>
    </group>
  )
}


useGLTF.preload('/assets/castillo/avatars/bear.glb')