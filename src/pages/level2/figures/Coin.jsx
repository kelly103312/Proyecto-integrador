import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function Coin({ props, catchCoin, position }) {
  const { nodes, materials } = useGLTF("/assets/level2/models/world/coin.glb");
  const [collected, setCollected] = useState(false);
  const refRigidBody = useRef();

  const onCollisionEnter = ({ other }) => {
    if (!collected && other.colliderObject?.name === "character-capsule-collider") {
      console.log("Chocó");
      setCollected(true);
      catchCoin();
      refRigidBody.current.type = "kinematic"; // Cambia a tipo kinemático al ser recogida
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
      name="Coin"
      position={position}
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

useGLTF.preload("/assets/level2/models/world/coin.glb");