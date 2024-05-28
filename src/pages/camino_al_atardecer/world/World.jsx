import { useGLTF, useTexture } from "@react-three/drei";
import { RepeatWrapping } from "three";
import React from "react";
import { Canvas } from '@react-three/fiber';

export default function World(props) {
  const { nodes, materials } = useGLTF("public/assets/camino_al_atardecer/models/world/Proyecto-integrador-videojuego.glb");
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

  return (
    <group {...props} dispose={null}>
      <group>
        {/* <mesh geometry={nodes.Walls.geometry} material={materials.Material} /> */}
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Floor.geometry}
        >
          <meshStandardMaterial {...propsTexture} displacementScale={1.5} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.silla.geometry}
          material={materials.Rockingchair_01}
          position={[0, 0.168, 0]}
        />
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
        <mesh castShadow geometry={nodes.WoodenFence.geometry}>
          <meshStandardMaterial
            color={"#FF8E08"}
            metalness={0}
            roughness={0.5}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.walls2.geometry}
          material={nodes.walls2.material}
        />
        {/* <group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.realCap_Model_3001.geometry}
            material={materials.rock_07}
            lightMapIntensity={4}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.realCap_Model_3001_1.geometry}
            material={materials.boulder_01}
          />
        </group> */}
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.walls3.geometry}
          material={nodes.walls3.material}
        />
        <group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.tree003.geometry}
            material={materials.Material_1}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.tree003_1.geometry}
            material={materials.Material}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/assets/camino_al_atardecer/models/world/Proyecto-integrador-videojuego.glb");

const App = () => {
  return (
    <Canvas>
      <World />
    </Canvas>
  );
}

