import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import React from "react";

export default function Villain1A(props) {
    const villain1ARef = useRef();
    const { nodes, materials } = useGLTF('/assets/camino_al_atardecer/models/villains/Villain1A.glb');

    // Verificar el contenido de nodes y materials
    console.log(nodes, materials);

    const speed = 2; 
    const amplitude = 10; 
    let direction = 1; // 1 para ir a la derecha, -1 para ir a la izquierda
    let prevX = 0; // posición x anterior

    useFrame((state, delta) => {
        if (villain1ARef.current) {
            const elapsedTime = state.clock.getElapsedTime();
            const x = Math.cos(elapsedTime * speed) * amplitude;

            // Determinar la dirección del movimiento y rotar el villano
            if (x < prevX && direction === 1) {
                direction = -1;
                villain1ARef.current.rotation.y = Math.PI; // rotar 180° en el eje y
            } else if (x > prevX && direction === -1) {
                direction = 1;
                villain1ARef.current.rotation.y = 0; // rotar de vuelta a 0°
            }

            // Actualizar la posición en x
            villain1ARef.current.position.x = x;
            prevX = x;
        }
    });


    return (
      <RigidBody type="kinematicVelocity" colliders="cuboid">
        <group ref={villain1ARef} {...props} dispose={null}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.villain1A.geometry}
            material={materials.villainMaterial}
          />
        </group>
      </RigidBody>
    );
}

useGLTF.preload('/assets/camino_al_atardecer/models/villains/Villain1A.glb');
