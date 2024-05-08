import { Cloud, Environment, Sky, Sparkles, Stars } from "@react-three/drei";

export default function Environments() {
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
        inclination={0.2}
        azimuth={180}
        turbidity={100}
        rayleigh={5}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
        distance={400}
        
      />

      <Sparkles 
        color={"#EF94F1"}
        count={1000}
        size={4}
        scale={15}
        speed={0.5}
        maxOpacity={5}
        opacity={1}
      />

      <Cloud
        opacity={0.3}
        speed={0.5}
        widht={40}
        height={70}
        depth={2}
        segments={10}
        position-y={1}
        position-z={-1}
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
