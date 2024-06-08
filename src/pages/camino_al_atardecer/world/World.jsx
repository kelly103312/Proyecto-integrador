import { useGLTF, useTexture } from "@react-three/drei";
import { RepeatWrapping } from "three";
import React from "react";
import "../styles.css";

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
        {/* <mesh geometry={nodes.Walls.geometry} material={materials.Material} /> */}
        <mesh onClick={(e)=>e.stopPropagation()}
          castShadow={true}
          receiveShadow={true}
          geometry={nodes.Floor.geometry}
        >
          <meshStandardMaterial {...propsTexture} displacementScale={1.5} />
        </mesh>
        <group onClick={onHandleChairClick}>
          <mesh onClick={(e)=>e.stopPropagation()}
            castShadow={true}
            receiveShadow={true}
            geometry={nodes.silla.geometry}
            material={materials.Rockingchair_01}
            position={[0, 0.168, 0]}
          />
        </group>

        {/* <mesh
          castShadow
          receiveShadow
          geometry={nodes.ukelele.geometry}
          material={materials.Ukulele_01}
          position={[0, 0.168, 0]}
        /> */}
        {/* <group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.tree_1.geometry}
            material={nodes.tree_1.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.tree_2.geometry}
            material={materials.leaves_material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.tree_3.geometry}
            material={materials.root_material}
          />
        </group> */}
        <mesh onClick={(e)=>e.stopPropagation()}
          receiveShadow={true}
          castShadow={true}
          geometry={nodes.WoodenFence.geometry}
        >
          <meshStandardMaterial
            color={"#FF8E08"}
            metalness={0}
            roughness={0.5}
          />
        </mesh>
        <mesh onClick={(e)=>e.stopPropagation()}
          castShadow
          receiveShadow
          geometry={nodes.walls2.geometry}
          material={nodes.walls2.material}
        />
        <group>
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
        </group>
        <mesh onClick={(e)=>e.stopPropagation()}
          castShadow={true}
          receiveShadow={true}
          geometry={nodes.walls3.geometry}
          material={nodes.walls3.material}
        />
        {/* <group>
          <mesh
            castShadow = {true}
            receiveShadow = {true}
            geometry={nodes.tree003.geometry}
            material={materials.Material_1}
          />
          <mesh
            castShadow = {true}
            receiveShadow = {true}
            geometry={nodes.tree003_1.geometry}
            material={materials.Material}
          />
        </group> */}
      </group>
    </group>
  );
}

useGLTF.preload("/assets/camino_al_atardecer/models/world/Proyecto-integrador-videojuego.glb");

