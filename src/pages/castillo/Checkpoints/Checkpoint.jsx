import React, { useEffect, useState } from 'react'
import { UseCheckpoints } from '../../../context/ManagementCheckpoints'
import { useFrame } from '@react-three/fiber';
import { useAuth } from '../../../context/AuthContext';
import { readCheckpoint } from '../../../db/checkpoints-collection';

export const Checkpoint = (props) => {
    const {checkPoint, pointValidated} = UseCheckpoints();
    const [obtained, setObtained] = useState(false);
    const auth = useAuth()

    useFrame(()=>{
      if (auth.userLogged) {
        const { displayName, email } = auth.userLogged
        //console.log("epe")
        //console.log(pointValidated("Castillo",email))
        //if(pointValidated("Castillo",email)){
           // setObtained(true);
            //console.log("lo obtiene")
        //}
        const readCheckpoints = async () => {
          const {success} = await readCheckpoint(email,"Castillo")
          console.log(success)
          if(success){
            setObtained(true);
          }
        }
        readCheckpoints();

      }
        
    },[])
  return (
    <mesh position={props.position}>
        <torusGeometry args={[2, 0.5, 12, 100]}/>
        <meshPhongMaterial attach="material" color={obtained? "green" : "red"}  />
    </mesh>
  )
}
