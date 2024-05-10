import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody, CuboidCollider, CylinderCollider } from '@react-three/rapier'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/assets/level1/models/world/game.glb')

  return (
    <group {...props} dispose={null}>
      <group>
        <RigidBody type="fixed" colliders="trimesh">
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Floor.geometry}
            material={materials['floorMaterial.001']}
          />
        </RigidBody>
        <RigidBody type="fixed" colliders="trimesh">
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Walls.geometry}
            material={materials['wallMaterial.001']}
          />
        </RigidBody>
        {/* Aquí está el código proporcionado */}
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree.geometry}
          material={materials['Material.001']}
          position={[-2.757, 0, 0]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.leaves.geometry}
            material={materials['Material.002']}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.treef.geometry}
          material={materials['Material.001']}
          position={[-2.027, 0.61, -46.839]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.leaves001.geometry}
            material={materials['Material.002']}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.treeg.geometry}
          material={materials['Material.001']}
          position={[2.793, 0.53, -46.816]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.leaves002.geometry}
            material={materials['Material.002']}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.treeh.geometry}
          material={materials['Material.001']}
          position={[3.434, 0.317, -0.338]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.leaves003.geometry}
            material={materials['Material.002']}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.treek.geometry}
          material={materials['Material.001']}
          position={[3.002, 0.148, -83.498]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.leaves004.geometry}
            material={materials['Material.002']}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.treel.geometry}
          material={materials['Material.001']}
          position={[-3.536, 0.125, -83.528]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.leaves005.geometry}
            material={materials['Material.002']}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.treem.geometry}
          material={materials['Material.001']}
          position={[-3.452, 0.037, -59.067]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.leaves006.geometry}
            material={materials['Material.002']}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.treen.geometry}
          material={materials['Material.001']}
          position={[3.775, 0.47, -59.37]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.leaves007.geometry}
            material={materials['Material.002']}
          />
        </mesh>
        <group position={[-0.005, 0.12, 0.014]} rotation={[3.123, 0, 0]} scale={0} />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.polySurface10.geometry}
          material={materials.lambert1}
          position={[0.16, -1.001, -96.5]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.248}
        />
      </group>
    </group>
  );
}
useGLTF.preload("/assets/level1/models/world/game.glb");
