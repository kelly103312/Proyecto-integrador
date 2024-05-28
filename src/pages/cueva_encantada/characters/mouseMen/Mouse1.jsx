import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";

export default function Mouse({position, loseLife }) {
  const mouseRef = useRef(null)
  const mouseBodyRef = useRef(null)

  const { nodes, materials } = useGLTF('/assets/cueva_encantada/models/mouse-mens/Player2.glb')
  const amplitude = 1.5

  useFrame(({clock}) => {
      const moveX = Math.cos(clock.getElapsedTime()) * amplitude +    position[0];

      mouseBodyRef.current?.setTranslation({
          x:  moveX,
          y:  mouseBodyRef.current?.translation().y,
          z:  mouseBodyRef.current?.translation().z
      }, true)
  })

  const onCollisionEnter = ({ manifold, target, other }) => {
    if (other.colliderObject.name == "character-capsule-collider") {
      // Resta una vida
      loseLife();
    } else {
      console.log(
        // this rigid body's Object3D
        target.rigidBodyObject,
        " collided with ",
        // the other rigid body's Object3D
        other.rigidBodyObject
      );
    }
  };

  return (
    <RigidBody ref={mouseBodyRef} type="fixed" position={position} onCollisionEnter={(e) => onCollisionEnter(e)}>
      <group ref={mouseRef} dispose={null} scale={2.5}>
        <group name="Scene">
          <group name="Armature">
            <skinnedMesh
              name="Ch14"
              geometry={nodes.Ch14.geometry}
              material={materials.Ch14_Body}
              skeleton={nodes.Ch14.skeleton}
            />
            <primitive object={nodes.mixamorigHips} />
          </group>
        </group>
      </group>
    </RigidBody>
  );
}

useGLTF.preload("/assets/cueva_encantada/models/mouse-mens/Player2.glb");
