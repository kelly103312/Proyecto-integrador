import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { RepeatWrapping } from "three";

export default function World(props) {
  const { nodes, materials } = useGLTF("/assets/cueva_encantada/models/world/World.glb");

  const onHandleIslandClick = (e) => {
    console.log(e);
    alert("click");
  };

  return (
    <RigidBody type="fixed" colliders={null}>
      <group {...props} dispose={null}>
        <group onClick={(e) => onHandleIslandClick(e)}>
          <mesh
            geometry={nodes.Floor.geometry}
            material={materials.Floormateria}
          />
          <group>
            <mesh
              geometry={nodes.Roca_1.geometry}
              material={materials.Rocamateria}
            />
            <mesh
              geometry={nodes.Roca_2.geometry}
              material={materials.Material}
            />
          </group>
          <mesh geometry={nodes.Walls.geometry} material={materials.Material} />
        </group>
      </group>
    </RigidBody>
  );
}

useGLTF.preload("/assets/cueva_encantada/models/world/World.glb");
