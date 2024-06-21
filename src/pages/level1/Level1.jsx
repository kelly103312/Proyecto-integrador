import React, { useState, useEffect } from 'react';
import { Perf } from "r3f-perf";
import { KeyboardControls, BakeShadows, Loader } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";
import Lights from "./lights/Lights";
import Environments from "./staging/Environments";
import { Canvas } from "@react-three/fiber";
import World from "./world/World";
import Controls from "./controls/Controls";
import { Charaters } from "./characters/Charaters";
import { Pane } from '../level1/layout/Pane';
import { Coins } from '../level1/Figures/Coins';
import useMovements from "../../utils/key-movements";
import { Sphere } from './Figures/Sphere';
import { useLifes } from '../../context/ManagementLifes';
import CharacterHudcueva_encantada from "./hud/CharacterHud";
import GameOver from "./world/GameOver";
import { Model } from './Figures/enemigo';
import { Model1 } from './Figures/enemigo2';
import { readCheckpoint, pointValidated} from '../../db/checkpoints-collection'
import { UseCheckpoints } from "../../context/ManagementCheckpoints";
import { Checkpoint } from "./checkpoints/Checkpoint";
import { useAuth } from "../../context/AuthContext";
import { socket } from "../../socket/socket-manager";
import WelcomeText from "./abstractions/WelcomeText";
import { createUser, readUser } from "../../db/users-collection";
import { EcctrlJoystick } from "ecctrl";
import { Sphere2 } from './Figures/Sphere2';



