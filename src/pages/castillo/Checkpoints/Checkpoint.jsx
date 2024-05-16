import React, { useEffect, useState } from 'react'
import { UseCheckpoints } from '../../../context/ManagementCheckpoints'
import { useFrame } from '@react-three/fiber';

export const Checkpoint = (props) => {
    const {checkPoint, pointValidated} = UseCheckpoints();
    const [obtained, setObtained] = useState(false);

    useFrame(()=>{
        if(pointValidated("castillo")){
            setObtained(true);
        }
    },[])
  return (
    <mesh position={props.position}>
        <torusGeometry args={[2, 0.5, 12, 100]}/>
        <meshPhongMaterial attach="material" color={obtained? "green" : "red"}  />
    </mesh>
  )
}
