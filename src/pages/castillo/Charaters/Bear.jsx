import React, { useEffect, useRef, useState } from 'react'
import { Html, useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import { useLifesEnemy } from '../../../context/ManagementLifesEnemy'


export const Bear = (props) => {
  const { nodes, materials } = useGLTF('/assets/castillo/avatars/bear.glb')
  const bearRef = useRef();
  const { lifesEnemy, setLifesEnemy } = useLifesEnemy();

  useFrame((state,delta) => {
    const elapsedTime = state.clock.getElapsedTime();
    if(bearRef.current){
      if(lifesEnemy > 0){
        bearRef.current.setTranslation({
          x: props.position[0] + Math.cos(elapsedTime) * 2,
          y: props.position[1] ,
          z: props.position[2] ,
        },true);
      }
        /*bearRef.current.setTranslation({
            x: props.position[0] ,
            y: props.position[1] ,
            z: props.position[2] ,
          },true);*/
    }
  },[bearRef.current]);

  useEffect(()=>{
    console.log(lifesEnemy)
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
        
    </>
  )
}

useGLTF.preload('/assets/castillo/avatars/bear.glb')