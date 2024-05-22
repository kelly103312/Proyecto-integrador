import React, { useEffect, useRef, useState } from 'react'
import { Bear } from './Bear'
import { AvatarPrincipal } from './AvatarPrincipal'
import Ecctrl from 'ecctrl'
import { useFrame } from '@react-three/fiber'
import { UseCheckpoints } from '../../../context/ManagementCheckpoints'

export const Charaters = () => {
    const [avatar, setAvatar] = useState([0,0.5,-3]);
    const [bear, setBear] = useState([-1, 0, -80]);
    const {checkpoints, pointAchieved} = UseCheckpoints();
    const [avatarPassedPoint, setAvatarPassedPoint] = useState(false); // Estado para controlar si el avatar ha pasado por cierto punto

    const bearRef = useRef()
    const avatarRef = useRef()

    const handleAttack = () => {
        console.log("El avatar 1 está atacando al avatar 2");
        // Aquí puedes realizar cualquier lógica de ataque necesaria
    };

    // Verifica si el avatar ha pasado por cierto punto
    useEffect(() => {
        if(checkpoints){
            const position = JSON.parse(localStorage.getItem('position'));
            setAvatar([position.x,position.y,position.z]);
        }
    },[]);

    return (
        <>
            <Bear 
                position={[-1, 0, -80]}/>
            <Ecctrl 
                jumpVel={4}
                name="AVATAR" 
                autoBalance = {true}
                camInitDis = {-10}
                camMaxDis = {-10}
                position={avatar}
                maxVelLimit={5}
                onChangePosition={setAvatar}
            >
                <AvatarPrincipal ref={avatarRef} />
            </Ecctrl>
        </>
    )
}
