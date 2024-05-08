import { Color } from "three";

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow={true}
        position={[2, 10, 0]}
        color={new Color("#463927")}
        intensity={10}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={10}
        shadow-camera-right={16}
        shadow-camera-top={16}
        shadow-camera-bottom={-16}
      />{" "}
      *
      <hemisphereLight
        position={[2, 10, -2]}
        skyColor={new Color(0x8f00ff)}
        groundColor={0x8f00ff}
        intensity={3}
      />
    </>
  );
};
export default Lights;
