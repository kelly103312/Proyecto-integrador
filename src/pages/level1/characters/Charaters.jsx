import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import Ecctrl from 'ecctrl';
import { useFrame } from '@react-three/fiber';
import Avatar from './avatar/Avatar'; // Asegúrate de que esta es la ruta correcta

// Modificar Charaters para exponer la referencia del avatar
export const Charaters = forwardRef((props, ref) => {
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

    // Verifica si el avatar ha pasado por las posiciones de los zombies
    useFrame(() => {
        if (avatarRef.current) {
            const avatarPos = avatarRef.current.position;

            console.log("Avatar position in useFrame:", avatarPos); // Agrega este console.log para verificar la posición en cada frame

            // Comprueba si la posición del avatar coincide con la de los zombies
            if (!avatarPassedZombie1 && avatarPos[2] <= -10) {
                setAvatarPassedZombie1(true);
                console.log("Avatar pasó por Zombie1");
            }
            if (!avatarPassedZombie2 && avatarPos[2] <= -30) {
                setAvatarPassedZombie2(true);
                console.log("Avatar pasó por Zombie2");
            }
            if (!avatarPassedZombie3 && avatarPos[2] <= -50) {
                setAvatarPassedZombie3(true);
                console.log("Avatar pasó por Zombie3");
            }
        }
    });

    // Verifica si la posición del avatar se actualiza correctamente
    useEffect(() => {
        console.log("Avatar position updated:", avatarPosition); // Agrega este console.log para verificar la actualización de la posición del avatar
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
                    console.log("New avatar position:", newPosition); // Agrega este console.log para vrificar la nueva posición enviada por el Ecctrl
                    setAvatarPosition(newPosition);
                }}
            >
                <Avatar ref={avatarRef} onAttack={handleAttack} />
            </Ecctrl>
        </>
    );
});
