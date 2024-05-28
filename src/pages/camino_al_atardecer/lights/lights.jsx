import React, { useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { useControls } from 'leva';
import { Color } from 'three';

const Lights = () => {
    const spotLightRef1 = useRef(null);
    const spotLightRef2 = useRef(null);
    const hemisphereRef = useRef(null);

    const optionHemisphereLight = useMemo(() => ({
        intensityHL: { value: 2, min: 0, max: 1000, step: 1 },
        colorHL: { value: "#ef7f15" },
    }), []);

    const optionSpotLight = useMemo(() => ({
        intensitySL: { value: 10, min: 0, max: 1000, step: 1 },
        colorSL: { value: "white" },
        positionSL: { value: [30, 5, 0] }
    }), []);

    const { intensitySL, colorSL, positionSL } = useControls("Spot Light", optionSpotLight);
    const { intensityHL, colorHL } = useControls("Hemisphere Light", optionHemisphereLight);

    return (
        <>
            <ambientLight intensity={0.2} />
            <directionalLight
                castShadow
                receiveShadow
                position={[0, 5, -90]}
                color={new Color("#FFB200")}
                intensity={10}
            />
            <spotLight
                ref={spotLightRef1}
                position={positionSL}
                color={colorSL}
                intensity={intensitySL}
                angle={Math.PI / 3}
            />
            <spotLight
                ref={spotLightRef2}
                position={[-3, 6, 160]}
                color="white"
                intensity={300}
                angle={Math.PI / 2}
                decay={2}
            />
            <hemisphereLight
                ref={hemisphereRef}
                position={[0, 2, 0]}
                skyColor={new Color("#FD1067")}
                groundColor={new Color("#F6279B")}
                intensity={intensityHL}
            />
        </>
    );
};

const App = () => {
    return (
        <Canvas>
            <Lights />
        </Canvas>
    );
};

export default App;
