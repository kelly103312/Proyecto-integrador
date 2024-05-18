import React, { useRef, useState } from 'react';
import Ecctrl from 'ecctrl';
import { useFrame } from '@react-three/fiber';
import Avatar from './avatar/Avatar'; // Importa el componente correcto
import Zombie1 from './zombies/Zombie1';
import Zombie2 from './zombies/Zombie2';
import Zombie3 from './zombies/Zombie3';

export const Charaters = () => {
    const [avatarPosition, setAvatarPosition] = useState([0, 0.5, -3]); // Cambio del nombre del estado
    const [avatarPassedPoint, setAvatarPassedPoint] = useState(false);
    const avatarRef = useRef();

    const handleAttack = () => {
        console.log("El avatar 1 está atacando al avatar 2");
        // Lógica de ataque
    };

    // Verifica si el avatar ha pasado por cierto punto
    useFrame(() => {
        if (avatarRef.current) { // Verifica si avatarRef.current no es undefined
            console.log(avatarRef.current.position);
            if (!avatarPassedPoint && avatarRef.current.position[0] > -50) {
                setAvatarPassedPoint(true);
            }
        }
    });

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
