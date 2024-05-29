import { Float, Html, Text, Text3D } from "@react-three/drei";
import React from "react";
import "../styles.css";

const FloatingText = (props) => {
    const text = "!! Take a rest !!\nyou are safe now"
    return (
      <>
        <Float
            rotationIntensity={0.2}
            speed={2}
            floatIntensity={0.5}
            floatingRange={[0,1]}
        >
            <Text3D
                position={[-5, 12, -30]}
                font="/assets/camino_al_atardecer/fonts/caminoALAtardecerFont.json"
                color={"black"}
                bevelEnabled
                bevelSize={0.008}
                bevelThickness={0.08}
                height={0.5}
                letterSpacing={0.05}
            >
                <meshNormalMaterial />
                {text}
            </Text3D>
        </Float>
        
        <Float
             rotationIntensity={0.2}
             speed={2}
             floatIntensity={0.5}
             floatingRange={[0,1]}
        >
        <Text
            className="Dontgiveup"
            position={[-6, 8, 70]}
            color={"black"}
            center
            distanceFactor={5}
            font="/assets/Camino_al_atardecer/fonts/caminoALAtardecerFont.otf"
          >
            {`!! Don't give up !!`}
          </Text>

        </Float>
          

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

export default FloatingText;
