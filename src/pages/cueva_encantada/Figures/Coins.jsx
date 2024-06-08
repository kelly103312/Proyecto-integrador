import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function Coins({ props, catchCoin, position }) {
  const { nodes, materials } = useGLTF("/assets/cueva_encantada/models/world/coin.glb");
  const [collected, setCollected] = useState(false);
  const refRigidBody = useRef();

  const onCollisionEnter = ({ other }) => {
    if (!collected && other.colliderObject?.name === "character-capsule-collider") {
      console.log("Chocó");
      setCollected(true);
      catchCoin();
      refRigidBody.current.setTranslation({ x: 9999, y: 9999, z: 9999 }, true); // Move the coin far away
      refRigidBody.current.setCollisionGroups(0); // Disable collisions
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

useGLTF.preload("/assets/cueva_encantada/models/world/coin.glb");
