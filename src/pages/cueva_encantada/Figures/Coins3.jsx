import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function Coins3({ props, catchCoins, posicion }) {
  const { nodes, materials } = useGLTF("/assets/cueva_encantada/models/world/coin.glb");
  const [collected, setCollected] = useState(false); // Estado para indicar si la moneda ha sido recogida
  const [position, setPosition] = useState(posicion); // Estado para la posición de la moneda
  const refRigidBody = useRef();

  const onCollisionEnter = ({ other }) => {
    if (!collected && other.colliderObject?.name === "character-capsule-collider") {
      console.log("Chocó");
      setCollected(true); // Marca la moneda como recolectada
      setPosition([0, 1000, 0]); // Cambia la posición al ser recogida (a una posición alta para ocultarla)
      catchCoins(); // Lógica para manejar la recolección de la moneda
      refRigidBody.current.type = "kinematic"; // Cambia el tipo a kinemático para detener la física
    }
  };

  const radius = 0.3;
  const speed = 5;

  useFrame(({ clock }) => {
    if (!collected && refRigidBody.current) {
      const elapsedTime = clock.getElapsedTime();
      const angle = elapsedTime * speed;
      const y = Math.cos(angle) * radius;

      refRigidBody.current.rotation.y = angle;

      if (typeof refRigidBody.current.setTranslation === 'function') {
        refRigidBody.current.setTranslation(
          {
            x: position[0],
            y: position[1] + y,
            z: position[2],
          },
          true
        );
      } else {
        console.error('setTranslation no es una función en refRigidBody.current');
      }
    }
  });

  return (
    <RigidBody
      ref={refRigidBody}
      type="fixed"
      colliders="cuboid"
      onCollisionEnter={onCollisionEnter}
      name="Coins3"
      position={posicion}
    >
      {!collected && (
        <group {...props} dispose={null} rotation={[0, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.CoinObj_Coin_0.geometry}
            material={materials.Coin}
          />
        </group>
      )}
    </RigidBody>
  );
}

useGLTF.preload("/assets/cueva_encantada/models/world/coin.glb");
