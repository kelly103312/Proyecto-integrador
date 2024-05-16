import React from 'react'

export const Checkpoint = (props) => {
    

  return (
    <mesh position={props.position}>
        <torusGeometry args={[2, 0.5, 12, 100]}/>
        <meshPhongMaterial attach="material" color={"green"} />
    </mesh>
  )
}
