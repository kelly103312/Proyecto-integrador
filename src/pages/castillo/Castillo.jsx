import { BakeShadows, KeyboardControls, Loader } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { Suspense, useEffect, useState } from 'react'
import { World } from './World/World'
import { Physics } from '@react-three/rapier'
import { Ligths } from './Lights/Ligths'
import { EnviromentSky } from './Enviroment/EnviromentSky'
import { WelcomeText } from './World/WelcomeText'
import { Sphere } from './Figures/Sphere'
import { AvatarPrincipal } from './Charaters/AvatarPrincipal'
import { Controls } from './Controls/Controls'
import { Bear } from './Charaters/Bear'
import { Box } from './Figures/Box'
import { Pane } from '../castillo/layout/Pane'
import { Coins } from './Figures/Coins'
import { Laberinto } from './Figures/Laberinto'
import useMovements from '../../utils/key-movements'
import { Charaters } from './Charaters/Charaters'
import { socket } from '../../socket/socket-manager'
import { Checkpoint } from './Checkpoints/Checkpoint'
import { useAuth } from '../../context/AuthContext'
import { createUser, readUser } from '../../db/users-collection'
import { readCheckpoint, pointValidated} from '../../db/checkpoints-collection'
import { UseCheckpoints } from '../../context/ManagementCheckpoints'


export const Castillo = () => {

  const map = useMovements();
  const auth = useAuth()
  const [coins, setCoins] = useState(0);
  const {checkpoints,obtained} = UseCheckpoints();

  // Función para manejar la recolección de monedas
  const handleCollectCoin = () => {
    setCoins(prevCoins => prevCoins + 1); // Incrementar el contador de monedas
  };

  /**
     * Save the user data in the DB.
     * @param {*} valuesUser 
     */
  const saveDataUser = async (valuesUser) => {
    const {success} = await readUser(valuesUser.email)
    
    if (!success)
        await createUser(valuesUser)
  }

  const readCheckpoints = async (email,nameLevel) => {
    const {success,checkpointData} = await readCheckpoint(email,nameLevel)
    if(success){
      await obtained();
      localStorage.setItem('position', JSON.stringify(checkpointData[0].position));
    }
  }

  /**
   * When userLogged is changed call saveDataUser to save the user in the DB.
   * @see saveDataUser
   */
  useEffect(() => {
      if (auth.userLogged) {
          const { displayName, email } = auth.userLogged
          saveDataUser({
              displayName: displayName,
              email: email,
          })
          readCheckpoints(email,"Castillo");
      }
  }, [auth.userLogged])


  
  return (
    <KeyboardControls map={map}>
      <Pane />
      <Canvas
        shadows={true}
        camera={{
          position: [0, 1.5, -0.5],
          rotation: [0, 0, 0],
        }}
      >
        
        <Suspense fallback={null}>
          <Ligths />
          <EnviromentSky />
          <BakeShadows />
          <Physics debug={false}>
            <Checkpoint position={[0,1,-60]}/>
            <World />            
            <Charaters/>

            <Sphere position={[0,1,-35]} velocity={3} />
            <Sphere position={[0,1,-40]} velocity={4} />
            <Sphere position={[0,1,-40]} velocity={5} />
            <Sphere position={[0,1,-45]} velocity={6} />
            <Sphere position={[0,1,-50]} velocity={7} />
            
            <Box position={[0,2,-5]} />
            
            <Laberinto position={[-4.6, 2, -15]} />
            <Coins position={[0, 2, -32]} onCollect={handleCollectCoin}/>
            <Coins position={[0, 2, -38]} onCollect={handleCollectCoin}/>
            <Coins position={[0, 2, -42]} onCollect={handleCollectCoin}/>
            <Coins position={[0, 2, -47]} onCollect={handleCollectCoin}/>
            <Coins position={[0, 2, -55]} onCollect={handleCollectCoin}/>
          </Physics>
          <WelcomeText position={[0, 4, -96]} />
        </Suspense>
        <Controls />
      </Canvas>
      <Loader />
      {/* Mostrar el contador de monedas debajo del contador de vidas */}
      <div style={{ position: 'absolute', top: 60, center: 10, backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 10, borderRadius: 5, color: 'white' }}>
                Monedas: {coins}
      </div>
    </KeyboardControls>
  )
}
