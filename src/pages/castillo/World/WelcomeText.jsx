import { Center, Float, Html, Text, Text3D } from '@react-three/drei'
import React from 'react'

export const WelcomeText = (props) => {
  const text = "META";
  return (
    <Float
        rotationIntensity={0.01}
        speed={1.2}
        floatIntensity={0.2}
        floatingRange={[1,2]}
    >
      <Center
        position={props.position}
      >
        <Text3D 
          onClick={(e)=>e.stopPropagation()}
          font={"/assets/castillo/fonts/font.json"}
          bevelEnabled
          bevelSize={0.005}
          bevelThickness={0.01}
        >
          <meshNormalMaterial />
          {text}
        </Text3D>

      </Center>

    </Float>
    // <Float
    //   rotationIntensity={0.01}
    //   speed={1.2}
    //   floatIntensity={0.2}
    //   floatingRange={[1,2]}
    // >
    //   <Text
    //     fontSize={0.2}
    //     textAlign='center'
    //     color="white"
    //     position={props.position}>
    //       Hola
    //   </Text>
    // </Float>
  )
}
