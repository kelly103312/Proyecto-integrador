import React, { useEffect, useRef, useState } from 'react'
import { Html, useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'


export const Bear = (props) => {
  const { nodes, materials } = useGLTF('/assets/castillo/avatars/bear.glb')
  const bearRef = useRef();

  useFrame((state,delta) => {
    const elapsedTime = state.clock.getElapsedTime();
    if(bearRef.current){
      if(props.lifes == 0){
        console.log("stop moving ")
      }
        /*bearRef.current.setTranslation({
            x: props.position[0] ,
            y: props.position[1] ,
            z: props.position[2] ,
          },true);*/
    }
  },[bearRef.current]);

  useEffect(()=>{
    console.log(props.lifes)
  },[])
 
  return (
    <>
        <RigidBody name="BEAR" ref={bearRef} colliders="trimesh" position={props.position}>
            <group  dispose={null}>
                <group>
                    <mesh
                        geometry={nodes.bear.geometry}
                        material={materials['Material.002']}
                        userData={{ name: 'bear' }}
                    />
                </group>
            </group>
        </RigidBody>
        <Html>
            <div style={{ position: 'relative', top: 80, center: 10, backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 10, borderRadius: 5, color: 'white' }}>
                vidas del enemigo: {props.lifes}
            </div>
        </Html>
    </>
  )
}

useGLTF.preload('/assets/castillo/avatars/bear.glb')