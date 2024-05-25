import React, { useRef, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { useLifes } from '../../../context/ManagementLifes';
export default function Model(props) {
  
    const { nodes, materials } = useGLTF('/assets/level1/models/world/game.glb');
    const { restarLifes } = useLifes();
    // State to hold the current color
    const [color, setColor] = useState(new THREE.Color(0xffffff));

    // Function to change color periodicall
    useEffect(() => {
        const interval = setInterval(() => {
            setColor(new THREE.Color(Math.random(), Math.random(), Math.random()));
        }, 1000); // Change color every 1 second

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    const onCollisionExit = (e) => {
        if (e.other.rigidBodyObject.name === 'AVATAR') {
                 restarLifes();
                window.location.reload();
           
        }
    };

    return (
        <group {...props} dispose={null}>
            <group name="Scene">
                <RigidBody type="fixed" colliders="trimesh">
                    <mesh
                        name="Floor"
                        geometry={nodes.Floor.geometry}
                        material={materials['floorMaterial.001']}
                    />
                </RigidBody>
                <RigidBody type="fixed" colliders="trimesh">
                    <mesh
                        name="Walls"
                        geometry={nodes.Walls.geometry}
                        material={materials['wallMaterial.001']}
                    />
                </RigidBody>
                <mesh
                    name="tree"
                    geometry={nodes.tree.geometry}
                    material={materials['Material.001']}
                    position={[-1.521, -0.019, -2.767]}>
                    <mesh
                        name="leaves"
                        geometry={nodes.leaves.geometry}
                        material={materials['Material.002']}
                    />
                </mesh>
                <mesh
                    name="treef"
                    geometry={nodes.treef.geometry}
                    material={materials['Material.001']}
                    position={[-1.555, -0.066, -46.839]}>
                    <mesh
                        name="leaves001"
                        geometry={nodes.leaves001.geometry}
                        material={materials['Material.002']}
                    />
                </mesh>
                <mesh
                    name="treeg"
                    geometry={nodes.treeg.geometry}
                    material={materials['Material.001']}
                    position={[2.349, -0.164, -46.816]}>
                    <mesh
                        name="leaves002"
                        geometry={nodes.leaves002.geometry}
                        material={materials['Material.002']}
                    />
                </mesh>
                <mesh
                    name="treeh"
                    geometry={nodes.treeh.geometry}
                    material={materials['Material.001']}
                    position={[2.012, -0.053, -3.405]}>
                    <mesh
                        name="leaves003"
                        geometry={nodes.leaves003.geometry}
                        material={materials['Material.002']}
                    />
                </mesh>
                <mesh
                    name="treek"
                    geometry={nodes.treek.geometry}
                    material={materials['Material.001']}
                    position={[2.41, 0.148, -85.336]}>
                    <mesh
                        name="leaves004"
                        geometry={nodes.leaves004.geometry}
                        material={materials['Material.002']}
                    />
                </mesh>
                <mesh
                    name="treel"
                    geometry={nodes.treel.geometry}
                    material={materials['Material.001']}
                    position={[-2.111, 0.031, -83.528]}>
                    <mesh
                        name="leaves005"
                        geometry={nodes.leaves005.geometry}
                        material={materials['Material.002']}
                    />
                </mesh>
                <mesh
                    name="treem"
                    geometry={nodes.treem.geometry}
                    material={materials['Material.001']}
                    position={[-3.452, 0.037, -59.067]}>
                    <mesh
                        name="leaves006"
                        geometry={nodes.leaves006.geometry}
                        material={materials['Material.002']}
                    />
                </mesh>
                <mesh
                    name="treen"
                    geometry={nodes.treen.geometry}
                    material={materials['Material.001']}
                    position={[3.098, -0.005, -65.786]}>
                    <mesh
                        name="leaves007"
                        geometry={nodes.leaves007.geometry}
                        material={materials['Material.002']}
                    />
                </mesh>
                <mesh
                    name="polySurface10"
                    geometry={nodes.polySurface10.geometry}
                    material={materials.lambert1}
                    position={[0.133, -1.001, -96.5]}
                    rotation={[Math.PI / 2, 0, -3.084]}
                    scale={0.248}
                />
                <RigidBody type="fixed" onCollisionExit={onCollisionExit} colliders="trimesh">
                    <mesh
                        name="Hueco1"
                        geometry={nodes.Hueco1.geometry}
                        material={nodes.Hueco1.material}
                        position={[2.585, 0, -12.878]}
                        scale={2.456}
                    >
                        <meshStandardMaterial color={color} transparent opacity={1} />
                    </mesh>
                </RigidBody>

                <RigidBody type="fixed" colliders="trimesh" onCollisionExit={onCollisionExit}>
                    <mesh
                        name="Hueco2"
                        geometry={nodes.Hueco2.geometry}
                        material={nodes.Hueco2.material}
                        position={[2.582, 0, -30.435]}
                        scale={[2.43, 0.739, 3.087]}
                    >
                        <meshStandardMaterial color={color} transparent opacity={1} />
                    </mesh>
                </RigidBody>
                <RigidBody type="fixed" colliders="trimesh" onCollisionExit={onCollisionExit}>
                    <mesh
                        name="Hueco3"
                        geometry={nodes.Hueco3.geometry}
                        material={nodes.Hueco3.material}
                        position={[2.761, 0, -37.389]}
                        scale={[2.583, 1, 3.775]}
                    >
                        <meshStandardMaterial color={color} transparent opacity={1} />
                    </mesh>
                </RigidBody>
                <RigidBody type="fixed" colliders="trimesh" onCollisionExit={onCollisionExit}>
                    <mesh
                        name="Hueco5"
                        geometry={nodes.Hueco5.geometry}
                        material={nodes.Hueco5.material}
                        position={[2.322, 0, -54.279]}
                        scale={[2.48, 1.172, 2.857]}
                    >
                        <meshStandardMaterial color={color} transparent opacity={1} />
                    </mesh>
                </RigidBody>
                <RigidBody type="fixed" colliders="trimesh" onCollisionExit={onCollisionExit}>
                    <mesh
                        name="Hueco4"
                        geometry={nodes.Hueco4.geometry}
                        material={nodes.Hueco4.material}
                        position={[-2.468, 0, -47.958]}
                        scale={[2.63, 1, 3.238]}
                    >
                        <meshStandardMaterial color={color} transparent opacity={1} />
                    </mesh>
                </RigidBody>
                <RigidBody type="fixed" colliders="trimesh" onCollisionExit={onCollisionExit}>
                    <mesh
                        name="Hueco6"
                        geometry={nodes.Hueco6.geometry}
                        material={nodes.Hueco6.material}
                        position={[2.229, 0, -77.092]}
                        scale={[2.578, 1, 3.573]}
                    >
                        <meshStandardMaterial color={color} transparent opacity={1} />
                    </mesh>
                </RigidBody>
            </group>
        </group>
    );
}

useGLTF.preload("/assets/level1/models/world/game.glb");
