import { useGLTF } from "@react-three/drei"
import { CuboidCollider, CylinderCollider, RigidBody } from "@react-three/rapier"

export default function World(props) {
    const { nodes, materials } = useGLTF("/assets/cueva_encantada/models/world/CuevaEncantadaa.glb")

    return (
        <group {...props} dispose={null}>
            
            <group>
                <RigidBody type="fixed" colliders="trimesh">
                    <mesh onClick={(e) => e.stopPropagation()} receiveShadow={true} geometry={nodes.Floor.geometry} material={materials.floorMaterial} />
                    <mesh onClick={(e) => e.stopPropagation()} receiveShadow={true} geometry={nodes.Bow.geometry} material={materials.bow} />
                    <mesh onClick={(e) => e.stopPropagation()} receiveShadow={true} geometry={nodes.Caja.geometry} material={materials.Caja} />
                    <mesh onClick={(e) => e.stopPropagation()} receiveShadow={true} geometry={nodes.Punta.geometry} material={materials.Punta} />
                    <mesh onClick={(e) => e.stopPropagation()} receiveShadow={true} geometry={nodes.Obst.geometry} material={materials.Obst} />
                </RigidBody>
                
            </group>

        </group>
    );
}

useGLTF.preload("/assets/cueva_encantada/models/world/CuevaEncantadaa.glb");

