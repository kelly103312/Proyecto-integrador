import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import Ecctrl from 'ecctrl';
import { useFrame } from '@react-three/fiber';
import Player1 from './players/Player1'; // Asegúrate de que esta es la ruta correcta
import { useAvatar } from '../../../context/AvatarContext';

// Modificar Charaters para exponer la referencia del avatar
export const Charaters = forwardRef((props, ref) => {
    const [avatarPosition, setAvatarPosition] = useState([0, 10, 95]);
    const rigidBodyPlayer1Ref = useRef();
    const avatarRef = useRef();
    const player1Ref = useRef();
    const { avatar, setAvatar } = useAvatar();

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


    useEffect(() => {
        setAvatar({
            ...avatar,
            player1Ref: player1Ref?.current,
            rigidBodyPlayer1Ref: rigidBodyPlayer1Ref?.current
        });
    }, [player1Ref?.current, rigidBodyPlayer1Ref?.current]);

    return (
        <>

            <Ecctrl

                ref={rigidBodyPlayer1Ref}
                camInitDis={-2}
                camMaxDis={-2}
                maxVelLimit={10.5}
                jumpVel={9}
                name='AVATAR'
                autoBalance={true}
                position={[0, 10, 0]}

                onChangePosition={(newPosition) => {
                    console.log("New avatar position:", newPosition); // Agrega este console.log para vrificar la nueva posición enviada por el Ecctrl
                    setAvatarPosition(newPosition);
                }}
            >
                <Player1 ref={avatarRef} onAttack={handleAttack} />
            </Ecctrl>
        </>
    );
});
