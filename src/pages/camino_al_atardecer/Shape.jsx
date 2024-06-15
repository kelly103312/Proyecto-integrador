import { BallCollider, CuboidCollider, RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";

export default function Shape() {
  return (
    <group>
      <RigidBody>
        <mesh position={[0, 0, 40]}>
          <torusGeometry args={[1, 0.4, 16, 100]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      </RigidBody>
      <RigidBody>
        <mesh position={[0, 0, 2]}>
          <torusGeometry args={[5, 1, 16, 100]} />
          <meshStandardMaterial color="green" />
        </mesh>
      </RigidBody>
      <RigidBody>
        <mesh position={[0, 0, 45]}>
          <torusGeometry args={[1, 0.4, 16, 100]} />
          <meshStandardMaterial color="blue" />
        </mesh>
      </RigidBody>
    </group>
  );
}