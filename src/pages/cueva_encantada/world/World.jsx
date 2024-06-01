import { useGLTF } from "@react-three/drei"
import { CuboidCollider, CylinderCollider, RigidBody } from "@react-three/rapier"
import { useLifes } from "../../../context/ManagementLifes";
import { useState } from "react";

export default function World(props) {
    const { nodes, materials } = useGLTF("/assets/cueva_encantada/models/world/CuevaEncantadaa.glb")
    const { restarLifes } = useLifes();
    const [gameOver, setGameOver] = useState(false);
    const [gameOverShown, setGameOverShown] = useState(false);

    const handleCollisionExit = (e) => {
        if (e.other.rigidBodyObject.name === 'PLAYERS') {
            restarLifes();
            window.location.reload();
        }
    };

    const handleReset = () => {
        // Aquí puedes agregar lógica adicional de reinicio si es necesario
        // Por ejemplo, restablecer el estado de gameOver y gameOverShown
        setGameOver(false);
        setGameOverShown(false);
    };


    return (
        <group {...props} dispose={null}>
            
            <group>
                <RigidBody type="fixed" colliders="trimesh">
                    <mesh onClick={(e) => e.stopPropagation()} receiveShadow={true} geometry={nodes.Floor.geometry} material={materials.floorMaterial} />
                    <mesh onClick={(e) => e.stopPropagation()} receiveShadow={true} geometry={nodes.Bow.geometry} material={materials.bow} />
                    <mesh onClick={(e) => e.stopPropagation()} receiveShadow={true} geometry={nodes.Caja.geometry} material={materials.Caja} />
                    <mesh onClick={(e) => e.stopPropagation()} receiveShadow={true} geometry={nodes.Obst.geometry} material={materials.Obst} />
                </RigidBody>
                
            </group>

        </group>
    );
}

useGLTF.preload("/assets/cueva_encantada/models/world/CuevaEncantadaa.glb");

