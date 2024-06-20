import { RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState  } from "react";
import { useAvatar } from "../../../../context/AvatarContext";
import Ecctrl from 'ecctrl'

export default function Avatar() {

  /*const avatarRef = useRef();
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
  );*/
  const [avatar, setAvatar] = useState([0,1,140]);
  const avatarRef = useRef()

  
  return (
      <>
          <Ecctrl 
              jumpVel={4}
              name="AVATAR" 
              autoBalance = {true}
              camInitDis = {-10}
              camMaxDis = {-10}
              position={avatar}
              maxVelLimit={10}
              onChangePosition={setAvatar}
          >
              <mesh ref={avatarRef} >
                <boxGeometry args={[2, 2, 2]} />
                <meshStandardMaterial color="red" />
              </mesh>
          </Ecctrl>
      </>
  )

}
