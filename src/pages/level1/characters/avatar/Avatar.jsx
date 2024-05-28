import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useAvatar } from '../../../../context/AvatarContext';
import { CuboidCollider } from '@react-three/rapier'

export default function Model() {
    const modelRef = useRef();
    const { avatar, setAvatar } = useAvatar();
    const { nodes, materials, animations } = useGLTF('/assets/level1/models/avatar/fox.glb');
    const { actions } = useAnimations(animations, modelRef);

    useEffect(() => {
        actions[avatar.animation]?.reset().fadeIn(0.5).play();
        return () => {
            if (actions[avatar.animation]) actions[avatar.animation].fadeOut(0.5);
        };
    }, [actions, avatar.animation]);

    useEffect(() => {
        setAvatar({
            ...avatar,
            modelRef: modelRef.current,
        });
    }, [modelRef.current]);

    return (
      <group ref={modelRef}> {/* Add dispose={null} */}
        <group name="Scene">
        <group ref={modelRef} name="AVATAR" position={[0, -0.8, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[0.002, 0.002, 0.002]} colliders={"hull"}>

        <skinnedMesh
            name="MESH_CRASH001"
            geometry={nodes.MESH_CRASH001.geometry}
            material={materials['TEXTURE_Crash.001']}
            skeleton={nodes.MESH_CRASH001.skeleton}
            morphTargetDictionary={nodes.MESH_CRASH001.morphTargetDictionary}
            morphTargetInfluences={nodes.MESH_CRASH001.morphTargetInfluences}
          />
          <primitive object={nodes.mixamorigHips} />
        </group>
       
      </group>
    </group>
  );
}

useGLTF.preload('/assets/level1/models/avatar/fox.glb');