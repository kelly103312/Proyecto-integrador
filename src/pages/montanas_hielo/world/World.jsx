import { useGLTF, useTexture } from "@react-three/drei"
import { RepeatWrapping } from "three";

export default function World(props) {
    const { nodes, materials } = useGLTF("/assets/montana_hielo/models/world/Proyecto-integrador-videojuego.glb")
    const PATH = "/assets/montana_hielo/textures/floor/";

    const propsTexture = useTexture({
        map: PATH + "aerial_rocks_01_diff_1k.jpg",
        normalMap: PATH + "aerial_rocks_01_nor_gl_1k.jpg",
        roughnessMap: PATH + "aerial_rocks_01_rough_1k.jpg",
        displacementMap: PATH + "aerial_rocks_01_rough_1k.jpg",
    });

    propsTexture.map.repeat.set(4, 64);
    propsTexture.map.wrapS = propsTexture.map.wrapT = RepeatWrapping;

    propsTexture.normalMap.repeat.set(4, 64);
    propsTexture.normalMap.wrapS = propsTexture.normalMap.wrapT = RepeatWrapping;

    propsTexture.roughnessMap.repeat.set(4, 64);
    propsTexture.roughnessMap.wrapS = propsTexture.roughnessMap.wrapT = RepeatWrapping;

    propsTexture.displacementMap.repeat.set(4, 64);
    propsTexture.displacementMap.wrapS = propsTexture.displacementMap.wrapT = RepeatWrapping;

    return (
      <group {...props} dispose={null}>
        <group>
          {/* <mesh geometry={nodes.Walls.geometry} material={materials.Material} /> */}
          <mesh receiveShadow={true} geometry={nodes.Floor.geometry}>
            <meshStandardMaterial {...propsTexture} />
          </mesh>
          <mesh
            castShadow 
            receiveShadow = {true}
            geometry={nodes.silla.geometry}
            material={materials.Rockingchair_01}
            position={[0, 0.168, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.ukelele.geometry}
            material={materials.Ukulele_01}
            position={[0, 0.168, 0]}
          />
          <group>
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
          </group>
          <mesh castShadow={true} geometry={nodes.WoodenFence.geometry}>
            <meshStandardMaterial
              color={"#FF8E08"}
              metalness={0}
              roughness={0.5}
            />
          </mesh>
        </group>
      </group>
    );
}

useGLTF.preload("/assets/montana_hielo/models/world/Proyecto-integrador-videojuego.glb");

