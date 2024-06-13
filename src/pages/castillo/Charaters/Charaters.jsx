import React, { useEffect, useRef, useState } from 'react'
import { Bear } from './Bear'
import { AvatarPrincipal } from './AvatarPrincipal'
import Ecctrl from 'ecctrl'
import { UseCheckpoints } from '../../../context/ManagementCheckpoints'
import { useAvatar } from '../../../context/AvatarContext'
import { Html } from '@react-three/drei'
import { useLifesEnemy } from '../../../context/ManagementLifesEnemy'
import { Enemy1 } from './Enemy1'

export const Charaters = (props) => {
    const [avatarRef, setAvatarRef] = useState([0,2,-3]);
    const {checkpoints, pointAchieved} = UseCheckpoints();
    const {avatar,setAvatar} = useAvatar();
    const { lifesEnemy, restarLifesEnemy } = useLifesEnemy();
    
    useEffect(() => {
        if(checkpoints){
            const position = JSON.parse(localStorage.getItem('position'));
            setAvatarRef([position.x,position.y,position.z]);
        }
    },[]);

    const onCollisionEnter = (e) =>{
        if(e.rigidBodyObject.name == "Object" && avatar.animation == "attack"){
            restarLifesEnemy();
        }

    }
    return (
        <>
            <Enemy1 
                position={[0, 0, -80]}
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
