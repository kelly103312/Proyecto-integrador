import { useEffect, useRef, useState } from "react";
import { useAvatar } from "../../../../context/AvatarContext";
import { useAnimations, useGLTF } from "@react-three/drei";
import { UseCheckpoints } from "../../../../context/ManagementCheckpoints";
import { useLifes } from "../../../../context/ManagementLifes";
import * as THREE from 'three';
import { useAuth } from '../../../../context/AuthContext';

export default function Model({ props }) {
  const modelRef = useRef();
  const { avatar, setAvatar } = useAvatar();
  const { nodes, materials, animations } = useGLTF("/assets/cueva_encantada/models/players/Avatarplop.glb");
  const { actions } = useAnimations(animations, modelRef);
  const avatarRef = useRef();
  const { checkpoints, pointAchieved } = UseCheckpoints();
  const [protegerDisponible, setProtegerDisponible] = useState(true);
  const protectionRadius = 1.2; // Radio de la esfera de protección
  const [protegido, setProtegido] = useState(false);
  const { mantenerVidas } = useLifes(); // Obtener la función para mantener vidas
  const auth = useAuth();

  if(auth.userLogged != null){
    let vec= new THREE.Vector3();
    avatarRef.current.getWorldPosition(vec)
    let distance =vec.distanceTo(new THREE.Vector3(0,1,-60));
    const { displayName, email } = auth.userLogged
    console.log(distance)
    if(distance < 10 && !checkpoints){
      pointAchieved(vec,"cueva_encantada",email,"AVATAR")
    }
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 't') {
        activarProteccion();
      }
    };

    const activarProteccion = () => {
      if (protegerDisponible) {
        setProtegido(true);
        setProtegerDisponible(false);
        mantenerVidas(); // Activar la protección

        setTimeout(() => {
          setProtegido(false);
          setProtegerDisponible(true);
        }, 60000); // 60000 ms = 60 segundos
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [protegerDisponible, mantenerVidas]);

  useEffect(() => {
    if (actions[avatar.animation]) {
      actions[avatar.animation].reset().fadeIn(0.5).play();
      return () => {
        actions[avatar.animation].fadeOut(0.5);
      };
    }
  }, [actions, avatar.animation]);

  useEffect(() => {
    setAvatar({
      ...avatar,
      modelRef: modelRef?.current,
    });
  }, [modelRef.current, setAvatar]);

  return (
    <group ref={modelRef} name="Scene" position-y={-0.9}>
      <group ref={avatarRef} name="AVATAR">
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
      {/* Efecto de protección */}
      {protegido && (
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[protectionRadius, 32, 32]} />
          <meshBasicMaterial color="cyan" transparent opacity={0.5} />
        </mesh>
      )}
    </group>
  );
}

useGLTF.preload("/assets/cueva_encantada/models/players/Avatarplop.glb");
