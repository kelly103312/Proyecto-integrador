import React, { useEffect, useState } from 'react'
import { UseCheckpoints } from '../../../context/ManagementCheckpoints'

export const Checkpoint = (props) => {
    const {checkPoint, pointValidated} = UseCheckpoints();
    const [obtained, setObtained] = useState(false);

    useEffect(()=>{
        if(pointValidated("castillo")){
            setObtained(true);
        }
        console.log("Obtuvo el checkpoint " + obtained)
    },[])
  return (
    <mesh position={props.position}>
        <torusGeometry args={[2, 0.5, 12, 100]}/>
        <meshPhongMaterial attach="material" color={obtained? "green" : "red"}  />
    </mesh>
  )
}
