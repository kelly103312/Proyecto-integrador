import { RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import { useAvatar } from "../../../../context/AvatarContext";

export default function Avatar() {

  const avatarRef = useRef();
  const avatarBodyRef = useRef();
  const {avatar, setAvatar} = useAvatar();

  useEffect(() => {
    setAvatar({
        ref: avatarRef.current,
        bodyRef: avatarBodyRef.current
    })
    },[avatarRef.current, avatarBodyRef.current])


  return (
    <RigidBody ref={avatarBodyRef} position={[0, 1, 140]} colliders="cuboid" type="dynamic">
      <mesh ref={avatarRef} >
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </RigidBody>
  );
}
