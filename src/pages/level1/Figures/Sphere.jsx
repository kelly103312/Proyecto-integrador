import { RigidBody } from '@react-three/rapier';
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useLifes } from '../../../pages/level1/ManagementLifes';

export const Sphere = (props) => {
  const sphereBody = useRef();
  const sphere = useRef();
  const { restarLifes } = useLifes();

  useFrame((state, delta) => {
    const elapsedTime = state.clock.getElapsedTime() * props.velocity;
    if (sphere.current) {
      sphere.current.setTranslation({
        x: props.position[0] + Math.cos(elapsedTime) * 4,
        y: props.position[1],
        z: props.position[2],
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
