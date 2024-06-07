import React, { useEffect, useState } from 'react'
import { UseCheckpoints } from '../../../context/ManagementCheckpoints'
import { useFrame } from '@react-three/fiber';
import { useAuth } from '../../../context/AuthContext';

export const Checkpoint = (props) => {
    const {checkpoints, obtained} = UseCheckpoints();
    const auth = useAuth()
    
    
  return (
    <mesh position={props.position}>
        <torusGeometry args={[2, 0.5, 12, 100]}/>
        <meshPhongMaterial attach="material" color={checkpoints? "green" : "red"}  />
    </mesh>
  )
}
