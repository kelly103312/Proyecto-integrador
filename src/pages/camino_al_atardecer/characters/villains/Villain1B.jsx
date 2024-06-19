import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import React from "react";
import { RigidBody } from "@react-three/rapier";


export default function Villain1B(props) {
    const villain1BRef = useRef();
    const { nodes, materials } = useGLTF('/assets/camino_al_atardecer/models/villains/Villain1B.glb');

    // Verificar el contenido de nodes y materials
    console.log(nodes, materials);

    const speed = 3; 
    const amplitude = 10; 
    let direction = 1; // 1 para ir a la derecha, -1 para ir a la izquierda
    let prevX = 0; // posición x anterior

    useFrame((state, delta) => {
        if (villain1BRef.current) {
            const elapsedTime = state.clock.getElapsedTime();
            const x = Math.sin(elapsedTime * speed) * amplitude;

            // Determinar la dirección del movimiento y rotar el villano
            if (x < prevX && direction === 1) {
                direction = -1;
                villain1BRef.current.rotation.y = Math.PI; // rotar 180° en el eje y
            } else if (x > prevX && direction === -1) {
                direction = 1;
                villain1BRef.current.rotation.y = 0; // rotar de vuelta a 0°
            }

            // Actualizar la posición en x
            villain1BRef.current.position.x = x;
            prevX = x;
        }
    });

    return (
        <RigidBody type="dynamic" colliders="hull">
        <group ref={villain1BRef} {...props} dispose={null}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.villain1B.geometry}
            material={materials.villainMaterial}
          />
        </group>
      </RigidBody>
    );
}

useGLTF.preload('/assets/camino_al_atardecer/models/villains/Villain1B.glb');
