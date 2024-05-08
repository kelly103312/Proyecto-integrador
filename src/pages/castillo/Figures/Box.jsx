import { RigidBody } from '@react-three/rapier'
import React from 'react'
import { useLifes } from '../../../context/ManagementLifes';

export const Box = (props) => {
  const { lifes, restarLifes } = useLifes();

  const onCollisionExit = (e) =>{
    if(e.other.rigidBodyObject.name === "AVATAR"){
      restarLifes();
    }
  }
  return (
    <RigidBody name="BOX" position={props.position} onCollisionExit={(e)=>{onCollisionExit(e)}}>
        <mesh {...props}>
            <boxGeometry />
            <meshBasicMaterial color={"hotpink"} wireframe/>
        </mesh>
    </RigidBody>
  )
}
