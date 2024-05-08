import { Center, Html, Text3D } from "@react-three/drei";
import { Text } from "@react-three/drei";
import { Float } from "@react-three/drei";

const WelcomeText = (props) => {
  const text = "Cueva Encantada";
  return (
    <Float
      speed={5}
      rotationIntensity={0.1}
      floatIntensity={1}
      floatingRange={[7, 3]}
      textAling="center"
    >
      <Center position={props.position}>
        <Text3D
          font={"/assets/cueva_encantada/fonts/FontGame.json"}
          bevelEnabled
          bevelSize={0.05}
          bevelThickness={0.6}
          height={0.1}
          lineHeight={0.5}
          letterSpacing={0.05}
          size={10}
          color={"Red"}
        >
          <meshNormalMaterial />
          {text}
        </Text3D>
      </Center>
    </Float>
  );
};

export default WelcomeText;
