import { Box, Html } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react'
import { useAvatar } from '../../../context/AvatarContext';
import * as THREE from 'three';
import { RigidBody } from '@react-three/rapier';

export const Object = () => {
    const meshRef = useRef();
    const [position, setPosition] = useState([0, 2, -55]);
    const [isVisible, setIsVisible] = useState(false);
    const [velocity, setVelocity] = useState([0.1, 0, 0]);
    const {avatar,setAvatar} = useAvatar();
    const { camera } = useThree();

    useFrame(() => {
      if (isVisible) {
        setPosition((prevPosition) => [
          prevPosition[0] + velocity[0],
          prevPosition[1] + velocity[1],
          prevPosition[2] + velocity[2],
        ]);
      }
    });
    useEffect(()=>{
        const direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        if(avatar.animation !== ""){
          if(avatar.animation == "attack" && avatar.ref !== null){
            let vec= new THREE.Vector3();
            avatar.ref.current.getWorldPosition(vec)
           
            setPosition([vec.x+0.5,vec.y+0.5,vec.z+0.5]); // Posición inicial
            setIsVisible(true);
            setVelocity([0,-0,direction.z*0.5]); 
          }
        }
    },[avatar.animation])
  
    const handleThrow = () => {
      setPosition([0, 2, -32]); 
      setIsVisible(true);
      setVelocity([0, -0, -0.5]);
    };
  
      const onCollisionExit = (e) =>{
       console.log(e);
      }

    return (
      <RigidBody visible={isVisible} onCollisionExit={(e)=>{onCollisionExit(e)}}  type="fixed" ref={meshRef} name="Object" position={position} colliders="cuboid">
        <mesh  >
            <boxGeometry  args={[1, 1, 1]}/>
            <meshBasicMaterial color={"hotpink"} wireframe/>
        </mesh>
      </RigidBody>
    );
}
