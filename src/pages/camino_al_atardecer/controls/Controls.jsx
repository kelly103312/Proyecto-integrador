import { OrbitControls, useKeyboardControls } from "@react-three/drei";
import { useAvatar } from "../../../context/AvatarContext";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Controls() {
    const{avatar,setAvatar} = useAvatar();
    const [sub, get] = useKeyboardControls()
    const controlsRef = useRef();

    // useEffect(() => {
    //     return sub(
    //         (state)=> state.forward,
    //         (pressed) => {
    //             console.log("forward", pressed);
    //         }
    //     )

    // },[]);
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
            /*if (avatar.bodyRef && avatar.ref) {
              console.log(controlsRef.current)
            avatar.bodyRef.applyImpulse({
                x: 0,
                y: 0,
                z: -0.1 * delta,
              },
              true)
              controlsRef.current.target.z = avatar.bodyRef.translation().z;
          }*/
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