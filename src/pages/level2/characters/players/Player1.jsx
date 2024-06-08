import { useEffect, useRef, useState } from "react";
import { useAvatar } from "../../../../context/AvatarContext";
import { useAnimations, useGLTF } from "@react-three/drei";
import Ecctrl from "ecctrl";
import * as THREE from 'three';
import { useAuth } from '../../../../context/AuthContext';
import { UseCheckpoints } from "../../../../context/ManagementCheckpoints";

export default function Player1(props) {
  const player1Ref = useRef();
  const { avatar, setAvatar } = useAvatar();
  const { nodes, materials, animations } = useGLTF("/assets/level2/models/players/avatar.glb");
  const { actions } = useAnimations(animations, player1Ref)
  const avatarRef = useRef();
  const { checkpoints, pointAchieved } = UseCheckpoints();
  const auth = useAuth();

  useEffect(() => {
    if (auth.userLogged != null) {
      if (avatarRef.current) {
        let vec = new THREE.Vector3();
        avatarRef.current.getWorldPosition(vec)
        let distance = vec.distanceTo(new THREE.Vector3(0, 1, -60));
        const { displayName, email } = auth.userLogged;
        console.log(distance);
        if (distance < 10 && !checkpoints) {
          pointAchieved(vec, "level2", email, "AVATAR");
        }
      }
    }
  }, [auth.userLogged, checkpoints, pointAchieved]);

  useEffect(() => {
    actions[avatar.animation]?.reset().fadeIn(0.5).play();
    return () => {
      if (actions[avatar.animation])
        actions[avatar.animation].fadeOut(0.5);
    };
  }, [actions, avatar.animation]);


  return (


  
      <group ref={player1Ref} name="Scene" position-y={-0.9}>
        <group ref={avatarRef} name="Armature">
          <skinnedMesh
            name="EyeLeft"
            geometry={nodes.EyeLeft.geometry}
            material={materials.Wolf3D_Eye}
            skeleton={nodes.EyeLeft.skeleton}
            morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
            morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
          />
          <skinnedMesh
            name="EyeRight"
            geometry={nodes.EyeRight.geometry}
            material={materials.Wolf3D_Eye}
            skeleton={nodes.EyeRight.skeleton}
            morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
            morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
          />
          <skinnedMesh
            name="Wolf3D_Beard"
            geometry={nodes.Wolf3D_Beard.geometry}
            material={materials.Wolf3D_Beard}
            skeleton={nodes.Wolf3D_Beard.skeleton}
            morphTargetDictionary={nodes.Wolf3D_Beard.morphTargetDictionary}
            morphTargetInfluences={nodes.Wolf3D_Beard.morphTargetInfluences}
          />
          <skinnedMesh
            name="Wolf3D_Body"
            geometry={nodes.Wolf3D_Body.geometry}
            material={materials.Wolf3D_Body}
            skeleton={nodes.Wolf3D_Body.skeleton}
          />
          <skinnedMesh
            name="Wolf3D_Facewear"
            geometry={nodes.Wolf3D_Facewear.geometry}
            material={materials.Wolf3D_Facewear}
            skeleton={nodes.Wolf3D_Facewear.skeleton}
          />
          <skinnedMesh
            name="Wolf3D_Head"
            geometry={nodes.Wolf3D_Head.geometry}
            material={materials.Wolf3D_Skin}
            skeleton={nodes.Wolf3D_Head.skeleton}
            morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
            morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
          />
          <skinnedMesh
            name="Wolf3D_Headwear"
            geometry={nodes.Wolf3D_Headwear.geometry}
            material={materials.Wolf3D_Headwear}
            skeleton={nodes.Wolf3D_Headwear.skeleton}
          />
          <skinnedMesh
            name="Wolf3D_Outfit_Bottom"
            geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
            material={materials.Wolf3D_Outfit_Bottom}
            skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
          />
          <skinnedMesh
            name="Wolf3D_Outfit_Footwear"
            geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
            material={materials.Wolf3D_Outfit_Footwear}
            skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
          />
          <skinnedMesh
            name="Wolf3D_Outfit_Top"
            geometry={nodes.Wolf3D_Outfit_Top.geometry}
            material={materials.Wolf3D_Outfit_Top}
            skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
          />
          <skinnedMesh
            name="Wolf3D_Teeth"
            geometry={nodes.Wolf3D_Teeth.geometry}
            material={materials.Wolf3D_Teeth}
            skeleton={nodes.Wolf3D_Teeth.skeleton}
            morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
            morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
          />
          <primitive object={nodes.Hips} />
        </group>
      </group>

  );
}

useGLTF.preload("/assets/level2/models/players/avatar.glb");
