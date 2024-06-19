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

    useFrame((state, delta)=>{
        const {forward, backward, leftward, rightward} = get()

        if(forward || backward || leftward || rightward){
          if (avatar.bodyRef && avatar.ref) {
            avatar.bodyRef.applyImpulse({
                x: 0,
                y: 0,
                z: -0.1 * delta,
              },
              true)
              state.camera.position.z = avatar.bodyRef.translation().z + 2;
              controlsRef.current.target.z = avatar.bodyRef.translation().z;
          }
        }

        const pressed = get().back

    })


    return (
        <OrbitControls
        ref={controlsRef}
            target={[0, 4, 140]}
        />
    )
}