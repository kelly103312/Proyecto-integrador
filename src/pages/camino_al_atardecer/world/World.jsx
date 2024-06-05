import { useGLTF, useTexture } from "@react-three/drei";
import { RepeatWrapping } from "three";
import React from "react";
import "../styles.css";
import { useEffect } from "react";
import { RigidBody } from "@react-three/rapier";

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
    <RigidBody type="fixed" colliders="trimesh">
      <group {...props} dispose={null}>
        <group>
          {/* <mesh geometry={nodes.Walls.geometry} material={materials.Material} /> */}
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

          <group onClick={onHandleChairClick}>
            <mesh
              castShadow={true}
              receiveShadow={true}
              geometry={nodes.silla.geometry}
              material={materials.Rockingchair_01}
              position={[-1, -0.5, 50]}
            />
          </group>

          <mesh
            castShadow
            receiveShadow
            geometry={nodes.ukelele.geometry}
            material={materials.Ukulele_01}
            position={[0, -0.5, 50]}
          />
          <group position={[0, 0.7, 50]}>
            <mesh
              onClick={(e) => e.stopPropagation()}
              castShadow
              receiveShadow
              geometry={nodes.tree_1.geometry}
              material={nodes.tree_1.material}
            />
            <mesh
              onClick={(e) => e.stopPropagation()}
              castShadow
              receiveShadow
              geometry={nodes.tree_2.geometry}
              material={materials.leaves_material}
            />
            <mesh
              onClick={(e) => e.stopPropagation()}
              castShadow
              receiveShadow
              geometry={nodes.tree_3.geometry}
              material={materials.root_material}
            />
          </group>
          <mesh
            onClick={(e) => e.stopPropagation()}
            receiveShadow={true}
            castShadow={true}
            geometry={nodes.WoodenFence.geometry}
            material={materials.woodenfenceMaterial}
            position={[0, 0, 50]}
          />
          <mesh
            onClick={(e) => e.stopPropagation()}
            castShadow
            receiveLight={false}
            receiveShadow={false}
            geometry={nodes.startwall.geometry}
            material={materials.startwallMaterial}
            position={[0, -0.3, 50]}
          />
          {/* <group>
          <mesh onClick={(e)=>e.stopPropagation()}
            castShadow
            receiveShadow
            geometry={nodes.tree_1.geometry}
            material={nodes.tree_1.material}
          />
          <mesh onClick={(e)=>e.stopPropagation()}
            castShadow
            receiveShadow
            geometry={nodes.tree_2.geometry}
            material={materials.leaves_material}
          />
          <mesh onClick={(e)=>e.stopPropagation()}
            castShadow
            receiveShadow
            geometry={nodes.tree_3.geometry}
            material={materials.root_material}
          />
        </group> */}
          <mesh
            onClick={(e) => e.stopPropagation()}
            castShadow={true}
            receiveShadow={true}
            geometry={nodes.walls.geometry}
            material={materials.wallsMaterial}
            position={[0, -0.3, 50]}
          />

          <mesh
            castShadow
            receiveShadow
            geometry={nodes.trunk.geometry}
            material={materials.rootMaterial}
            position={[0, -1, 50]}

          />
        </group>
      </group>
    </RigidBody>
  );
}

useGLTF.preload("/assets/camino_al_atardecer/models/world/Proyecto-integrador-videojuego.glb");

