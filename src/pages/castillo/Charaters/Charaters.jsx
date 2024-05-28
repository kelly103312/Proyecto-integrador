import React, { useEffect, useRef, useState } from 'react'
import { Bear } from './Bear'
import { AvatarPrincipal } from './AvatarPrincipal'
import Ecctrl from 'ecctrl'
import { useFrame } from '@react-three/fiber'
import { UseCheckpoints } from '../../../context/ManagementCheckpoints'
import { useAvatar } from '../../../context/AvatarContext'

export const Charaters = (props) => {
    const [avatarRef, setAvatarRef] = useState([0,0.5,-3]);
    const [bear, setBear] = useState(3);
    const {checkpoints, pointAchieved} = UseCheckpoints();
    const {avatar,setAvatar} = useAvatar();
    
    useEffect(() => {
        if(checkpoints){
            const position = JSON.parse(localStorage.getItem('position'));
            setAvatarRef([position.x,position.y,position.z]);
        }
    },[]);

    const onCollisionEnter = (e) =>{
        if(e.rigidBodyObject.name == "BEAR" && avatar.animation == "attack"){
            setBear(bear-1);
            console.log(bear)
        }

    }
    return (
        <>
            <Bear 
                position={[-1, 0, -80]}
                lifes = {bear}
                />
            <Ecctrl 
                onCollisionExit={(e)=>{onCollisionEnter(e)}}
                jumpVel={4}
                name="AVATAR" 
                autoBalance = {true}
                camInitDis = {-10}
                camMaxDis = {-10}
                position={avatarRef}
                maxVelLimit={5}
                onChangePosition={setAvatarRef}
            >
                <AvatarPrincipal />
            </Ecctrl>
            
        </>
    )
}
