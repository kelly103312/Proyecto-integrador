import React, { useEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useLifesEnemy } from '../../../context/ManagementLifesEnemy'
import { useAvatar } from '../../../context/AvatarContext'
import { Euler, Quaternion, Vector3 } from 'three'
import { useFrame } from '@react-three/fiber'
import { useLifes } from '../../../context/ManagementLifes'

export function Enemy1(props) {
  const group = useRef()
  const escarabajoRef = useRef()
  const { lifes, restarLifes } = useLifes();
  const { nodes, materials, animations } = useGLTF('/assets/castillo/avatars/hormiga.glb')
  const { actions } = useAnimations(animations, group)
  const { lifesEnemy, setLifesEnemy } = useLifesEnemy();
  const {avatar,setAvatar} = useAvatar();
  const [isFollowing, setIsFollowing] = useState(true)
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 3000);

    // Limpiar el temporizador si el componente se desmonta
    return () => clearTimeout(timer);
  }, []);

  useEffect(()=>{
    if(lifesEnemy > 0){
      actions["walk"].play();
    }else{
      actions["descansaenemy1"].play();

    }
  },[group.current,avatar])
  
  useFrame((state,delta) => {
    if(startAnimation){

      if (!group.current || !avatar.modelRef) return;
      
      let modelPosition = group.current.position.clone();
      const avatarPosition = new Vector3();
      avatar.modelRef.getWorldPosition(avatarPosition); // Obtener la posición del avatar
  
      const bearPosition = new Vector3();
      group.current.getWorldPosition(bearPosition); // Obtener la posición del avatar
  
      const distanceToAvatar = bearPosition.distanceTo(avatarPosition)
      //console.log(distanceToAvatar)
      if (distanceToAvatar < 3) {
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
        const speed = 0.05; // Velocidad de movimiento
        const movement = direction.clone().multiplyScalar(speed);
        modelPosition.add(movement); 
        group.current.position.copy(modelPosition);
    
        // Calcular y aplicar la rotación hacia el avatar
        const targetQuaternion = new Quaternion();
        const euler = new Euler();
        euler.setFromVector3(new Vector3(0, Math.atan2(direction.x, direction.z), 0)); // Calcular la rotación en el eje Y
        targetQuaternion.setFromEuler(euler);
        group.current.quaternion.slerp(targetQuaternion, 0.01); // Interpolar suavemente hacia la nueva rotación
        if (distanceToAvatar < 1) {
          if (lifes > 0) {
            restarLifes();
          }
        }
      }
    }
  });

  return (
    <>
        <RigidBody ref={escarabajoRef} name="Escarabajo" {...props} colliders="hull">
            <group ref={group}  dispose={null}>
                <group name="Scene">
                    <group name="hormiga" rotation={[0, -Math.PI / 2, 0]}>
                    <skinnedMesh
                        name="Object_7"
                        geometry={nodes.Object_7.geometry}
                        material={materials.MI_Bombardier01_Body}
                        skeleton={nodes.Object_7.skeleton}
                    />
                    <skinnedMesh
                        name="Object_8"
                        geometry={nodes.Object_8.geometry}
                        material={materials.MI_Bombardier01_Eye}
                        skeleton={nodes.Object_8.skeleton}
                    />
                    <primitive object={nodes.GLTF_created_0_rootJoint} />
                    </group>
                </group>
            </group>
        </RigidBody>
    </>
  )
}

useGLTF.preload('/assets/castillo/avatars/hormiga.glb')