export default function Level1() {
    const map = useMovements();
    const { lifes } = useLifes();
    const [coins, setCoins] = useState(0); // Estado para mantener el número de monedas recogidas
    const [gameOver, setGameOver] = useState(false); // Estado para controlar si el juego ha terminado
    const auth = useAuth();
    const {checkpoints,obtained} = UseCheckpoints();

    // Función para manejar la recolección de monedas
    const handleCollectCoin = () => {
        setCoins(prevCoins => prevCoins + 1); // Incrementar el contador de monedas
    };

    // Función para manejar las colisiones con las esferas
    const handleSphereCollision = () => {
        // Lógica para reducir vidas o lo que sea necesario
        // Ejemplo: setLifes(prevLifes => prevLifes - 1);

        if (lifes === 0) {
            setGameOver(true); // Establecer el estado de fin de juego
        }
    };

    useEffect(() => {
        if (lifes === 0) {
            setGameOver(true);
        }
    }, [lifes]);

    const readCheckpoints = async (email,nameLevel) => {
        const {success,checkpointData} = await readCheckpoint(email,nameLevel)
        if(success){
          await obtained();
          localStorage.setItem('position', JSON.stringify(checkpointData[0].position));
        }
      }
    
       /**
         * Save the user data in the DB.
         * @param {*} valuesUser 
         */
       const saveDataUser = async (valuesUser) => {
        const {success} = await readUser(valuesUser.email)
        
        if (!success)
            await createUser(valuesUser)
      }
    
      /**
       * Emit to the server that the player is connected.
       */
      useEffect(() => {
        socket.emit("player-connected");
      }, []);
    
      useEffect(() => {
        if (auth.userLogged) {
            const { displayName, email } = auth.userLogged
            saveDataUser({
                displayName: displayName,
                email: email,
            })
            readCheckpoints(email,"cueva_encantada");
        }
    }, [auth.userLogged])

    

    return (
        <KeyboardControls map={map}>
            <Pane />
            <EcctrlJoystick />
            <Canvas
                shadows={true}
                camera={{
                    position: [0, 1.5, -0.5],
                    rotation: [0, 0, 0],
                }}
            >
                <Perf position="top-center" />
                <Suspense fallback={null}>
                    <Lights />
                    <BakeShadows />
                    <Environments />
                    <Physics debug={false}>
                        <World />
                        <Sphere2 position={[0, 0.4, -21]} velocity={3} onCollide={handleSphereCollision} />
                        <Sphere position={[0, 0.4, -31]} velocity={4} onCollide={handleSphereCollision} />
                        <Sphere position={[0, 0.4, -41]} velocity={5} onCollide={handleSphereCollision} />
                        <Sphere position={[0, 0.4, -51]} velocity={6} onCollide={handleSphereCollision} />
                        <Sphere position={[0, 0.4, -61]} velocity={7} onCollide={handleSphereCollision} />
                        <Sphere position={[0, 0.4, 19]} velocity={7} onCollide={handleSphereCollision} />
                        <Sphere2 position={[0, 0.4, 15]} velocity={7} onCollide={handleSphereCollision} />
                        <Sphere2 position={[0, 0.4, 20]} velocity={7} onCollide={handleSphereCollision} />
                        <Sphere position={[0, 0.4, 12]} velocity={7} onCollide={handleSphereCollision} />
                        <Sphere position={[0, 0.4, 5]} velocity={7} onCollide={handleSphereCollision} />
                        <Sphere position={[0, 0.4, 11]} velocity={7} onCollide={handleSphereCollision} />
                        <Sphere position={[0, 0.4, 40]} velocity={7} onCollide={handleSphereCollision} />
                        <Sphere position={[0, 0.4, 50]} velocity={7} onCollide={handleSphereCollision} />
                        <Sphere position={[0, 0.4, 60]} velocity={7} onCollide={handleSphereCollision} />
                        <Sphere2 position={[0, 0.4, 70]} velocity={7} onCollide={handleSphereCollision} />
                        <Sphere position={[0, 0.4, 80]} velocity={7} onCollide={handleSphereCollision} />

                        <Charaters />
                        
                        <Model1 position={[0.133, -1.001, -96.288]}/>
                        <Model position={[-2, 0.4, 80]}/> 
                        <Checkpoint position={[0,1,-90]}/>
                        

                        { /*<Model position={[-   2, 0.4, 80]}/> Añadir las monedas y pasar la función handleCollectCoin como prop */}
                        <Coins position={[-2, 2, -3]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 2, -4]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 2, -5]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 2, -6]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 2, -10]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 2, -18]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 2, -19]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 2, -20]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 2, -21]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 2, -23]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 2, -24]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 2, -25]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 2, -26]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 2, -27]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 2, -28]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 2, -29]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 2, -41]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 2, -44]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 2, -47]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 2, -50]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 2, -53]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 2, -56]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 2, -59]} onCollect={handleCollectCoin} />
                        <Coins position={[-3, 2, -7]} onCollect={handleCollectCoin} />
                        <Coins position={[-3, 2, -11]} onCollect={handleCollectCoin} />
                        <Coins position={[-3, 2, -15]} onCollect={handleCollectCoin} />
                        <Coins position={[-3, 2, -22]} onCollect={handleCollectCoin} />
                        <Coins position={[-3, 2, -30]} onCollect={handleCollectCoin} />
                        <Coins position={[-3, 2, -35]} onCollect={handleCollectCoin} />
                        <Coins position={[-3, 2, -39]} onCollect={handleCollectCoin} />
                        <Coins position={[-3, 2, -42]} onCollect={handleCollectCoin} />
                        <Coins position={[-3, 2, -45]} onCollect={handleCollectCoin} />
                        <Coins position={[-3, 2, -48]} onCollect={handleCollectCoin} />
                        <Coins position={[-3, 2, -51]} onCollect={handleCollectCoin} />
                        <Coins position={[-3, 2, -54]} onCollect={handleCollectCoin} />
                        <Coins position={[-3, 2, -57]} onCollect={handleCollectCoin} />
                        <Coins position={[-3, 2, -60]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 2, -69]} onCollect={handleCollectCoin} />
  <Coins position={[-2, 2, -70]} onCollect={handleCollectCoin} />
  <Coins position={[-2, 2, -71]} onCollect={handleCollectCoin} />
  <Coins position={[-2, 2, -72]} onCollect={handleCollectCoin} />
  <Coins position={[-2, 2, -73]} onCollect={handleCollectCoin} />
  <Coins position={[-2, 2, -74]} onCollect={handleCollectCoin} />
  <Coins position={[-2, 2, -75]} onCollect={handleCollectCoin} />
  <Coins position={[-2, 2, -76]} onCollect={handleCollectCoin} />
  <Coins position={[-2, 2, -77]} onCollect={handleCollectCoin} />
  <Coins position={[-2, 2, -78]} onCollect={handleCollectCoin} />
  <Coins position={[-2, 2, -79]} onCollect={handleCollectCoin} />
  <Coins position={[-2, 2, -80]} onCollect={handleCollectCoin} />
  <Coins position={[-2, 2, -81]} onCollect={handleCollectCoin} />
  <Coins position={[-2, 2, -82]} onCollect={handleCollectCoin} />
  <Coins position={[-2, 2, -83]} onCollect={handleCollectCoin} />
  <Coins position={[-2, 2, -84]} onCollect={handleCollectCoin} />
  <Coins position={[-2, 2, -85]} onCollect={handleCollectCoin} />
  <Coins position={[-2, 2, -86]} onCollect={handleCollectCoin} />
  <Coins position={[-2, 2, -87]} onCollect={handleCollectCoin} />
  <Coins position={[-2, 2, -88]} onCollect={handleCollectCoin} />
  <Coins position={[-2, 2, -89]} onCollect={handleCollectCoin} />
  <Coins position={[-2, 2, -90]} onCollect={handleCollectCoin} />
  <Coins position={[-2, 2, -91]} onCollect={handleCollectCoin} />
  <Coins position={[-2, 2, -92]} onCollect={handleCollectCoin} />
  <Coins position={[-2, 2, -93]} onCollect={handleCollectCoin} />
  <Coins position={[-2, 2, -94]} onCollect={handleCollectCoin} />
  <Coins position={[-2, 2, -95]} onCollect={handleCollectCoin} />
  <Coins position={[-2, 2, -96]} onCollect={handleCollectCoin} />
  <Coins position={[-2, 2, -97]} onCollect={handleCollectCoin} />
  <Coins position={[-2, 2, -98]} onCollect={handleCollectCoin} />
                          

                       
                    </Physics>

                </Suspense>
                <Controls />
            </Canvas>
            <Loader />
            {/* Mostrar el contador de monedas debajo del contador de vidas */}
            <CharacterHudcueva_encantada coins={coins} />
            
            {/* Mostrar el mensaje de "Perdiste" cuando el juego termine */}
            {gameOver && <GameOver />}
        </KeyboardControls>
    );
}