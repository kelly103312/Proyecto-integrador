import React, { useRef, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Coins = ({ position, onCollect }) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/assets/level1/models/world/coin.glb');
  const { actions } = useAnimations(animations, group);
  const [visible, setVisible] = useState(true);
  const soundRef = useRef();

  // Load the sound once when the component mounts
  useState(() => {
    const listener = new THREE.AudioListener();
    const sound = new THREE.Audio(listener);
    const audioLoader = new THREE.AudioLoader();

    audioLoader.load('/assets/level1/sounds/mario_moneda.mp3', (buffer) => {
      sound.setBuffer(buffer);
      sound.setVolume(0.5);
    });

    soundRef.current = sound;
  }, []);

  const onCollisionExit = (e) => {
    if (e.other.rigidBodyObject.name === 'AVATAR') {
      setVisible(false);
      onCollect();
      soundRef.current?.play(); // Play the sound when the coin is collected
    }
  };

  useFrame(() => {
    if (group.current) {
      // Continuous rotation along the Y axis (or the Z axis depending on the orientation of the coin)
      group.current.rotation.y += 0.01; // Adjust the rotation speed here
    }
  });

  return (
    <>
      {visible ? (
        <RigidBody type="fixed" position={position} onCollisionExit={(e) => onCollisionExit(e)}>
          <group ref={group} dispose={null}>
            <group name="Scene">
              <group name="coin" userData={{ name: 'coin' }}>
                <mesh
                  name="CoinObj_Coin_0"
                  geometry={nodes.CoinObj_Coin_0.geometry}
                  material={materials.Coin}
                  userData={{ name: 'CoinObj_Coin_0' }}
                />
              </group>
            </group>
          </group>
        </RigidBody>
      ) : null}
    </>
  );
};

useGLTF.preload('/assets/level1/models/world/coin.glb');
