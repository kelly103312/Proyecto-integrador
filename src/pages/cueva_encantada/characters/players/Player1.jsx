import { useEffect, useRef } from "react";
import { useAvatar } from "../../../../context/AvatarContext";
import { useAnimations, useGLTF } from "@react-three/drei";
import Ecctrl from "ecctrl";

export default function Player({ vida }) {
  const playerRef = useRef();
  const rigidBodyPlayerRef = useRef();
  const { avatar, setAvatar } = useAvatar();
  const { nodes, materials, animations } = useGLTF("/assets/cueva_encantada/models/players/Avatarplop.glb");
  const { actions } = useAnimations(animations, playerRef);

  // Efecto para manejar la lógica cuando la vida del jugador es <= 0
  useEffect(() => {
    if (vida <= 0) {
      // Verifica si rigidBodyPlayerRef.current está definido antes de llamar a métodos
      if (rigidBodyPlayerRef.current) {
        rigidBodyPlayerRef.current.setTranslation(
          {
            x: 20,
            y: 5,
            z: -30,
          },
          true
        );
        // Aquí podrías necesitar alguna lógica adicional para reiniciar el estado del jugador
      }
    }
  }, [vida]);

  // Efecto para manejar las animaciones del jugador
  useEffect(() => {
    // Verifica si actions[avatar.animation] está definido antes de usarlo
    if (actions[avatar.animation]) {
      actions[avatar.animation].reset().fadeIn(0.5).play();
      return () => {
        actions[avatar.animation].fadeOut(0.5);
      };
    }
  }, [actions, avatar.animation]);

  // Asigna las referencias playerRef.current y rigidBodyPlayerRef.current al avatar
  useEffect(() => {
    setAvatar({
      ...avatar,
      playerRef: playerRef?.current,
      rigidBodyPlayerRef: rigidBodyPlayerRef?.current,
    });
  }, [playerRef?.current, rigidBodyPlayerRef?.current]);

  return (
    <Ecctrl
      ref={rigidBodyPlayerRef}
      camInitDis={-2}
      camMaxDis={-2}
      maxVelLimit={6}
      jumpVel={5}
      position={[0, 10, 0]}
    >
      <group ref={playerRef} name="Scene" position-y={-0.9}>
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
            name="Wolf3D_Body"
            geometry={nodes.Wolf3D_Body.geometry}
            material={materials.Wolf3D_Body}
            skeleton={nodes.Wolf3D_Body.skeleton}
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
  );
}

useGLTF.preload("/assets/cueva_encantada/models/players/Avatarplop.glb");
