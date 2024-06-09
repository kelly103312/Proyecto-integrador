import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import Ecctrl from 'ecctrl';
import Avatar from './avatar/Avatar'; // Asegúrate de que la ruta sea correcta
import { UseCheckpoints } from '../../../context/ManagementCheckpoints';

export const Charaters = forwardRef((props, ref) => {
    const [avatarPosition, setAvatarPosition] = useState([0, 10, 95]);
    const { checkpoints, pointAchieved } = UseCheckpoints();
    const avatarRef = useRef();

    useEffect(() => {
        if (checkpoints) {
            const position = JSON.parse(localStorage.getItem('position'));
            setAvatarPosition([position.x, position.y, position.z]);
        }
    }, [checkpoints]);

    // Utiliza useImperativeHandle para exponer la referencia del avatar
    useImperativeHandle(ref, () => ({
        get position() {
            return avatarPosition;
        }
    }));

    const handleAttack = () => {
        console.log("El avatar está atacando");
        // Lógica de ataque
    };

    // Verifica si la posición del avatar se actualiza correctamente
    useEffect(() => {
        console.log('Avatar position updated:', avatarPosition);
    }, [avatarPosition]);

    return (
        <Ecctrl
            jumpVel={4}
            name='AVATAR'
            autoBalance={true}
            maxVelLimit={5}
            camInitDis={-10}
            position={avatarPosition}
            camMaxDis={-9}
            onChangePosition={(newPosition) => {
                console.log('New avatar position:', newPosition);
                setAvatarPosition(newPosition);
            }}
        >
            <Avatar ref={avatarRef} onAttack={handleAttack} />
        </Ecctrl>
    );
});
