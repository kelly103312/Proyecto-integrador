import { OrbitControls, useKeyboardControls } from "@react-three/drei";
import { useAvatar } from "../../../context/AvatarContext";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Quaternion, Vector3 } from "three";

export default function Controls() {
    const { avatar, setAvatar } = useAvatar();
    const [sub, get] = useKeyboardControls()
    const controlsRef = useRef()
    let walkDirection = new Vector3()
    let rotateAngle = new Vector3(0, 1, 0);
    let rotateQuaternion = new Quaternion();
    const velocity = 3;
    let cameraTarget = new Vector3();
    const desiredDistance = 2;  

    useEffect(()=>{
        const unsubscribe = sub(
            (state) => {
                if(state.forward || state.backward || state.leftward || state.rightward ){
                    console.log("run")
                }
            },
            (pressed) => {
                console.log(pressed)
              setAvatar({ ...avatar, animation: pressed });
            }
          );
          return () => unsubscribe();
    },[avatar, setAvatar, sub, get()])

    useFrame((state, delta)=>{
        const {forward, backward, leftward, rightward} = get()

        if(forward || backward || leftward || rightward){
            console.log("entra a tecla")
        }

        const pressed = get().back

    })


    return (
        <>
            null
        </>
    )
}