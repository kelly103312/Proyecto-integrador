import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Cloud, Environment, Sky, Sparkles, Stars } from '@react-three/drei';
import "../styles.css";

export const Environments = () => {
  return (
    <>
      {/* <Environment
        files={"assets/hdris/abandoned_tank_farm_05_4k.hdr"}
        preset={null}
        background={false}
        ground={{
            height: 50,
            scale: 700,
            radius: 700,
         } }
      /> */}
      <Sky
        sunPosition={[0, 0, -1]}
        inclination={0}
        azimuth={300}
        turbidity={100}
        rayleigh={5}
        mieCoefficient={0.005}
        mieDirectionalG={0.9}
        distance={300}
      />

      <Sparkles 
        color={"#EF94F1"}
        count={500}
        size={6}
        scale={18}
        speed={0.5}
        maxOpacity={2}
        opacity={3}
        position={[0, 6, 141]}
      />

      <Cloud
        opacity={0.6}
        speed={0.5}
        width={60}  
        height={70}
        depth={2}
        segments={10}
        position={[0, 1, -124]}
        size={10}
        color={"#EF94F1"}
      />

      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
      />
    </>
  );
}


