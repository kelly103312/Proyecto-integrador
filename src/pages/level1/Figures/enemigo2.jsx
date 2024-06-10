import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Vector3, Quaternion, Euler } from 'three';
import { useLifes } from '../../../context/ManagementLifes';
import { useAvatar } from '../../../context/AvatarContext';

export function Model1(props) {
  const group = useRef();
  const { avatar } = useAvatar();
  const { lifes, restarLifes } = useLifes();
  const { nodes, materials, animations } = useGLTF('./assets/level1/models/avatar/s.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions['spider basic']?.reset().fadeIn(0.5).play();
    return () => {
      actions['spider basic']?.fadeOut(0.5);
    };
  }, [actions]);

  useFrame(() => {
    if (!group.current || !avatar.modelRef) return;

    const avatarPosition = new Vector3();
    avatar.modelRef.getWorldPosition(avatarPosition);

    const modelPosition = group.current.position.clone();

    // Definir una dirección aleatoria
    const randomDirection = new Vector3(Math.random() * 2 - 1, 0, Math.random() * 2 - 1).normalize();

    // Calcular la dirección hacia el avatar con una mezcla de la dirección aleatoria
    const direction = avatarPosition.clone().sub(modelPosition).normalize().multiplyScalar(0.5).add(randomDirection.multiplyScalar(0.5));

    const speed = 0.05;
    const movement = direction.clone().multiplyScalar(speed);
    modelPosition.add(movement);
    group.current.position.copy(modelPosition);

    const targetQuaternion = new Quaternion();
    const euler = new Euler();
    euler.setFromVector3(new Vector3(0, Math.atan2(direction.x, direction.z), 0));
    targetQuaternion.setFromEuler(euler);
    group.current.quaternion.slerp(targetQuaternion, 0.1);

    if (modelPosition.distanceTo(avatarPosition) < 1) {
      if (lifes > 0) {
        restarLifes();
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
