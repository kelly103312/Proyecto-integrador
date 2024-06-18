import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody, useRapier } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";

export default function TrapWalls(props) {
  const trapWall1Ref = useRef();
  const trapWall2Ref = useRef();

  const { nodes, materials } = useGLTF(
    "/assets/camino_al_atardecer/models/trapWalls.glb"
  );
  const { world } = useRapier();

  //atraccion de los objetos hacia los trapwalls
  useEffect(() => {
    const objects = world.bodies;
    const attractionRange = 20;
    const forceMagnitude = 10;

    const interval = setInterval(() => {
      objects.forEach((body) => {
        if (body !== trapWall1Ref.current && body !== trapWall2Ref.current) {
          const position = body.translation();
          const trapWall1Position = trapWall1Ref.current.translation();
          const trapWall2Position = trapWall2Ref.current.translation();

          // Calcular la distancia solo en el eje x
          const distanceToTrapWall1 = Math.abs(
            trapWall1Position.x - position.x
          );
          const distanceToTrapWall2 = Math.abs(
            trapWall2Position.x - position.x
          );

          if (distanceToTrapWall1 < attractionRange) {
            const direction1 = {
              x: (trapWall1Position.x - position.x) / distanceToTrapWall1,
              y: 0,
              z: 0,
            };
            body.applyImpulse(
              {
                x: direction1.x * forceMagnitude,
                y: direction1.y * forceMagnitude,
                z: direction1.z * forceMagnitude,
              },
              true
            );
          }

          if (distanceToTrapWall2 < attractionRange) {
            const direction2 = {
              x: (trapWall2Position.x - position.x) / distanceToTrapWall2,
              y: 0,
              z: 0,
            };
            body.applyImpulse(
              {
                x: direction2.x * forceMagnitude,
                y: direction2.y * forceMagnitude,
                z: direction2.z * forceMagnitude,
              },
              true
            );
          }
        }
      });
    }, 100);

    return () => clearInterval(interval);
  }, [world]);

  const onCollisionEnter = (e) => {
    console.log("Collision enter", e);
  };
  const onCollisionExit = (e) => {
    console.log("Collision exit", e);
  };

  return (
    <group {...props} dispose={null}>
      <group>
        <group>
          <RigidBody
            name="trapWall1Body"
            type="fixed"
            colliders="trimesh"
            ref={trapWall1Ref}
            onCollisionEnter={(e) => onCollisionEnter(e)}
            onCollisionExit={(e) => onCollisionExit(e)}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.trapwall1.geometry}
              material={materials.trapWallMaterial}
              position={[0, 0, 50]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.trapwall1_1.geometry}
              material={materials["spikesMaterial.003"]}
              position={[0, 0, 50]}
            />
          </RigidBody>
        </group>

        <group>
          <RigidBody
            name="trapWall2Body"
            type="fixed"
            colliders="trimesh"
            ref={trapWall2Ref}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.trapWall2_1.geometry}
              material={materials["trapWallMaterial.001"]}
              position={[0, 0, 50]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.trapWall2_2.geometry}
              material={materials["spikesMaterial.003"]}
              position={[0, 0, 50]}
            />
          </RigidBody>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/assets/camino_al_atardecer/models/trapWalls.glb");
