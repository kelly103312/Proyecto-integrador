import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useAvatar } from '../../../../context/AvatarContext';
import { useLifes } from '../../../../pages/level1/ManagementLifes';

export default function Avatar() {
  const modelRef = useRef();
  const { avatar, setAvatar } = useAvatar();
  const { nodes, materials, animations } = useGLTF('/assets/level1/models/avatar/fox.glb');
  const { actions } = useAnimations(animations, modelRef);
  const [protegerDisponible, setProtegerDisponible] = useState(true);
  const protectionRadius = 1.2; // Radio de la esfera de protección
  const [protegido, setProtegido] = useState(false);
  const { mantenerVidas } = useLifes(); // Obtener la función para mantener vidas

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
  }, []);

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

  return (
    <group ref={modelRef} dispose={null}>
      <group name="Scene">
        <group name="AVATAR" position={[0, -0.668, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[0.002, 0.002, 0.002]}>

          {/* Renderizado del modelo del avatar */}
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

        {/* Efecto de protección */}
        {protegido && (
          <mesh position={[0, 0.5, 0]}>
            <sphereGeometry args={[protectionRadius, 32, 32]} />
            <meshBasicMaterial color="cyan" transparent opacity={0.5} />
          </mesh>
        )}
      </group>
    </group>
  );
}

useGLTF.preload('/assets/level1/models/avatar/fox.glb');
