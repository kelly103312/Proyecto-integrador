import { Box, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef, useState } from 'react'

export const Object = () => {
    const meshRef = useRef();
    const [position, setPosition] = useState([0, 2, -55]);
    const [isVisible, setIsVisible] = useState(false);
    const [velocity, setVelocity] = useState([0.1, 0, 0]);
  
    useFrame(() => {
      if (isVisible) {
        setPosition((prevPosition) => [
          prevPosition[0] + velocity[0],
          prevPosition[1] + velocity[1],
          prevPosition[2] + velocity[2],
        ]);
      }
    });
  
    const handleThrow = () => {
      setPosition([0, 2, -32]); // Posición inicial
      setIsVisible(true);
      setVelocity([0, -0, -0.5]); // Velocidad inicial
    };
  
    return (
      <>
        <Box
          ref={meshRef}
          position={position}
          visible={isVisible}
          args={[1, 1, 1]}
          onClick={handleThrow}
        >
          <meshStandardMaterial attach="material" color="orange" />
        </Box>
        <Html>
            <button style={{ position: 'absolute', top: '20px', left: '20px' }} onClick={handleThrow}>
            Lanzar Objeto
            </button>
        </Html>
      </>
    );
}
