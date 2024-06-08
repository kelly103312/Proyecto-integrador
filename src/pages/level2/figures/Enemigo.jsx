import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Vector3, Quaternion, Euler } from 'three';
import { useLifes } from '../../../context/ManagementLifes';
import { useAvatar } from '../../../context/AvatarContext';

export function Model(props) {
  const group = useRef();
  const { avatar } = useAvatar(); // Acceso al contexto del avatar
  const { lifes, restarLifes } = useLifes(); // Acceso al contexto de vidas
  const { nodes, materials, animations } = useGLTF('./assets/level2/models/players/enemigo.glb');
  const { actions } = useAnimations(animations, group);
  const [currentAction, setCurrentAction] = useState('Walking'); // Animación inicial
  const [screamTriggered, setScreamTriggered] = useState(false); // Estado para controlar si ya se restó una vida

  useEffect(() => {
    actions[currentAction]?.reset().fadeIn(0.5).play();
    return () => {
      actions[currentAction]?.fadeOut(0.5);
    };
  }, [actions, currentAction]);

  useFrame(() => {
    if (!group.current || !avatar.modelRef) return;

    const avatarPosition = new Vector3();
    avatar.modelRef.getWorldPosition(avatarPosition); // Obtener la posición del avatar

    const modelPosition = group.current.position.clone();
    const direction = avatarPosition.clone().sub(modelPosition).normalize(); // Dirección hacia el avatar

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
    group.current.quaternion.slerp(targetQuaternion, 0.1); // Interpolar suavemente hacia la nueva rotación

    // Cambiar a la animación "Scream" si está cerca del avatar y restar vidas
    if (modelPosition.distanceTo(avatarPosition) < 1) {
      if (!screamTriggered) {
        setCurrentAction('Scream');
        setScreamTriggered(true);
        if (lifes > 0) {
          restarLifes();
        }
      }
    } else {
      setCurrentAction('Walking');
      setScreamTriggered(false); // Reiniciar el estado cuando el enemigo se aleja
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
    <group name="Scene">
      <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0.122}>
        <group name="root">
          <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_5_232">
              <group name="GLTF_created_0">
                <skinnedMesh
                  name="Object_7"
                  geometry={nodes.Object_7.geometry}
                  material={materials.fei_long}
                  skeleton={nodes.Object_7.skeleton}
                />
                <group name="Object_8_229" />
                <primitive object={nodes.GLTF_created_0_rootJoint} />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  </group>
  );
}

useGLTF.preload('./assets/level2/models/players/enemigo.glb');