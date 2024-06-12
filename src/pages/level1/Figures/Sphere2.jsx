import { RigidBody } from '@react-three/rapier';
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useLifes } from '../../../context/ManagementLifes';

export const Sphere2 = (props) => {
  const sphereBody = useRef();
  const sphere = useRef();
  const { restarLifes } = useLifes();

  useFrame((state, delta) => {
    const elapsedTime = state.clock.getElapsedTime() * props.velocity;
    if (sphere.current) {
      // Movimiento diagonal en dirección X y Z
      sphere.current.setTranslation({
        x: props.position[0] + Math.cos(elapsedTime) * 4, // Movimiento en dirección X
        y: props.position[1],
        z: props.position[2] + Math.sin(elapsedTime) * 4, // Movimiento en dirección Z
      }, true);
    }
  });

  const onCollisionExit = (e) => {
    if (e.other.rigidBodyObject.name === 'AVATAR') {
      restarLifes();
    }
  };

  return (
    <RigidBody ref={sphere} onCollisionExit={onCollisionExit} position={props.position} type="fixed" colliders="ball">
      <mesh ref={sphereBody}>
        <sphereGeometry args={[0.4, 6, 6]} />
        <meshStandardMaterial color={"brown"} />
      </mesh>
    </RigidBody>
  );
};
