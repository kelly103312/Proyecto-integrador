import React, { useEffect, useRef, useState } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useAvatar } from '../../../context/AvatarContext'
import * as THREE from 'three';
import { UseCheckpoints } from '../../../context/ManagementCheckpoints';
import { useAuth } from '../../../context/AuthContext';
import { createCheckpoint, readCheckpoint } from '../../../db/checkpoints-collection';
import './AvatarStyless.css';
import { useLifes } from '../../../context/ManagementLifes';

export const AvatarPrincipal = (props) => {
  const avatarBodyRef = useRef()
  const avatarRef = useRef()
  const {avatar,setAvatar} = useAvatar();
  const {checkpoints, pointAchieved} = UseCheckpoints();
  const { nodes, materials, animations } = useGLTF('/assets/castillo/avatars/ardilla.glb')
  const { mantenerVidas } = useLifes();
  const {actions} = useAnimations(animations,avatarRef)
  const auth = useAuth()
  const [protegido, setProtegido] = useState(false);
  const [protegerDisponible, setProtegerDisponible] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalColor, setModalColor] = useState('');
  const [colorList] = useState(['#FF5733', '#33FF57', '#337AFF', '#FF33E9', '#FFE933']);
  const [protectionClicked, setProtectionClicked] = useState(false); // Estado para controlar si se ha hecho clic en la protección

  useEffect(()=>{
    actions["idle"].play();
    
  },[])

  useEffect(()=>{
    if(avatar.animation !== ""){
      actions[avatar.animation]?.reset().fadeIn(0.5).play();
      if(avatar.animation == "attack"){
        setAvatar({...avatar,"ref":avatarRef})
      }
      return()=>{
        if(actions[avatar.animation]){
            actions[avatar.animation].fadeOut(0.5);
        }
      }
    }
  },[avatar.animation,actions])

  
  useEffect(()=>{
    let vec= new THREE.Vector3();
    avatarRef.current.getWorldPosition(vec)
    let distance =vec.distanceTo(new THREE.Vector3(0,1,-60));
    const { displayName, email } = auth.userLogged
    //console.log(distance)
    if(distance < 2.2 && !checkpoints){
      pointAchieved(vec,"Castillo",email,"Ardilla")
    }

  })

  useEffect(() => {
    setAvatar({
      ...avatar,
      modelRef: avatarRef.current,
    });
  }, [avatarRef.current]);

  useEffect(() => {
   console.log("Clicked t")
    const handleKeyDown = (event) => {
      if (event.key === 't' && !protectionClicked) {
        activarProteccion();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [protectionClicked]);

  const activarProteccion = () => {
    console.log('Protección activada a las:', new Date().toLocaleTimeString());
    setProtegido(true);
    setProtegerDisponible(false);
    mantenerVidas();
    setElapsedTime(0);
    setShowModal(true);
    setModalColor(getRandomColor());
    setProtectionClicked(true);

    const timer = setInterval(() => {
      setElapsedTime((prevTime) => {
        const newTime = prevTime + 1;
        if (newTime >= 60) {
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
  };

  const getRandomColor = () => {
    return colorList[Math.floor(Math.random() * colorList.length)];
  };

  return (
    <group ref={avatarRef}  rotation={[Math.PI / 2, 0, 0]} position-y={-0.8}>
      <group name="Scene">
        <group name="Armature" scale={0.008}>
          <skinnedMesh
            name="Body"
            geometry={nodes.Body.geometry}
            material={materials.cuerpo}
            skeleton={nodes.Body.skeleton}
          />
          <skinnedMesh
            name="eye_L"
            geometry={nodes.eye_L.geometry}
            material={materials['body.001']}
            skeleton={nodes.eye_L.skeleton}
          />
          <skinnedMesh
            name="eye_R"
            geometry={nodes.eye_R.geometry}
            material={materials['body.001']}
            skeleton={nodes.eye_R.skeleton}
          />
          <skinnedMesh
            name="lower_teeh"
            geometry={nodes.lower_teeh.geometry}
            material={materials['TeethMat.001']}
            skeleton={nodes.lower_teeh.skeleton}
          />
          <skinnedMesh
            name="middle_teeth"
            geometry={nodes.middle_teeth.geometry}
            material={materials['TeethMat.001']}
            skeleton={nodes.middle_teeth.skeleton}
          />
          <skinnedMesh
            name="tongue"
            geometry={nodes.tongue.geometry}
            material={materials['TongueMat.001']}
            skeleton={nodes.tongue.skeleton}
          />
          <skinnedMesh
            name="upper_teeth"
            geometry={nodes.upper_teeth.geometry}
            material={materials['TeethMat.001']}
            skeleton={nodes.upper_teeth.skeleton}
          />
          <primitive object={nodes.mixamorigHips} />
        </group>
      </group>
      {protegido && (
          <mesh position={[0, 0.2, -0.5]}>
            <sphereGeometry args={[2, 32, 32]} />
            <meshBasicMaterial color="cyan" transparent opacity={0.5} />
          </mesh>
        )}
    </group>
    
  )
}
useGLTF.preload('/assets/castillo/avatars/ardilla.glb')
