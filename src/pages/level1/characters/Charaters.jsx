import React, { useRef, useState, useEffect } from 'react';
import Ecctrl from 'ecctrl';
import { useFrame } from '@react-three/fiber';
import Avatar from './avatar/Avatar'; // Asegúrate de que esta es la ruta correcta
import Zombie1 from './zombies/Zombie1';
import Zombie2 from './zombies/Zombie2';
import Zombie3 from './zombies/Zombie3';

export const Charaters = () => {
    const [avatarPosition, setAvatarPosition] = useState([0, 0.5, -3]);
    const [avatarPassedZombie1, setAvatarPassedZombie1] = useState(false);
    const [avatarPassedZombie2, setAvatarPassedZombie2] = useState(false);
    const [avatarPassedZombie3, setAvatarPassedZombie3] = useState(false);
    const avatarRef = useRef();

    const handleAttack = () => {
        console.log("El avatar 1 está atacando al avatar 2");
        // Lógica de ataque
    };

    // Verifica si el avatar ha pasado por las posiciones de los zombies
    useFrame(() => {
        if (avatarRef.current) { // Verifica si avatarRef.current no es undefined
            const avatarPos = avatarRef.current.position;
            console.log(avatarPos);

            if (!avatarPassedZombie1 && avatarPos.x <= -10) {
                setAvatarPassedZombie1(true);
                console.log("Avatar pasó por Zombie1");
            }
            if (!avatarPassedZombie2 && avatarPos.x <= -30) {
                setAvatarPassedZombie2(true);
                console.log("Avatar pasó por Zombie2");
            }
            if (!avatarPassedZombie3 && avatarPos.x <= -50) {
                setAvatarPassedZombie3(true);
                console.log("Avatar pasó por Zombie3");
            }
        }
    });

    // Actualiza la posición del avatar cuando avatarPosition cambie
    useEffect(() => {
        if (avatarRef.current) {
            avatarRef.current.position.set(...avatarPosition);
        }
    }, [avatarPosition]);

    return (
        <>
            <Zombie1 position={[0, 0, -10]} />
            <Zombie2 position={[0, 0, -30]} />
            <Zombie3 position={[0, 0, -50]} />
            <Ecctrl 
                jumpVel={4}
                name="AVATAR" 
                autoBalance={true}
                camInitDis={-10}
                camMaxDis={-10}
                position={avatarPosition}
                maxVelLimit={5}
                onChangePosition={setAvatarPosition}
            >
                <Avatar ref={avatarRef} onAttack={handleAttack} />
            </Ecctrl>
        </>
    );
}
