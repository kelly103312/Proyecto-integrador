import { forwardRef, useRef, useState, useEffect, useImperativeHandle } from "react";
import Ecctrl from "ecctrl";
import Avatar from './avatar/Avatar';
import { useFrame } from '@react-three/fiber';

export const Characters = forwardRef((props, ref) => {
    const [avatarPosition, setAvatarPosition] = useState([0, 10, 95]);

    const avatarRef = useRef();

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
                ref={avatarRef}
                name='AVATAR'
                camInitDis={-2}
                camMaxDis={-2}
                maxVelLimit={6}
                jumpVel={5}
                position={[0, 7, 0]}
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
