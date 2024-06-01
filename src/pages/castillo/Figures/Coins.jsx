import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useState } from 'react'

export const Coins = (props) => {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF('/assets/castillo/world/coin.glb')
    const { actions } = useAnimations(animations, group)
    const [visible, setVisible] = useState(true);


    const onCollisionExit = (e) =>{
      if(e.other.rigidBodyObject.name === "AVATAR"){
        console.log("coin ++")
        setVisible(false);
        props.onCollect();
      }
    }
  return (
    <>
      {visible ? 
          <RigidBody  type="fixed" onCollisionExit={(e)=>{onCollisionExit(e)}}>
            <group ref={group} {...props} dispose={null} >
                <group name="Scene">
                    <group name="coin" userData={{ name: 'coin' }}>
                        <mesh
                          name="CoinObj_Coin_0"
                          geometry={nodes.CoinObj_Coin_0.geometry}
                          material={materials.Coin}
                          userData={{ name: 'CoinObj_Coin_0' }}
                          />
                    </group>
                </group>
            </group>
          </RigidBody>
        :
        null
      }
    </>
  )
}
useGLTF.preload('/assets/castillo/world/coin.glb')


