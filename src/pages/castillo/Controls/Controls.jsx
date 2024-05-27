import { OrbitControls, useKeyboardControls } from '@react-three/drei'
import React, { useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber';
import { useAvatar } from '../../../context/AvatarContext';

export const Controls = () => {
    const {avatar, setAvatar} = useAvatar();
    const [sub,get]= useKeyboardControls();

    const [runSound] = useState(new Audio("/assets/castillo/sounds/steps.wav"))
    const [play,setPlay] = useState(false);

    useEffect(()=>{
        const unsubscribe = sub(
            (state) => {
                if(state.forward || state.backward || state.leftward || state.rightward ){
                    return "run";
                }
                if(state.attack){
                    return "attack";
                }
                return "idle";
            },
            (pressed) => {
                console.log(pressed)
              setAvatar({ ...avatar, animation: pressed });
            }
          );
          return () => unsubscribe();
    },[avatar, setAvatar, sub, get()])

    useEffect(()=>{
        if(play){
            runSound.currentTime = 0
            runSound.volume = Math.random()
            runSound.play()
        }else{
            
            runSound.pause()
        }
    },[play])

    useFrame((state,delta)=>{
        const {forward, backward, leftward, rightward,jump,attack} = get()
        if(forward||backward||leftward||rightward){
            setPlay(true)
        }else{
            setPlay(false)
        }
        const pressed = get().back
    })
  return (
    <>
        {/* <OrbitControls ref={controlsRef} target={[0, 1.5, -3]} /> */}
        null
    </>
  )
}
