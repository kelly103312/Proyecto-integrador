import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Vector3, Quaternion, Euler } from 'three';
import { useLifes } from '../../../context/ManagementLifes';
import { useAvatar } from '../../../context/AvatarContext';

export function Model(props) {
    const group = useRef();
    const { avatar } = useAvatar(); // Acceso al contexto del avatar
    const { lifes, restarLifes } = useLifes(); // Acceso al contexto de vidas
    const { nodes, materials, animations } = useGLTF('./assets/level2/models/players/enemigo.glb');
    const { actions } = useAnimations(animations, group);
    const [currentAction, setCurrentAction] = useState('Walking'); // Animación inicial
    const [screamTriggered, setScreamTriggered] = useState(false); // Estado para controlar si ya se restó una vida

    useEffect(() => {
        actions[currentAction]?.reset().fadeIn(0.5).play();
        return () => {
            actions[currentAction]?.fadeOut(0.5);
        };
    }, [actions, currentAction]);

    useFrame(() => {    
        if (!group.current || !avatar.modelRef) return;

        const avatarPosition = new Vector3();
        avatar.modelRef.getWorldPosition(avatarPosition); // Obtener la posición del avatar

        const modelPosition = group.current.position.clone();
        const direction = avatarPosition.clone().sub(modelPosition).normalize(); // Dirección hacia el avatar

        // Actualizar la posición del modelo
        const speed = 0.05; // Velocidad de movimiento
        const movement = direction.clone().multiplyScalar(speed);
        modelPosition.add(movement);
        group.current.position.copy(modelPosition);

        // Calcular y aplicar la rotación hacia el avatar
        const targetQuaternion = new Quaternion();
        const euler = new Euler();
        euler.setFromVector3(new Vector3(0, Math.atan2(direction.x, direction.z), 0)); // Calcular la rotación en el eje Y
        targetQuaternion.setFromEuler(euler);
        group.current.quaternion.slerp(targetQuaternion, 0.1); // Interpolar suavemente hacia la nueva rotación

        // Cambiar a la animación "Scream" si está cerca del avatar y restar vidas
        if (modelPosition.distanceTo(avatarPosition) < 1) {
            if (!screamTriggered) {
                setCurrentAction('Scream');
                setScreamTriggered(true);
                if (lifes > 0) {
                    restarLifes();
                }
            }
        } else {
            setCurrentAction('Walking');
            setScreamTriggered(false); // Reiniciar el estado cuando el enemigo se aleja
        }
    });

    return (
        <group ref={group} {...props} dispose={null}>
        <group name="Scene">
          <group name="Empty001" />
          <group name="rig">
            <group name="base_BODY_low001">
              <skinnedMesh
                name="lowman_shoes001"
                geometry={nodes.lowman_shoes001.geometry}
                material={materials.rock}
                skeleton={nodes.lowman_shoes001.skeleton}
              />
              <skinnedMesh
                name="lowman_shoes001_1"
                geometry={nodes.lowman_shoes001_1.geometry}
                material={materials.LEATHER}
                skeleton={nodes.lowman_shoes001_1.skeleton}
              />
              <skinnedMesh
                name="lowman_shoes001_2"
                geometry={nodes.lowman_shoes001_2.geometry}
                material={materials['LIGHT EYE']}
                skeleton={nodes.lowman_shoes001_2.skeleton}
              />
              <skinnedMesh
                name="lowman_shoes001_3"
                geometry={nodes.lowman_shoes001_3.geometry}
                material={materials.light2}
                skeleton={nodes.lowman_shoes001_3.skeleton}
              />
            </group>
            <skinnedMesh
              name="bone_mini_extra002"
              geometry={nodes.bone_mini_extra002.geometry}
              material={materials.Metal}
              skeleton={nodes.bone_mini_extra002.skeleton}
            />
            <skinnedMesh
              name="bone_mini_extra003"
              geometry={nodes.bone_mini_extra003.geometry}
              material={materials.Metal}
              skeleton={nodes.bone_mini_extra003.skeleton}
            />
            <skinnedMesh
              name="claws_head001"
              geometry={nodes.claws_head001.geometry}
              material={materials.Metal}
              skeleton={nodes.claws_head001.skeleton}
            />
            <skinnedMesh
              name="claws_hip001"
              geometry={nodes.claws_hip001.geometry}
              material={materials.Metal}
              skeleton={nodes.claws_hip001.skeleton}
            />
            <skinnedMesh
              name="claws_mini_001"
              geometry={nodes.claws_mini_001.geometry}
              material={materials.Metal}
              skeleton={nodes.claws_mini_001.skeleton}
            />
            <skinnedMesh
              name="claws_mini001"
              geometry={nodes.claws_mini001.geometry}
              material={materials.Metal}
              skeleton={nodes.claws_mini001.skeleton}
            />
            <skinnedMesh
              name="CLAWS001"
              geometry={nodes.CLAWS001.geometry}
              material={materials.Metal}
              skeleton={nodes.CLAWS001.skeleton}
            />
            <skinnedMesh
              name="foot_bones001"
              geometry={nodes.foot_bones001.geometry}
              material={materials.Metal}
              skeleton={nodes.foot_bones001.skeleton}
            />
            <skinnedMesh
              name="hmb001"
              geometry={nodes.hmb001.geometry}
              material={materials.Metal}
              skeleton={nodes.hmb001.skeleton}
            />
            <skinnedMesh
              name="LEATHER002"
              geometry={nodes.LEATHER002.geometry}
              material={materials.LEATHER}
              skeleton={nodes.LEATHER002.skeleton}
            />
            <skinnedMesh
              name="LEATHER003"
              geometry={nodes.LEATHER003.geometry}
              material={materials.LEATHER}
              skeleton={nodes.LEATHER003.skeleton}
            />
            <skinnedMesh
              name="Mask003"
              geometry={nodes.Mask003.geometry}
              material={materials.Metal}
              skeleton={nodes.Mask003.skeleton}
            />
            <group name="Mask004">
              <skinnedMesh
                name="Cube014"
                geometry={nodes.Cube014.geometry}
                material={materials.Metal}
                skeleton={nodes.Cube014.skeleton}
              />
              <skinnedMesh
                name="Cube014_1"
                geometry={nodes.Cube014_1.geometry}
                material={materials['LIGHT EYE']}
                skeleton={nodes.Cube014_1.skeleton}
              />
              <skinnedMesh
                name="Cube014_2"
                geometry={nodes.Cube014_2.geometry}
                material={materials.light2}
                skeleton={nodes.Cube014_2.skeleton}
              />
            </group>
            <skinnedMesh
              name="rigth_bones001"
              geometry={nodes.rigth_bones001.geometry}
              material={materials.Metal}
              skeleton={nodes.rigth_bones001.skeleton}
            />
            <primitive object={nodes.root} />
            <primitive object={nodes['MCH-torsoparent']} />
            <primitive object={nodes['MCH-hand_ikparentL']} />
            <primitive object={nodes['MCH-upper_arm_ik_targetparentL']} />
            <primitive object={nodes['MCH-hand_ikparentR']} />
            <primitive object={nodes['MCH-upper_arm_ik_targetparentR']} />
            <primitive object={nodes['MCH-foot_ikparentL']} />
            <primitive object={nodes['MCH-thigh_ik_targetparentL']} />
            <primitive object={nodes['MCH-foot_ikparentR']} />
            <primitive object={nodes['MCH-thigh_ik_targetparentR']} />
          </group>
        </group>
      </group>
    );
}

useGLTF.preload('./assets/level2/models/players/enemigo.glb');
