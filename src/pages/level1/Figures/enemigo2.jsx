import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Vector3, Quaternion, Euler, Audio, AudioLoader } from 'three';
import { useLifes } from '../../../context/ManagementLifes';
import { useAvatar } from '../../../context/AvatarContext';

export function Model1(props) {
  const group = useRef();
  const { avatar } = useAvatar();
  const { lifes, restarLifes } = useLifes();
  const { nodes, materials, animations } = useGLTF('./assets/level1/models/avatar/s.glb');
  const { actions } = useAnimations(animations, group);

  const soundRef = useRef();

  useEffect(() => {
    actions['spider basic']?.reset().fadeIn(0.5).play();

    // Cargar el sonido
    const listener = new THREE.AudioListener();
    const sound = new THREE.Audio(listener);
    const audioLoader = new THREE.AudioLoader();

    audioLoader.load('/assets/level1/sounds/monster-bite.mp3', (buffer) => {
      sound.setBuffer(buffer);
      sound.setVolume(0.5);
    });

    soundRef.current = sound;

    return () => {
      actions['spider basic']?.fadeOut(0.5);
    };
  }, [actions]);

  useFrame(() => {
    if (!group.current || !avatar.modelRef) return;

    const avatarPosition = new Vector3();
    avatar.modelRef.getWorldPosition(avatarPosition);

    const modelPosition = group.current.position.clone();

    // Limitar el movimiento al suelo (plano horizontal)
    modelPosition.y = 0;

    // Definir una dirección aleatoria
    const randomDirection = new Vector3(Math.random() * 2 - 1, 0, Math.random() * 2 - 1).normalize();

    // Calcular la dirección hacia el avatar con una mezcla de la dirección aleatoria
    const direction = avatarPosition.clone().sub(modelPosition).normalize().multiplyScalar(0.5).add(randomDirection.multiplyScalar(0.5));

    const speed = 0.05;
    const movement = direction.clone().multiplyScalar(speed);

    // Limitar el movimiento al suelo (plano horizontal)
    const newPosition = modelPosition.add(movement);
    newPosition.y = 0; // Asegurar que la araña permanezca en el suelo

    group.current.position.copy(newPosition);

    // Ajustar la rotación para mirar hacia la dirección de movimiento
    const targetQuaternion = new Quaternion();
    const euler = new Euler();
    euler.setFromVector3(new Vector3(0, Math.atan2(direction.x, direction.z), 0));
    targetQuaternion.setFromEuler(euler);
    group.current.quaternion.slerp(targetQuaternion, 0.1);

    // Detectar colisión con el avatar
    if (modelPosition.distanceTo(avatarPosition) < 1) {
      if (lifes > 0) {
        restarLifes();
        soundRef.current?.play(); // Reproducir el sonido cuando la araña ataque al avatar
      }
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature">
          <skinnedMesh
            name="body001"
            geometry={nodes.body001.geometry}
            material={materials.main}
            skeleton={nodes.body001.skeleton}
            morphTargetDictionary={nodes.body001.morphTargetDictionary}
            morphTargetInfluences={nodes.body001.morphTargetInfluences}
          />
          <primitive object={nodes.root} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('./assets/level1/models/avatar/s.glb');
