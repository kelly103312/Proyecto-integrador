import React, { useEffect, useRef, useState } from 'react'
import { Bear } from './Bear'
import { AvatarPrincipal } from './AvatarPrincipal'
import Ecctrl from 'ecctrl'
import { useFrame } from '@react-three/fiber'
export const Charaters = () => {
    const [avatar, setAvatar] = useState([0,0.5,-3]);
    const [bear, setBear] = useState([-1, 0, -80]);
    const bearRef = useRef()
    const avatarRef = useRef()

    const handleAttack = () => {
        console.log("El avatar 1 está atacando al avatar 2");
        // Aquí puedes realizar cualquier lógica de ataque necesaria
    };

   return (
    <>
        <Bear 
            position={[-1, 0, -80]}
            onAttack={{ position: avatar, attack: () => {} }}/>
        <Ecctrl 
              jumpVel={4}
              name="AVATAR" 
              autoBalance = {true}
              camInitDis = {-10}
              camMaxDis = {-10}
              position={avatar}
              maxVelLimit={5}
            >
              <AvatarPrincipal onAttack={{ position: bear, attack: handleAttack }}/>
        </Ecctrl>
    </>
  )
}
