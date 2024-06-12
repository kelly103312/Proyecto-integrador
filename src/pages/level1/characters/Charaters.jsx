import React, { forwardRef, useRef, useState, useEffect, useImperativeHandle } from "react";
import Ecctrl from "ecctrl";
import Avatar from './avatar/Avatar';
import { useFrame } from '@react-three/fiber';
import { UseCheckpoints  } from "../../../context/ManagementCheckpoints"; // Corrección en el nombre de la función

export const Charaters = forwardRef((props, ref) => {
    const [avatarPosition, setAvatarPosition] = useState([0, 10, 95]);
    const { checkpoints ,pointAchieved} = UseCheckpoints (); // Corrección en el nombre de la función
    const avatarRef = useRef();

    useEffect(() => {
        if(checkpoints){
            const position = JSON.parse(localStorage.getItem('position'));
            if(position) { // Verificar si la posición es válida antes de setearla
                setAvatarPosition([position.x, position.y, position.z]);
            }
        }
    }, [checkpoints]); // Agregar checkpoints al array de dependencias

    // Utilize useImperativeHandle to expose the avatar reference
    useImperativeHandle(ref, () => ({
        get position() {
            return avatarPosition;
        }
    }));

    const handleAttack = () => {
        console.log("El avatar 1 está atacando al avatar 2");
        // Lógica de ataque
    };

    // Verificar si la posición del avatar se actualiza correctamente
    useEffect(() => {
        console.log("Avatar position updated:", avatarPosition);
    }, [avatarPosition]);

    return (
        <>
            <Ecctrl
                jumpVel={4}
                name='AVATAR'
                autoBalance={true}
                maxVelLimit={5}
                camInitDis={-10}
                position={avatarPosition}
                camMaxDis={-9}
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
