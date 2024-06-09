import { useEffect, useRef, useState } from "react";
import { useAvatar } from "../../../../context/AvatarContext";
import { useAnimations, useGLTF } from "@react-three/drei";
import Ecctrl from "ecctrl";
import * as THREE from 'three';
import { useAuth } from '../../../../context/AuthContext';
import { UseCheckpoints } from "../../../../context/ManagementCheckpoints";
import './Styles.css'
import { useLifes } from "../../../../context/ManagementLifes";
import { Html } from '@react-three/drei';

export default function Model(props) {
  const modelRef = useRef();
  const { avatar, setAvatar } = useAvatar();
  const { nodes, materials, animations } = useGLTF("/assets/level2/models/players/avatar.glb");
  const { actions } = useAnimations(animations, modelRef);
  const avatarRef = useRef();
  const { checkpoints, pointAchieved } = UseCheckpoints();
  const rigidBodyavatarRef = useRef();
  const auth = useAuth();
  const protectionRadius = 1.2;
  const [protegerDisponible, setProtegerDisponible] = useState(true);
  const [protegido, setProtegido] = useState(false);
  const { mantenerVidas } = useLifes();
  const [showModal, setShowModal] = useState(false);
  const [modalColor, setModalColor] = useState('');
  const [colorList] = useState(['#FF5733', '#33FF57', '#337AFF', '#FF33E9', '#FFE933']);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [protectionClicked, setProtectionClicked] = useState(false);

  



  useEffect(() => {
    if (auth.userLogged != null) {
      if (avatarRef.current) {
        let vec = new THREE.Vector3();
        avatarRef.current.getWorldPosition(vec)
        let distance = vec.distanceTo(new THREE.Vector3(0, 1, -60));
        const { displayName, email } = auth.userLogged;
        console.log(distance);
        if (distance < 80 && !checkpoints) {
          pointAchieved(vec, "level2", email, "AVATAR");
        }
      }
    }
  }, [auth.userLogged, checkpoints, pointAchieved]);

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
        setElapsedTime(0);
        setShowModal(true);
        setModalColor(getRandomColor());
        setProtectionClicked(true);

        
    const timer = setInterval(() => {
      setElapsedTime((prevTime) => {
        const newTime = prevTime + 1;
        if (newTime >= 15) {
          clearInterval(timer);
          setProtegido(false);
          setProtegerDisponible(true);
          console.log('Protección desactivada a las:', new Date().toLocaleTimeString());
          setShowModal(false);
          setProtectionClicked(false); // Reiniciar el estado para permitir otra activación
        }
        return newTime;
      });
    }, 1000);

        setTimeout(() => {
          setProtegido(false);
          setProtegerDisponible(true);
        }, 15000); // 15000 ms = 35 segundos
      }
    };

    const getRandomColor = () => {
      return colorList[Math.floor(Math.random() * colorList.length)];
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [protegerDisponible, mantenerVidas]);



  useEffect(() => {
    actions[avatar.animation]?.reset().fadeIn(0.5).play();
    return () => {
      if (actions[avatar.animation])
        actions[avatar.animation].fadeOut(0.5);
    };
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

          {protegido && (
        <mesh position={[0, 1, 0]}>
          <sphereGeometry args={[protectionRadius, 50,50]} />
          <meshBasicMaterial color="#ffdd00" transparent opacity={0.455555} />
        </mesh>
      )}
        </group>

        {showModal && (
        <Html position={[0, 2, 0]} style={{ color: modalColor }}>
          <div className="modal-message">{elapsedTime} </div>
        </Html>
      )}
   
      </group>

  );
}

useGLTF.preload("/assets/level2/models/players/avatar.glb");
