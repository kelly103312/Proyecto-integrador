import React from 'react'
import { Color } from 'three'

export const Ligths = () => {
  return (
    <>
        <ambientLight 
          intensity={1} 
        />
        <directionalLight 
            castShadow={true}
            color={new Color("#71B2F3")}
            position={[2,8,0]} 
            intensity={8}
            shadow-mapSize={[2048,2048]}
        /> 
        <hemisphereLight 
            position={[2,8,-2]}
            intensity={2}
            skyColor={new Color("#3E68DB")}
            groundColor={new Color("#806A12")}
         />
    </>
  )
}
