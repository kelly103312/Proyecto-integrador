import { useGLTF } from "@react-three/drei"
import { CuboidCollider, CylinderCollider, RigidBody } from "@react-three/rapier"
import { useNavigate } from "react-router-dom";
import { useLifes } from "../../../context/ManagementLifes";


export default function World(props) {
    const { nodes, materials } = useGLTF("/assets/level2/models/world/WorldSquidGames.glb")
    const navigate = useNavigate();
    
    const handleCollisionExits = (e) => {
        if (e.other.rigidBodyObject.name === 'AVATAR') {
            
           
            navigate('/camino_al_atardecer');
        }
    };

    return (
        <group {...props} dispose={null}>

            <group>

                <RigidBody type="fixed" onCollisionEnter={handleCollisionExits} colliders="trimesh">

                <mesh geometry={nodes.Rock.geometry} material={materials.CaveRock_L_Base} />

                </RigidBody>

                <RigidBody type="fixed" colliders="trimesh">

                    <group>

                        <mesh onClick={(e) => e.stopPropagation()} receiveShadow={true} geometry={nodes.Floor.geometry} material={materials.floorMaterial}>
                            <meshStandardMaterial opacity={0.001} transparent={true} />
                        </mesh>

                        <mesh geometry={nodes.Valla.geometry} material={materials.DefaultMaterial} />

                        <group>
                            <group>
                                <mesh geometry={nodes.Laberinto_1.geometry} material={materials['suelo.005']} />
                                <mesh geometry={nodes.Laberinto_2.geometry} material={materials['Default.005']} />
                                <mesh geometry={nodes.Tronco.geometry} material={materials.lambert1} />
                                <mesh geometry={nodes.Escalera.geometry} material={materials.Stairs} />
                            </group>
                        </group>

                    </group>

                </RigidBody>

            </group>

        </group>
    );
}

useGLTF.preload("/assets/level2/models/world/WorldSquidGames.glb");

{/* <RigidBody colliders="trimesh" type="fixed" >
                    <mesh onClick={(e) => e.stopPropagation()} geometry={nodes.Tree008.geometry} material={materials.treeMaterial} position={[0, 0, 0]} />
                    <CylinderCollider args={[1, 0.5]} position={[0, 1, -96]} />
                </RigidBody> 

                <RigidBody colliders="trimesh" type="fixed">
                <mesh geometry={nodes.home004.geometry} material={materials.Material} />
                </RigidBody> */}

{/*  */ }
{/*  */ }