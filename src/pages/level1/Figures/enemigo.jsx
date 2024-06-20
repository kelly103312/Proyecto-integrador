import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Vector3, Quaternion, Euler } from 'three';
import { useAvatar } from '../../../context/AvatarContext';
import { useLifes } from '../../../context/ManagementLifes'; // Importar contexto para manejar vidas

export function Model(props) {
  const group = useRef();
  const { avatar } = useAvatar(); // Contexto del avatar
  const { lifes, restarLifes } = useLifes(); // Contexto para manejar las vidas del avatar
  const { nodes, materials, animations } = useGLTF('./assets/level1/models/avatar/enemigo1.glb'); // Cargar el modelo del enemigo
  const { actions } = useAnimations(animations, group);
  const [currentAction, setCurrentAction] = useState('fly'); // Animación inicial 'fly'
  const [attackTriggered, setAttackTriggered] = useState(false); // Estado para controlar si ya se activó el ataque

  const soundRef = useRef();

  useEffect(() => {
    actions[currentAction]?.reset().fadeIn(0.5).play();
    return () => {
      actions[currentAction]?.fadeOut(0.5);
    };
  }, [actions, currentAction]);

  useEffect(() => {
    // Cargar el sonido
    const listener = new THREE.AudioListener();
    const sound = new THREE.Audio(listener);
    const audioLoader = new THREE.AudioLoader();

    audioLoader.load('/assets/level1/sounds/dragon-roar.mp3', (buffer) => {
      sound.setBuffer(buffer);
      sound.setVolume(0.5);
    });

    soundRef.current = sound;
  }, []);

  useFrame(() => {
    if (!group.current || !avatar.modelRef) return;

    const avatarPosition = new Vector3();
    avatar.modelRef.getWorldPosition(avatarPosition); // Obtener la posición del avatar

    const enemyPosition = group.current.position.clone();
    const direction = avatarPosition.clone().sub(enemyPosition).normalize(); // Dirección hacia el avatar

    // Ajustar la velocidad aquí
    const speed = 0.05; // Velocidad de movimiento aumentada
    const movement = direction.clone().multiplyScalar(speed);
    enemyPosition.add(movement);
    group.current.position.copy(enemyPosition);

    // Calcular y aplicar la rotación hacia el avatar
    const targetQuaternion = new Quaternion();
    const euler = new Euler();
    euler.setFromVector3(new Vector3(0, Math.atan2(direction.x, direction.z), 0)); // Calcular la rotación en el eje Y
    targetQuaternion.setFromEuler(euler);
    group.current.quaternion.slerp(targetQuaternion, 0.1); // Interpolar suavemente hacia la nueva rotación

    // Detectar colisión con el avatar y causar daño
    if (enemyPosition.distanceTo(avatarPosition) < 1) {
      if (!attackTriggered) {
        setCurrentAction('roar'); // Cambiar a la animación 'roar'
        setAttackTriggered(true);
        
        // Restar una vida al avatar cuando el enemigo ataca
        if (lifes > 0) {
          restarLifes();
        }
        
        // Reproducir el sonido de ataque
        soundRef.current?.play();
      }
    } else {
      setCurrentAction('fly'); // Cambiar de nuevo a la animación 'fly'
      setAttackTriggered(false); // Reiniciar el estado cuando el enemigo se aleja
    }
  });

  return (
    <group ref={group} {...props} dispose={null} scale={[0.1, 0.1, 0.1]}>
      <group name="Scene">
        <group name="Armature">
          <skinnedMesh
            name="mesh"
            geometry={nodes.mesh.geometry}
            material={materials.skin}
            skeleton={nodes.mesh.skeleton}
          />
          <primitive object={nodes.root} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('./assets/level1/models/avatar/enemigo1.glb');
