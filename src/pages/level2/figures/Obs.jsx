import { RigidBody } from '@react-three/rapier'
import React, { useEffect, useRef } from 'react'
import { useFrame } from "@react-three/fiber"
import { useLifes } from '../../../context/ManagementLifes'

export const Obs = (props) => {

  const obsBody = useRef()
  const obs = useRef()
  const { restarLifes } = useLifes();

  

  useFrame((state,delta)=>{
    const elapsedTime = state.clock.getElapsedTime() * props.velocity;

    if(obs.current){
      obs.current.setTranslation({
          x: props.position[0] + Math.cos(elapsedTime) * 19,
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
    <RigidBody ref={obs} onCollisionExit={(e)=>{onCollisionExit(e)}} position={props.position} type="fixed" colliders="ball">  
      <mesh  ref={obsBody}>
      <sphereGeometry args={[1, 50, 59]} />
          <meshStandardMaterial color={"#7F7B9C"} />
      </mesh>
    </RigidBody>
  )
}