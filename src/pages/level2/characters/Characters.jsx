import { forwardRef, useRef, useState, useEffect, useImperativeHandle } from "react";
import Ecctrl from "ecctrl";
import Avatar from './avatar/Avatar';
import { useFrame } from '@react-three/fiber';
import { UseCheckpoints } from "../../../context/ManagementCheckpoints";

export const Characters = forwardRef((props, ref) => {
    const [avatarPosition, setAvatarPosition] = useState([0, 10, 92]);
    const {checkpoints, pointAchieved} = UseCheckpoints();
    const [avatar, setAvatar] = useState([0,0.5,-3]);

    const avatarRef = useRef();

    useEffect(() => {
        if(checkpoints){
            const position = JSON.parse(localStorage.getItem('position'));
            setAvatar([position.x,position.y,position.z]);
        }
    },[]);

     // Utiliza useImperativeHandle para exponer la referencia del avatar
     useImperativeHandle(ref, () => ({
        get position() {
            return avatarPosition;
        }
    }));

    const handleAttack = () => {
        console.log("El avatar 1 está atacando al avatar 2");
        // Lógica de ataque
    };

   
    

    // Verifica si la posición del avatar se actualiza correctamente
    useEffect(() => {
        console.log("Avatar position updated:", avatarPosition); // Agrega este console.log para verificar la actualización de la posición del avatar
    }, [avatarPosition]);
    

    return (
        <>
            <Ecctrl

                camInitDis={-2}
                camMaxDis={-2}
                maxVelLimit={10.5}
                jumpVel={9}
                position={[10, 17,0]}
                ref={avatarRef}
                name='AVATAR'
         
                onChangePosition={(newPosition) => {
                    console.log("New avatar position:", newPosition);
                    setAvatarPosition(newPosition);
                }}
            >
                <Avatar ref={avatarRef} onAttack={handleAttack} />
            </Ecctrl>
        </>
    );
});