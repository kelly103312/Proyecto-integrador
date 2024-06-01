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
        /*bearRef.current.setTranslation({
            x: props.position[0] ,
            y: props.position[1] ,
            z: props.position[2] ,
          },true);*/
    }
  },[bearRef.current]);
 
  const onCollisionExit = (e) =>{
    //console.log(e.animations);
    console.log("avatar attack")
  }

  const onHandleAtack = (e)=>{
    console.log("attack")
  }
  return (
      <RigidBody name="BEAR" ref={bearRef} colliders="trimesh" onCollisionExit={(e)=>{onCollisionExit(e)}} position={props.position}>
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