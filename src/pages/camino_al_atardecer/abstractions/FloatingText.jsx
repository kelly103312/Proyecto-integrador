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
                position={[-7, 12, -25]}
                font="/assets/camino_al_atardecer/fonts/caminoALAtardecerFont.json"
                color={"black"}
                bevelEnabled
                bevelSize={0.008}
                bevelThickness={0.08}
                height={0.5}
                letterSpacing={0.05}
                size={1}
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
            position={[-6, 10, 70]}
            color={"black"}
            fontSize={2}
            center
            distanceFactor={10}
            font="/assets/Camino_al_atardecer/fonts/caminoALAtardecerFont.otf"
          >
            {`!! Don't give up !!`}
          </Text>

        </Float>
          
        <Float
             rotationIntensity={0.2}
             speed={1}
             floatIntensity={0.005}
             floatingRange={[0,1]}
        >
         <Text
            className="ClikOnTheChair"
            position={[-7, 3, -37]}
            color={"black"}
            fontSize={1}
            center
            distanceFactor={10}
            font="/assets/Camino_al_atardecer/fonts/caminoALAtardecerFont.otf"
          >
            {`Click on \nthe chair \nto rest`}
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
