import { RigidBody } from '@react-three/rapier'
import React, { useEffect, useRef } from 'react'
import { useFrame } from "@react-three/fiber"
import { useLifes } from '../../../context/ManagementLifes'

export const Cone = (props) => {

  const coneBody = useRef()
  const cone = useRef()
  const { restarLifes } = useLifes();

  

  useFrame((state,delta)=>{
    const elapsedTime = state.clock.getElapsedTime() * props.velocity;

    if(cone.current){
      cone.current.setTranslation({
          x: props.position[0] + Math.cos(elapsedTime) * 4,
          y: props.position[1],
          z: props.position[2],
        },true);
    }
  },)

  const onCollisionExit = (e) =>{
    if(e.other.rigidBodyObject.name === "AVATAR"){
      restarLifes();
    }
  }

  return (
    <RigidBody ref={cone} onCollisionExit={(e)=>{onCollisionExit(e)}} position={props.position} type="fixed" colliders="ball">  
      <mesh  ref={coneBody}>
          <sphereGeometry args={[0.5, 0.5, 2, 32]} />
          <meshStandardMaterial color={"#006400"} />
      </mesh>
    </RigidBody>
  )
}
