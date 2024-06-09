import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, useAnimations, Html } from '@react-three/drei';
import { useAvatar } from '../../../../context/AvatarContext';
import { useLifes } from '../../../../context/ManagementLifes';
import './styles.css';
import * as THREE from 'three';
import { UseCheckpoints } from "../../../../context/ManagementCheckpoints";
import { useAuth } from '../../../../context/AuthContext';

export default function Avatar() {
  const modelRef = useRef();
  const avatarRef = useRef();
  const { avatar, setAvatar } = useAvatar();
  const { nodes, materials, animations } = useGLTF('/assets/level1/models/avatar/fox.glb');
  const { actions } = useAnimations(animations, modelRef); // Obtener el mixer para manejar las animaciones
  const { mantenerVidas } = useLifes();
  const [protegerDisponible, setProtegerDisponible] = useState(true);
  const [protegido, setProtegido] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalColor, setModalColor] = useState('');
  const [colorList] = useState(['#FF5733', '#33FF57', '#337AFF', '#FF33E9', '#FFE933']);
  const [protectionClicked, setProtectionClicked] = useState(false);
  const { checkpoints, pointAchieved } = UseCheckpoints();
  const auth = useAuth();

  // Checkpoint logic
  useEffect(() => {
    if (avatarRef.current) {
      let vec = new THREE.Vector3();
      avatarRef.current.getWorldPosition(vec);
      let distance = vec.distanceTo(new THREE.Vector3(0, 3, -92));
      const { displayName, email } = auth.userLogged || {};
      console.log(distance);
      if (distance < 80 && !checkpoints) {
        pointAchieved(vec, "level1", email, "AVATAR");
      }
    }
  }, [auth.userLogged, checkpoints, pointAchieved]);

  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 't') {
        activarProteccion();
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
  }, [modelRef.current, setAvatar])


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
    <group ref={modelRef} dispose={null}>
      <group name="Scene">
        <group ref={avatarRef} name="AVATAR" position={[0, -0.668, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[0.002, 0.002, 0.002]}>
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

        {protegido && (
          <mesh position={[0, 0.5, 0]}>
            <sphereGeometry args={[1.2, 32, 32]} />
            <meshBasicMaterial color="cyan" transparent opacity={0.5} />
          </mesh>
        )}
      </group>

      {showModal && (
        <Html position={[0, 2, 0]} style={{ color: modalColor }}>
          <div className="modal-message">{elapsedTime}</div>
        </Html>
      )}
    </group>
  );
}

useGLTF.preload('/assets/level1/models/avatar/fox.glb');
