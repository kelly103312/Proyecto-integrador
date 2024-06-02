import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import React from "react"

export default function Villain1A(props) {
    const Villain1ARef = useRef(null)
    const { nodes, materials } = useGLTF('./public/assets/camino_al_atardecer/models/villains/Villain1A.glb')

    const radius = 3.5
    const speed = 1.5

    useFrame((state, delta) => {
        const elapsedTime = state.clock.getElapsedTime()
        const angle = elapsedTime * speed 
        const x = Math.cos(angle) * radius 
        const z = Math.sin(angle) * radius 

        Villain1ARef.current.position.set(props.position[0] + x, props.position[1], props.position[2] + z)
        Villain1ARef.current.rotation.y = -angle 
    })

    return (
      <group {...props} ref={Villain1ARef} dispose={null}>
        <group name="Scene">
          <group name="Rigid">
            <skinnedMesh
              name="Villain1A"
              castShadow
              receiveShadow
              geometry={nodes.vilain1A.geometry}
              material={materials.villainMaterial}
            />
            <primitive object={nodes.root} />
          </group>
        </group>
      </group>
    );
}

useGLTF.preload('../../../../public/camino_al_atardecer/models/villains/villain1A.glb')