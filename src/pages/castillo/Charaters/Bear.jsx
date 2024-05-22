import React, { useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'


export const Bear = (props) => {
  const { nodes, materials } = useGLTF('/assets/castillo/avatars/bear.glb')
  const bearRef = useRef();

  useFrame((state,delta) => {
    const elapsedTime = state.clock.getElapsedTime();
    if(bearRef.current){
        bearRef.current.setTranslation({
            x: props.position[0] + Math.cos(elapsedTime) * 2,
            y: props.position[1] ,
            z: props.position[2] ,
          },true);
    }
  },[bearRef.current]);


  const onHandleAtack = (e)=>{
    console.log("attack")
    console.log(e)
  }
  return (
      <RigidBody ref={bearRef} colliders="trimesh" position={props.position}>
          <group  dispose={null}>
              <group>
                  <mesh
                      onClick={onHandleAtack}
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