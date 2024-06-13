import { Box, Html } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react'
import { useAvatar } from '../../../context/AvatarContext';
import * as THREE from 'three';
import { RigidBody } from '@react-three/rapier';

export const Object = () => {
    const meshRef = useRef();
    const sphereBody = useRef();
    const [position, setPosition] = useState([0, 2, -55]);
    const [isVisible, setIsVisible] = useState(false);
    const [velocity, setVelocity] = useState([0.1, 0, 0]);
    const {avatar,setAvatar} = useAvatar();
    const { camera } = useThree();
    const hasImpulseBeenApplied = useRef(false);
    /*useFrame(() => {
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      if (isVisible) {
        console.log("d")

        setPosition((prevPosition) => [
          prevPosition[0] + velocity[0],
          prevPosition[1] + velocity[1],
          prevPosition[2] + velocity[2],
        ]);
        
        meshRef.current.setTranslation({
          x: position[0] + velocity[0],
          y: position[1] + velocity[1],
          z: position[2] + velocity[2]
        },true)
        meshRef.current.applyImpulse({ x: 0, y: 0, z: direction.z * 5 }, true);
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
    },[avatar.animation])*/
    useFrame(() => {
      if (isVisible && meshRef.current) {
        const direction = new THREE.Vector3();
        camera.getWorldDirection(direction);
        
        if (!hasImpulseBeenApplied.current) {
          meshRef.current.applyImpulse({ x: 0, y: 0, z: direction.z * 6 }, true);
          hasImpulseBeenApplied.current = true;
        }
      }
    });

    useEffect(() => {
        const direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        if (avatar.aniqmation !== "") {
          if (avatar.animation === "attack" && avatar.ref !== null) {
            let vec = new THREE.Vector3();
            avatar.ref.current.getWorldPosition(vec);
           
            setPosition([vec.x +0.5, vec.y +1, vec.z + 0.6]); // Posición inicial
            setIsVisible(true);
            hasImpulseBeenApplied.current = false; // Reset impulse flag
          }
        }
    }, [avatar.animation, camera]);
  
      const onCollisionExit = (e) =>{
        console.log("entra ")
       console.log(e);
      }

    return (
      <>
       {isVisible && (
          <RigidBody
            onCollisionExit={onCollisionExit}
            type="dynamic"
            ref={meshRef}
            name="Object"
            position={position}
            colliders="cuboid"
          >
            <mesh ref={sphereBody}>
                <sphereGeometry args={[0.2, 3, 3]} />
                <meshStandardMaterial color={"black"} />
            </mesh>
          </RigidBody>
        )}
      </>
    );
}
