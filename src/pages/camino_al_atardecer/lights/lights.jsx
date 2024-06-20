import React, { useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { useControls } from 'leva';
import { Color } from 'three';
import "../styles.css";

export const Lights = () => {
    const spotLightRef1 = useRef(null);
    const spotLightRef2 = useRef(null);
    const hemisphereRef = useRef(null);

    return (
        <>
            <ambientLight 
                color={new Color("#9D4040")}
                intensity={3} 
            />
            <directionalLight
                castShadow={true}
                position={[0, 0, -165]}
                color={new Color("#F95706")}
                intensity={20}
                raycast={true}
                length={50}    
                
            />
            <pointLight
                ref={spotLightRef1}
                position={[0,2,-121]}
                color={'#FF0087'}
                intensity={100}
                decay={2}
                angle={Math.PI / 2}
            />
            <spotLight
                ref={spotLightRef2}
                position={[-3, 6, 150]}
                color="pink"
                intensity={300}
                angle={Math.PI / 2}
                decay={2}
            />
            <hemisphereLight
                ref={hemisphereRef}
                position={[0, 2, 0]}
                skyColor={new Color("#FF0087")}
                groundColor={new Color("#FF0087")}
                intensity={1}
            />
        </>
    );
};
