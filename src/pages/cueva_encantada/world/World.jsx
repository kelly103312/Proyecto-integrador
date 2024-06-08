import { useGLTF } from "@react-three/drei";
import { CuboidCollider, CylinderCollider, RigidBody,} from "@react-three/rapier";
import { useLifes } from "../../../context/ManagementLifes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function World(props) {
  const { nodes, materials } = useGLTF(
    "/assets/cueva_encantada/models/world/CuevaEncantada.glb"
  );
  const { restarLifes } = useLifes();
  const [gameOver, setGameOver] = useState(false);
  const [gameOverShown, setGameOverShown] = useState(false);
  const navigate = useNavigate();

  const handleCollisionExits = (e) => {
    if (e.other.rigidBodyObject.name === "AVATAR") {
      navigate("/level2");
    }
  };

  const handleCollisionExit = (e) => {
    if (e.other.rigidBodyObject.name === "AVATAR") {
      restarLifes();
      window.location.reload();
    }
  };

  const handleReset = () => {
    setGameOver(false);
    setGameOverShown(false);
  };

  return (
    <group {...props} dispose={null}>
      <group>
        <RigidBody type="fixed" colliders="trimesh">
          <mesh
            onClick={(e) => e.stopPropagation()}
            receiveShadow={true}
            geometry={nodes.Floor.geometry}
            material={materials.floorMaterial}
          />
          <mesh
            onClick={(e) => e.stopPropagation()}
            receiveShadow={true}
            geometry={nodes.Bow.geometry}
            material={materials.bow}
          />
          <mesh
            onClick={(e) => e.stopPropagation()}
            receiveShadow={true}
            geometry={nodes.Caja.geometry}
            material={materials.Caja}
          />
          <mesh
            onClick={(e) => e.stopPropagation()}
            receiveShadow={true}
            geometry={nodes.Obst.geometry}
            material={materials.Obst}
          />
        </RigidBody>
        <RigidBody
          type="fixed"
          onCollisionEnter={handleCollisionExits}
          colliders="trimesh"
        >
          <mesh
            onClick={(e) => e.stopPropagation()}
            receiveShadow={true}
            geometry={nodes.piramy.geometry}
            material={materials.Texture}
          />
        </RigidBody>
      </group>
    </group>
  );
}

useGLTF.preload("/assets/cueva_encantada/models/world/CuevaEncantada.glb");
