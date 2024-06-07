import { Perf } from "r3f-perf";
import {KeyboardControls, Loader } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Suspense, useEffect, useState } from "react";
import WelcomeText from "./abstractions/WelcomeText";
import Lights from "./lights/Lights";
import Environments from "./staging/Environments";
import Player1 from "./characters/players/Player1";
import { Canvas } from "@react-three/fiber";
import World from "./world/World";
import Controls from "./controls/Controls";
import useMovements from "../../utils/key-movements";
import { socket } from "../../socket/socket-manager";
import { Players, playersAtom } from "../../components/Players";
import { useAuth } from "../../context/AuthContext";
import Logout from "../../components/logout/Logout";
import { createUser, readUser } from "../../db/users-collection";
import { useAtom } from "jotai";
import { EcctrlJoystick } from "ecctrl";
import MouseMen from "./characters/mouseMen/MouseMen";
import CharacterHudcueva_encantada from "./hud/CharacterHud";
import Coins from "./Figures/Coins";
import Coins2 from "./Figures/Coins";
import Coins3 from "./Figures/Coins";
import { Cone } from "./Figures/Cone";
import { useLifes } from '../../context/ManagementLifes';
import GameOver from "./world/GameOver";
import { Gat} from "./layout/Gat";


export default function Cueva_Encantada() {
  const [coins, setCoins] = useState(0);
  const map = useMovements();
  const auth = useAuth();
  const [players] = useAtom(playersAtom);
  const { lifes } = useLifes();
  const [gameOver, setGameOver] = useState(false);


  const handleConeCollision = () => {
    

    if (lifes === 0) {
        setGameOver(true); 
    }
};

useEffect(() => {
    if (lifes === 0) {
        setGameOver(true);
    }
}, [lifes]);


 
  const handleCoins = () => {
    setCoins((coins) => coins + 1);
  };

  useEffect(() => {
    /**
     * Save the user data in the DB.
     * @param {*} valuesUser
     */
    const saveDataUser = async (valuesUser) => {
      const { success } = await readUser(valuesUser.email);
      if (!success) await createUser(valuesUser);
    };

    /**
     * When userLogged is changed call saveDataUser to save the user in the DB.
     * @see saveDataUser
     */
    if (auth.userLogged) {
      const { displayName, email } = auth.userLogged;

      saveDataUser({
        displayName: displayName,
        email: email,
      });
    }
  }, [auth.userLogged]);

  /**
   * Emit to the server that the player is connected.
   */
  useEffect(() => {
    socket.emit("player-connected");
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <KeyboardControls map={map}>
        <Gat/>
        <Players />
        <Logout />
        <EcctrlJoystick />
        <Canvas
          camera={{
            position: [0, 1, 0],
          }}
        >
          <Lights />
          <Environments />
          <Physics debug={false}>
            <World />
            <Player1 />
            <MouseMen  />

            <Cone position={[0,1,-43]} velocity={3} onCollide={handleConeCollision}/>
            <Cone position={[0,1,-45]} velocity={4} onCollide={handleConeCollision}/>
            <Cone position={[0,1,-47]} velocity={5} onCollide={handleConeCollision}/>
            <Cone position={[0,1,-49]} velocity={6} onCollide={handleConeCollision}/>
            <Cone position={[0,1,-51]} velocity={7} onCollide={handleConeCollision}/>

            <Coins position={[-1, 3, -41]} catchCoin={handleCoins} />
            <Coins2 position={[1, 4, -42]} catchCoin={handleCoins} />
            <Coins3 position={[1, 6, -45]} catchCoin={handleCoins} />
          </Physics>
          <WelcomeText position={[0, 0, -95]} />
          <Controls />
        </Canvas>
        <CharacterHudcueva_encantada coins={coins} />
        {gameOver && <GameOver />}
      </KeyboardControls>
    </Suspense>
  );
}