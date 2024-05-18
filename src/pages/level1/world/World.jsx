import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody, CuboidCollider, CylinderCollider } from '@react-three/rapier'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/assets/level1/models/world/game.glb')

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
        {/* Aquí está el código proporcionado */}
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
        <group name="group" position={[-0.005, 0.12, 0.014]} rotation={[3.123, 0, 0]} scale={0} />
        <mesh
          name="polySurface10"
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
