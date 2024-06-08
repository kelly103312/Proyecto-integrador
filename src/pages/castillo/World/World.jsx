import { useGLTF } from '@react-three/drei'
import { CylinderCollider, RigidBody } from '@react-three/rapier'
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export const World = (props) => {
    const { nodes, materials } = useGLTF('/assets/castillo/world/World.glb')

    const navigate = useNavigate();
    const onCollisionExit = (e) =>{
      if(e.other.rigidBodyObject.name === "AVATAR"){
        navigate('/level1');
      }
    }
    return (
      <group {...props} dispose={null}>
        <group>
          <RigidBody type='fixed' name="floor" colliders="trimesh">
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Floor.geometry}
                material={materials.floormaterial}
              />
          </RigidBody>

          <RigidBody type='fixed' colliders="trimesh" name="walls">
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Walls.geometry}
              material={materials.wallsMaterial}
            />
          </RigidBody>
          <RigidBody type='fixed' colliders="trimesh" name="table" onCollisionExit={(e)=>{onCollisionExit(e)}}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Mesa.geometry}
              material={materials.mesamaterial}
            />
          </RigidBody>
        </group>
      </group>
    )
}
useGLTF.preload('/assets/castillo/world/World.glb')