import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three'; // Importa Three.js

export default function Zombie2(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/assets/level1/models/zombie/zombie1.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Inicia el movimiento del Zombie
    moveRandom();
  }, []);

  // Función para mover al Zombie en direcciones aleatorias
  const moveRandom = () => {
    // Duración del movimiento en cada dirección (milisegundos)
    const duration = 2000;

    // Direcciones en las que el Zombie puede moverse
    const directions = [
      { rotation: [0, Math.PI / 2, 0] },   // Dirección hacia la derecha
      { rotation: [0, -Math.PI / 2, 0] }   // Dirección hacia la izquierda
    ];

    // Función para mover el Zombie en una dirección específica
    const moveDirection = (index) => {
      // Reproduce la animación Idle
      actions.Idle.play();
      actions.Idle.setLoop(THREE.LoopRepeat, Infinity);
      
      // Configura la rotación del grupo del Zombie
      const [x, y, z] = directions[index].rotation;
      group.current.rotation.set(x, y, z);

      // Espera la duración del movimiento y luego cambia a la siguiente dirección
      setTimeout(() => {
        const nextIndex = (index + 1) % directions.length; // Avanza al siguiente índice
        moveDirection(nextIndex); // Mueve al Zombie en la siguiente dirección
      }, duration);
    };

    // Inicia el movimiento en la primera dirección
    moveDirection(0);
  };

  return (
    <group ref={group} {...props} dispose={null}>
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
    </group>
  );
}

useGLTF.preload('/assets/level1/models/zombie/zombie1.glb');
