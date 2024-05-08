import { Sky, Sparkles } from '@react-three/drei'
import React from 'react'

export const EnviromentSky = () => {
  return (
    <>
        <Sky 
            distance={450000}
            sunPosition={[1,-1, 1]} 
            inclination={0.2} 
            elevation={5}
            azimuth={360}/>
        <Sparkles 
            position={[0,1.5,-96]}
            color= "yellow"
            count={200}
            size={5}
            fade={false}
            speed={0.5}
            scale={10}
        />
    </>
  )
}
