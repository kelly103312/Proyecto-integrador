import React, { useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'


export const Bear = (props) => {
  const { nodes, materials } = useGLTF('/assets/castillo/avatars/bear.glb')
  const ref = useRef();

  // Lógica de persecución
  useFrame(() => {
      /*if (props.pursue) {
          const distance = ref.current.position.distanceTo(props.onAttack.position.current.position);
          if (distance < 2) { // Cambia este valor según la distancia deseada para el ataque
              console.log("ATAQUE")
          }
      }*/
  });

  return (
      <RigidBody colliders="trimesh" >
          <group ref={ref} {...props} dispose={null}>
              <group>
                  <mesh
                      geometry={nodes.bear.geometry}
                      material={materials['Material.002']}
                      userData={{ name: 'bear' }}
                  />
              </group>
          </group>
      </RigidBody>
  )
}

useGLTF.preload('/assets/castillo/avatars/bear.glb')