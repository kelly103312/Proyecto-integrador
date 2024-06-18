import { useGLTF, useTexture } from "@react-three/drei";
import { RepeatWrapping } from "three";
import React, { useRef } from "react";
import "../styles.css";
import { useEffect } from "react";
import { ConeCollider, ConvexHullCollider, CuboidCollider, CylinderCollider, MeshCollider, RigidBody, RoundConeCollider } from "@react-three/rapier";
import TrapWalls from "../TrapWalls";

export default function World(props) {
  const { nodes, materials } = useGLTF("/assets/camino_al_atardecer/models/world/Proyecto-integrador-videojuego.glb");
  const PATH = "/assets/camino_al_atardecer/textures/floor/";

  const propsTexture = useTexture({
    map: PATH + "aerial_rocks_01_diff_1k.jpg",
    normalMap: PATH + "aerial_rocks_01_nor_gl_1k.jpg",
    roughnessMap: PATH + "aerial_rocks_01_rough_1k.jpg",
    displacementMap: PATH + "aerial_rocks_01_rough_1k.jpg",
  });

  // Configurar las propiedades de repetición y envoltura de las texturas
  const repeatSettings = [8, 64];
  [propsTexture.map, propsTexture.normalMap, propsTexture.roughnessMap, propsTexture.displacementMap].forEach((texture) => {
    texture.repeat.set(...repeatSettings);
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.anisotropy = 16;
    texture.flipY = false;
  });

  const onHandleChairClick = () => {
    alert("Congratulations! You have finished the game. You are safe now. Take a rest");
  }

  return (
    <group {...props} dispose={null}>
      <group>
        <RigidBody type="fixed" colliders="cuboid" name="FloorBody">
          <mesh
            castShadow={true}
            receiveShadow={true}
            geometry={nodes.Floor.geometry}
            material={nodes.Floor.material}
            position={[0, 0, 50]}
            scale={[1.2, 1.5, 1]}
          >
            <meshStandardMaterial {...propsTexture} displacementScale={0} />
          </mesh>
        </RigidBody>

        <RigidBody name="chairBody" colliders={false} type="fixed">
          <group onClick={onHandleChairClick}>
            <mesh
              castShadow={true}
              receiveShadow={true}
              geometry={nodes.silla.geometry}
              material={materials.Rockingchair_01}
              position={[-3, -0.5, 50]}
            ></mesh>
            <CylinderCollider
              args={[1.2, 1.2, 1.5]}
              position={[-5, 1, -118.5]}
            />
          </group>
        </RigidBody>

        <RigidBody name="ukeBody" colliders="hull" type="fixed">
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.ukelele.geometry}
            material={materials.Ukulele_01}
            position={[0, -0.5, 50]}
          />
        </RigidBody>

        <RigidBody name="treeBody" colliders="trimesh" type="fixed">
          <group position={[0, 0, 50]}>
            <mesh
              onClick={(e) => e.stopPropagation()}
              castShadow
              receiveShadow
              geometry={nodes.tree_1.geometry}
              material={nodes.tree_1.material}
            ></mesh>
            <mesh
              onClick={(e) => e.stopPropagation()}
              castShadow
              receiveShadow
              geometry={nodes.tree_2.geometry}
              material={materials.leaves_material}
            ></mesh>
            <mesh
              onClick={(e) => e.stopPropagation()}
              castShadow
              receiveShadow
              geometry={nodes.tree_3.geometry}
              material={materials.root_material}
            ></mesh>
          </group>
        </RigidBody>

        <RigidBody name="fenceBody" colliders={false} type="fixed">
          <mesh
            onClick={(e) => e.stopPropagation()}
            receiveShadow={true}
            castShadow={true}
            geometry={nodes.WoodenFence.geometry}
            material={materials.woodenfenceMaterial}
            position={[0, 0, 50]}
          >
            <CuboidCollider
              args={[0.4, 1.7, 70.7]}
              position={[12.3, 1.4, -104.8]}
            />
            <CuboidCollider
              args={[0.4, 1.7, 80.3]}
              position={[-12.3, 1.4, -95.4]}
            />
            <CuboidCollider
              args={[11.5, 1.7, 0.4]}
              position={[0, 1.4, -176.4]}
            />
            <CuboidCollider
              args={[0.4, 1.7, 28.7]}
              position={[-12.3, 1.4, 29.5]}
            />
            <CuboidCollider
              args={[0.4, 1.7, 38.6]}
              position={[12.3, 1.4, 19.7]}
            />
            <CuboidCollider args={[0.4, 1.7, 6.3]} position={[11.5, 1.4, 94]} />
            <CuboidCollider
              args={[0.4, 1.7, 6.3]}
              position={[-11.5, 1.4, 94]}
            />
          </mesh>
        </RigidBody>

        <RigidBody name="starWallBody" colliders="cuboid" type="fixed">
          <mesh
            onClick={(e) => e.stopPropagation()}
            castShadow
            receiveLight={false}
            receiveShadow={false}
            geometry={nodes.startwall.geometry}
            material={materials.startwallMaterial}
            position={[0, -0.3, 50]}
          />
        </RigidBody>

        <RigidBody name="wallsBody" colliders={false} type="fixed">
          <mesh
            onClick={(e) => e.stopPropagation()}
            castShadow={true}
            receiveShadow={true}
            geometry={nodes.walls.geometry}
            material={materials.wallsMaterial}
            position={[0, -0.3, 50]}
          >
            <CuboidCollider
              args={[2, 6.6, 14.2]}
              position={[-11.5, 6.6, 73.3]}
            />
            <CuboidCollider
              args={[2, 6.6, 14.2]}
              position={[11.5, 6.6, 73.3]}
            />
          </mesh>
        </RigidBody>

        <RigidBody name="trunkBody" colliders="hull" type="fixed">
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.trunk.geometry}
            material={materials.rootMaterial}
            position={[0, -1, 50]}
          />
        </RigidBody>

        <RigidBody name="trapFloorBody" colliders="trimesh" type="fixed">
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.trapFloor.geometry}
            material={materials.trapFloor}
            position={[0, 0, 50]}
          />
        </RigidBody>

        <TrapWalls />
      </group>
    </group>
  );
}

useGLTF.preload("/assets/camino_al_atardecer/models/world/Proyecto-integrador-videojuego.glb");

