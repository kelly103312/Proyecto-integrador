import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import React from "react";

export default function Villain1D(props) {
    // const Villain1ARef = useRef(null);
    const { nodes, materials } = useGLTF('/assets/camino_al_atardecer/models/villains/Villain1D.glb');

    // Verificar el contenido de nodes y materials
    console.log(nodes, materials);

    // const radius = 3.5;
    // const speed = 1.5;

    // useFrame((state, delta) => {
    //     const elapsedTime = state.clock.getElapsedTime();
    //     const angle = elapsedTime * speed;
    //     const x = Math.cos(angle) * radius;
    //     const z = Math.sin(angle) * radius;

    //     Villain1ARef.current.position.set(props.position[0] + x, props.position[1], props.position[2] + z);
    //     Villain1ARef.current.rotation.y = -angle;
    // });

    return (
        <group {...props} dispose={null}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.villain1D.geometry}
            material={materials.villainMaterial}
          />
        </group>
      )
}

useGLTF.preload('/assets/camino_al_atardecer/models/villains/Villain1D.glb');
