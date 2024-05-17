import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { LoopRepeat } from 'three';
import { RigidBody } from '@react-three/rapier';
import { useLifes } from '../../../../context/ManagementLifes';

export default function Zombie1(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/assets/level1/models/zombie/zombie.glb');
  const { actions } = useAnimations(animations, group);
  const { restarLifes } = useLifes();

  useEffect(() => {
    // Inicia el movimiento del Zombie
    moveRandom();
  }, []);

  const moveRandom = () => {
    const duration = 3000;
    const directions = [
      { rotation: [0, -Math.PI / 2, 0] }, 
      { rotation: [0, Math.PI / 2, 0] } 
    ];

    const moveDirection = (index) => {
      actions.Idle.play();
      actions.Idle.setLoop(LoopRepeat, Infinity);
      
      const [x, y, z] = directions[index].rotation;
      

      setTimeout(() => {
        const nextIndex = (index + 1) % directions.length;
        moveDirection(nextIndex);
      }, duration);
    };

    moveDirection(0);
  };

  const onCollisionExit = (e) => {
    if (e.other.rigidBodyObject.name === "AVATAR") {
      restarLifes();
    }
  }

  return (
    <RigidBody ref={group} onCollisionExit={onCollisionExit} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={[0.01, 0.01, 0.01]}>
          <skinnedMesh
            name="mremireh_body"
            geometry={nodes.mremireh_body.geometry}
            material={materials.emireh_body_material}
            skeleton={nodes.mremireh_body.skeleton}
          />
          <skinnedMesh
            name="mremireh_shoe"
            geometry={nodes.mremireh_shoe.geometry}
            material={materials.emireh_shoe_material}
            skeleton={nodes.mremireh_shoe.skeleton}
          />
          <primitive object={nodes.mixamorigHips} />
        </group>
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/assets/level1/models/zombie/zombie.glb');
