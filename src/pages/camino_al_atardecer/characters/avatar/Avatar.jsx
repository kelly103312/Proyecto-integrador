import { useEffect, useRef, useState } from "react";
import { useAvatar } from "../../../../context/AvatarContext";
import Ecctrl from "ecctrl";
import { useAnimations, useGLTF } from "@react-three/drei";

export default function Avatar() {
  const { avatar, setAvatar } = useAvatar();
  const avatarRef = useRef();
  const avatarBodyRef = useRef();
  const { nodes, materials, animations } = useGLTF('/assets/camino_al_atardecer/models/avatar/Avatar.glb');
  const { actions } = useAnimations(animations, avatarRef);

  useEffect(() => {
    if (avatar.animation && actions[avatar.animation]) {
      actions[avatar.animation]?.reset().fadeIn(0.5).play();
      return () => {
        if (actions[avatar.animation]) actions[avatar.animation].fadeOut(0.5);
      };
    }
  }, [actions, avatar.animation]);

  return (
    <>
      <Ecctrl
        jumpVel={10}
        name="AVATAR"
        autoBalance={true}
        camInitDis={-8}
        camMaxDis={-15}
        position={avatar.position}
        maxVelLimit={17}
        onChangePosition={(pos) => setAvatar({ ...avatar, position: pos })}
        height={6} // Ajusta esta altura según tus necesidades
        camCollisionOffset={0.7}

      >
        <group ref={avatarRef} scale={[2,2,2]} position-y={-0.8} name="Scene" > 
          <group name="Armature">
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
              name="Wolf3D_Glasses"
              geometry={nodes.Wolf3D_Glasses.geometry}
              material={materials.Wolf3D_Glasses}
              skeleton={nodes.Wolf3D_Glasses.skeleton}
            />
            <skinnedMesh
              name="Wolf3D_Hair"
              geometry={nodes.Wolf3D_Hair.geometry}
              material={materials.Wolf3D_Hair}
              skeleton={nodes.Wolf3D_Hair.skeleton}
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
      </Ecctrl>
    </>
  );
}
