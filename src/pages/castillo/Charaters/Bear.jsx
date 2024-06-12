import React, { useEffect, useRef, useState } from 'react'
import { Html, useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import { useLifesEnemy } from '../../../context/ManagementLifesEnemy'
import { useAvatar } from '../../../context/AvatarContext'
import { Euler, Quaternion, Vector3 } from 'three'
import { useLifes } from '../../../context/ManagementLifes'


export const Bear = (props) => {
  const { nodes, materials } = useGLTF('/assets/castillo/avatars/bear.glb')
  const group = useRef();
  const groupbody = useRef();
  const { lifesEnemy, setLifesEnemy } = useLifesEnemy();
  const {avatar,setAvatar} = useAvatar();
  const { lifes, restarLifes } = useLifes();
  const [screamTriggered, setScreamTriggered] = useState(false);
  const [isFollowing, setIsFollowing] = useState(true)

  
  useFrame((state,delta) => {
    if (!groupbody.current || !avatar.modelRef) return;
    
    let modelPosition = groupbody.current.position.clone();
    const avatarPosition = new Vector3();
    avatar.modelRef.getWorldPosition(avatarPosition); // Obtener la posición del avatar

    const bearPosition = new Vector3();
    groupbody.current.getWorldPosition(bearPosition); // Obtener la posición del avatar

    const distanceToAvatar = bearPosition.distanceTo(avatarPosition)
    //console.log(distanceToAvatar)
    if (distanceToAvatar < 4) {
      setIsFollowing(false)
    } else {
      setIsFollowing(true)
    }

    if (isFollowing) {
  
      //console.log(modelPosition)
      const direction = avatarPosition.clone().sub(modelPosition); // Dirección hacia el avatar
      direction.z = -direction.z 
      //direction.y = -direction.y 
      direction.normalize()
  
      // Actualizar la posición del modelo
      const speed = 0.5; // Velocidad de movimiento
      const movement = direction.clone().multiplyScalar(speed);
      modelPosition.add(movement); 
      groupbody.current.position.copy(modelPosition);
  
      // Calcular y aplicar la rotación hacia el avatar
      const targetQuaternion = new Quaternion();
      const euler = new Euler();
      euler.setFromVector3(new Vector3(0, Math.atan2(direction.x, direction.z), 0)); // Calcular la rotación en el eje Y
      targetQuaternion.setFromEuler(euler);
      groupbody.current.quaternion.slerp(targetQuaternion, 0.01); // Interpolar suavemente hacia la nueva rotación
      if (modelPosition.distanceTo(avatarPosition) < 1) {
        if (lifes > 0) {
          restarLifes();
        }
      }
    }
  });

  // useFrame((state,delta) => {
  //   const elapsedTime = state.clock.getElapsedTime();
  //   if(bearRef.current){
  //     if(lifesEnemy > 0){
  //       bearRef.current.setTranslation({
  //         x: props.position[0] + Math.cos(elapsedTime) * 2,
  //         y: props.position[1] ,
  //         z: props.position[2] ,
  //       },true);
  //     }
  //       /*bearRef.current.setTranslation({
  //           x: props.position[0] ,
  //           y: props.position[1] ,
  //           z: props.position[2] ,
  //         },true);*/
  //   }
  // },[bearRef.current]);

  useEffect(()=>{
    console.log(lifesEnemy)
  },[])
 
  return (
    <>
        <RigidBody ref={group} name="BEAR"  colliders="trimesh" position={props.position}>
            <group  ref={groupbody} dispose={null}>
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