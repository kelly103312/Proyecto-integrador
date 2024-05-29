import { Center, Float, Text3D } from "@react-three/drei";

const WelcomeText = (props) => {
    const text = "Cueva encantada";

    return (
        <Float
            speed={1.5}
            rotationIntensity={0.01}
            floatIntensity={0.5}
            floatingRange={[10, 6]}

        >
        <Center
            position={props.position}
        >
            <Text3D
                font={"/assets/cueva_encantada/fonts/FontGame.json"}
                bevelEnabled
                bevelSize={0.02}
                bevelThickness={0.01}
                height={1}
                letterSpacing={0.02}
                size={0.5}
            >
                <meshNormalMaterial />
                {text}
            </Text3D>
        </Center>
        </Float>
    )
}
export default WelcomeText;
