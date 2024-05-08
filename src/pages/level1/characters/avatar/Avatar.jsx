import { useEffect, useRef } from "react";
import { useAvatar } from "../../../../context/AvatarContext";
import { useAnimations, useGLTF } from "@react-three/drei";
import Ecctrl, { EcctrlAnimation } from "ecctrl";

export default function Avatar() {
    const avatarRef = useRef();
    const rigidBodyAvatarRef = useRef();
    const { avatar,setAvatar} = useAvatar();
    const { nodes, materials, animations } = useGLTF('/assets/level1/models/avatar/comadreja.glb')

    const { actions } = useAnimations(animations, avatarRef)
    useEffect(() => {
        actions[avatar.animation]?.reset().fadeIn(0.5).play();
        return () => {
            if (actions[avatar.animation])
                actions[avatar.animation].fadeOut(0.5);
        }

    }, [actions, avatar.animation]);

    useEffect(()=>{
      setAvatar({
          ...avatar,
          avatarRef: avatarRef?.current,
          rigidBodyAvatarRef: rigidBodyAvatarRef?.current
      })
    }, [avatarRef?.current, rigidBodyAvatarRef?.current])

    return (
      
      <group ref={avatarRef} name="Scene" position-y={-0.65}>
      
      <group
        name="Armature"
        position={[0.004, 0.275, 0.042]}
        rotation={[3.016, 1.534, 1.655]}
        scale={0.08}>
        <group name="Cube">
          <skinnedMesh
            name="Cube004"
            geometry={nodes.Cube004.geometry}
            material={materials.Gray}
            skeleton={nodes.Cube004.skeleton}
          />
          <skinnedMesh
            name="Cube004_1"
            geometry={nodes.Cube004_1.geometry}
            material={materials['Lighter Gray']}
            skeleton={nodes.Cube004_1.skeleton}
          />
          <skinnedMesh
            name="Cube004_2"
            geometry={nodes.Cube004_2.geometry}
            material={materials.Black}
            skeleton={nodes.Cube004_2.skeleton}
          />
        </group>
        <primitive object={nodes.Bone} />
        
      </group>
    </group>
    
      )
      
}