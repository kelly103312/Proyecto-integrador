import React, { useEffect, useState } from 'react'
import { UseCheckpoints } from '../../../context/ManagementCheckpoints'
import { useFrame } from '@react-three/fiber';
import { useAuth } from '../../../context/AuthContext';

export const Checkpoint = (props) => {
    const {checkPoint, pointValidated} = UseCheckpoints();
    const [obtained, setObtained] = useState(false);
    const auth = useAuth()

    useFrame(()=>{
      if (auth.userLogged) {
        const { displayName, email } = auth.userLogged
        console.log(pointValidated("castillo",email))
        if(pointValidated("castillo",email)){
            setObtained(true);
            console.log("lo obtiene")
        }

      }
        
    },[])
  return (
    <mesh position={props.position}>
        <torusGeometry args={[2, 0.5, 12, 100]}/>
        <meshPhongMaterial attach="material" color={obtained? "green" : "red"}  />
    </mesh>
  )
}
