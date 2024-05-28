import { Html, Text } from "@react-three/drei";
import React from "react";

const WelcomeText = (props) => {
    return (
        <>
            <Text
                className="takeARest"
                position={[0, 5, 4]}
                center
                distanceFactor={5}
                font="/assets/Camino_al_atardecer/fonts/caminoALAtardecerFont.otf"
            >
                Take a rest !!! you are safe now
            </Text>
            
            <Html
                position={[0, 4, 150]}
                color="white"
                center
                distanceFactor={12}
                className="welcomeText"
            >
                <h2>SUNSET PATH</h2>
            </Html>
        </>
    );
};

export default WelcomeText;
