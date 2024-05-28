import React, { useEffect, useState, useRef } from 'react';
import { useGLTF,useTexture } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { useLifes } from '../../../context/ManagementLifes';
import { useNavigate } from 'react-router-dom';
import { RepeatWrapping } from "three";

export default function Model(props) {
    const { nodes, materials } = useGLTF('/assets/level1/models/world/game.glb');
    
    const navigate = useNavigate();
    const group = useRef();
    const [color, setColor] = useState(new THREE.Color(0xffffff));
    const object1 = useRef(null);
    const { restarLifes } = useLifes();
    const [gameOver, setGameOver] = useState(false);
    const [gameOverShown, setGameOverShown] = useState(false);
    const PATH = '/assets/level1/models/floor/';

    const propsTexture = useTexture({
        map: PATH + "aerial_rocks_02_diff_4k.jpg",
        normalMap: PATH + "aerial_rocks_02_nor_dx_4k.jpg",
        roughnessMap: PATH + "aerial_rocks_02_rough_4k.jpg",
        displacementMap: PATH + "aerial_rocks_02_disp_4k.jpg",
    });


    propsTexture.map.repeat.set(4, 120);
    propsTexture.map.wrapS = propsTexture.map.wrapT = RepeatWrapping;

    propsTexture.normalMap.repeat.set(4, 120);
    propsTexture.normalMap.wrapS = propsTexture.normalMap.wrapT = RepeatWrapping;

    propsTexture.displacementMap.repeat.set(4, 120);
    propsTexture.displacementMap.wrapS = propsTexture.displacementMap.wrapT = RepeatWrapping;

    propsTexture.roughnessMap.repeat.set(4, 120);
    propsTexture.roughnessMap.wrapS = propsTexture.roughnessMap.wrapT = RepeatWrapping;


    
    useEffect(() => {
        const interval = setInterval(() => {
            setColor(new THREE.Color(Math.random(), Math.random(), Math.random()));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    

    const handleCollisionExit = (e) => {
        if (e.other.rigidBodyObject.name === 'AVATAR') {
            restarLifes();
            window.location.reload();
        }
    };

    const handleCollisionExits = (e) => {
        if (e.other.rigidBodyObject.name === 'AVATAR') {
            
           
            navigate('/cueva_encantada');
        }
    };

    const handleReset = () => {
        // Aquí puedes agregar lógica adicional de reinicio si es necesario
        // Por ejemplo, restablecer el estado de gameOver y gameOverShown
        setGameOver(false);
        setGameOverShown(false);
    };



    return (
        <group ref={group} {...props} dispose={null}>
            
            <group name="Scene">
                <RigidBody type="fixed" colliders="trimesh">
                    <mesh
                        name="walls"
                        geometry={nodes.walls.geometry}
                        
                    >
                <meshStandardMaterial {...propsTexture} opacity={0} transparent={false} />
                </mesh>
                </RigidBody>
                <RigidBody type="fixed" colliders="trimesh">
                <mesh name="floor" geometry={nodes.floor.geometry} position={[0, 0.857, 0]}>
                <meshStandardMaterial {...propsTexture} opacity={1} transparent={false} />
               </mesh>
               </RigidBody>

                <mesh
                    name="tree1"
                    geometry={nodes.tree1.geometry}
                    material={materials['Material.003']}
                    position={[-7.731, -0.053, 64.495]}>
                    <mesh
                        name="leaves001"
                        geometry={nodes.leaves001.geometry}
                        material={materials['Material.004']}
                    />
                </mesh>
                <mesh
                    name="tree2"
                    geometry={nodes.tree2.geometry}
                    material={materials['Material.005']}
                    position={[8.137, -0.053, 75.199]}>
                    <mesh
                        name="leaves002"
                        geometry={nodes.leaves002.geometry}
                        material={materials['Material.006']}
                    />
                </mesh>
                <mesh
                    name="tree4"
                    geometry={nodes.tree4.geometry}
                    material={materials['Material.009']}
                    position={[7.475, -0.053, 43.76]}>
                    <mesh
                        name="leaves005"
                        geometry={nodes.leaves005.geometry}
                        material={materials['Material.010']}
                    />
                </mesh>
                <mesh
                    name="tree3"
                    geometry={nodes.tree3.geometry}
                    material={materials['Material.013']}
                    position={[7.692, -0.053, 57.852]}>
                    <mesh
                        name="leaves003"
                        geometry={nodes.leaves003.geometry}
                        material={materials['Material.014']}
                        position={[-0.073, 0, 0]}
                    />
                </mesh>
                <mesh
                    name="tree5"
                    geometry={nodes.tree5.geometry}
                    material={materials['Material.015']}
                    position={[-8.374, -0.053, 85.016]}>
                    <mesh
                        name="leaves004"
                        geometry={nodes.leaves004.geometry}
                        material={materials['Material.016']}
                        position={[0.288, 0, 0.011]}
                    />
                </mesh>
                <mesh
                    name="tree6"
                    geometry={nodes.tree6.geometry}
                    material={materials['Material.018']}
                    position={[-6.468, -0.053, 51.832]}>
                    <mesh
                        name="leaves006"
                        geometry={nodes.leaves006.geometry}
                        material={materials['Material.017']}
                        position={[-0.073, 0, 0]}
                    />
                </mesh>
                <mesh
                    name="tree9"
                    geometry={nodes.tree9.geometry}
                    material={materials['Material.019']}
                    position={[7.39, -0.053, 91.4]}>
                    <mesh
                        name="leaves007"
                        geometry={nodes.leaves007.geometry}
                        material={materials['Material.020']}
                        position={[-0.073, 0, 0]}
                    />
                </mesh>
                <RigidBody type="fixed" colliders="trimesh">
                    <mesh
                        name="Cylinder"
                        geometry={nodes.Cylinder.geometry}
                        material={materials['Material.041']}
                        position={[0, 0.863, 0]}
                        rotation={[0, 0, 1.587]}
                        scale={[1, 10, 1]}
                    />
                </RigidBody>
                <RigidBody type="fixed" colliders="trimesh">
                    <mesh
                        name="Cylinder1"
                        geometry={nodes.Cylinder1.geometry}
                        material={materials['Material.040']}
                        position={[0, 0.863, 16.088]}
                        rotation={[0, 0, 1.587]}
                        scale={[1, 10, 1]}
                    />
                </RigidBody>
                <RigidBody type="fixed" colliders="trimesh">
                    <mesh
                        name="Cylinder2"
                        geometry={nodes.Cylinder2.geometry}
                        material={materials['Material.042']}
                        position={[0, 1.004, -13.036]}
                        rotation={[0, 0, 1.587]}
                        scale={[1, 10, 1]}
                    />
                </RigidBody>
                <RigidBody type="fixed" colliders="trimesh">
                    <mesh
                        name="Cylinder001"
                        geometry={nodes.Cylinder001.geometry}
                        material={materials['Material.043']}
                        position={[0, 0.863, -24.082]}
                        rotation={[0, 0, 1.587]}
                        scale={[1, 10, 1]}
                    />
                </RigidBody>
                <RigidBody type="fixed" colliders="trimesh">
                    <mesh
                        name="Cylinder3"
                        geometry={nodes.Cylinder3.geometry}
                        material={materials['Material.044']}
                        position={[0, 0.863, -42.186]}
                        rotation={[0, 0, 1.587]}
                        scale={[1, 10, 1]}
                    />
                </RigidBody>
                <mesh
                    name="tree7"
                    geometry={nodes.tree7.geometry}
                    material={materials['Material.021']}
                    position={[-7.37, -0.053, 93.101]}>
                    <mesh
                        name="leaves008"
                        geometry={nodes.leaves008.geometry}
                        material={materials['Material.022']}
                        position={[-0.073, 0, 0]}
                    />
                </mesh>
                <mesh
                    name="tree10"
                    geometry={nodes.tree10.geometry}
                    material={materials['Material.025']}
                    position={[-8.026, -0.053, 43.76]}>
                    <mesh
                        name="leaves009"
                        geometry={nodes.leaves009.geometry}
                        material={materials['Material.026']}
                    />
                </mesh>
                <mesh
                    name="tree11"
                    geometry={nodes.tree11.geometry}
                    material={materials['Material.027']}
                    position={[-8.276, -0.053, 26.481]}>
                    <mesh
                        name="leaves010"
                        geometry={nodes.leaves010.geometry}
                        material={materials['Material.028']}
                    />
                </mesh>
                <mesh
                    name="tree12"
                    geometry={nodes.tree12.geometry}
                    material={materials['Material.029']}
                    position={[7.561, -0.053, 26.481]}>
                    <mesh
                        name="leaves011"
                        geometry={nodes.leaves011.geometry}
                        material={materials['Material.030']}
                    />
                </mesh>
                <RigidBody  type="fixed" onCollisionEnter={handleCollisionExits} colliders="trimesh">
                    <mesh
                        name="polySurface10"
                        geometry={nodes.polySurface10.geometry}
                        material={materials.lambert1}
                        position={[0.133, -1.001, -96.288]}
                        rotation={[Math.PI / 2, 0, -3.084]}
                        scale={0.248}
                    />
                    
                </RigidBody>
                <RigidBody type="fixed" colliders="trimesh">
                    <mesh
                        name="Cylinder4"
                        geometry={nodes.Cylinder4.geometry}
                        material={materials['Material.045']}
                        position={[0, 0.863, -65.509]}
                        rotation={[0, 0, 1.587]}
                        scale={[1, 10, 1]}
                    />
                </RigidBody>
                <RigidBody type="fixed"  colliders="trimesh">
                    <mesh
                        name="Cylinder5"
                        geometry={nodes.Cylinder5.geometry}
                        material={materials['Material.046']}
                        position={[0, 0.863, -85.014]}
                        rotation={[0, 0, 1.587]}
                        scale={[1, 10, 1]}
                    />
                </RigidBody>
            </group>
        </group>
    );
}

useGLTF.preload('/assets/level1/models/world/game.glb');
