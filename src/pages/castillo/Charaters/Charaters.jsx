import React, { useEffect, useRef, useState } from 'react'
import { Bear } from './Bear'
import { AvatarPrincipal } from './AvatarPrincipal'
import Ecctrl from 'ecctrl'
import { UseCheckpoints } from '../../../context/ManagementCheckpoints'
import { useAvatar } from '../../../context/AvatarContext'
import { Html } from '@react-three/drei'
import { useLifesEnemy } from '../../../context/ManagementLifesEnemy'

export const Charaters = (props) => {
<<<<<<< HEAD
    const [avatarRef, setAvatarRef] = useState([0,2,-3]);
=======
    const [avatarRef, setAvatarRef] = useState([0,1.5,-3]);
>>>>>>> fb17c32a5f6f2795483f2a9c1d589bf040e6862a
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
        if(e.rigidBodyObject.name == "BEAR" && avatar.animation == "attack"){
            restarLifesEnemy();
        }

    }
    return (
        <>
            <Bear 
                position={[-1, 0, -80]}
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
