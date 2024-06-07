import { RigidBody } from '@react-three/rapier'
import React, { useRef } from 'react'
import { useFrame } from "@react-three/fiber"

export const Sphere = (props) => {
  const sphereBody = useRef()
  useFrame((state,delta)=>{
    const elapsedTime = state.clock.getElapsedTime();
    console.log(sphereBody.current)
    sphereBody.current.position.x = props.position[0] + Math.cos(elapsedTime);
    sphereBody.current.position.z = props.position[2] + Math.cos(elapsedTime);
},[sphereBody.current])
  return (
    <>  
            <mesh  ref={sphereBody}
            position={props.position}>
                <sphereGeometry args={[0.4, 6, 6]} />
                <meshStandardMaterial color={"grey"} />
            </mesh>
    </>
  )
}
