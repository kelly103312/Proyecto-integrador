import { Perf } from "r3f-perf";
import { KeyboardControls, Loader } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Suspense, useEffect, useState } from "react";
import WelcomeText from "./abstractions/WelcomeText";
import Lights from "./lights/Lights";
import Environments from "./staging/Environments";
import Avatar from "./characters/avatar/Avatar";
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
import CharacterHudcueva_encantada from "./hud/CharacterHud";
import Coins from "./Figures/Coins";
import Coins2 from "./Figures/Coins";
import Coins3 from "./Figures/Coins";
import { Cone } from "./Figures/Cone";
import { useLifes } from '../../context/ManagementLifes';
import GameOver from "./world/GameOver";
import { Gat} from "./layout/Gat";
import { readCheckpoint, pointValidated} from '../../db/checkpoints-collection'
import { UseCheckpoints } from "../../context/ManagementCheckpoints";
import { Checkpoint } from "./checkpoints/Checkpoint";
import { Characters } from "./characters/Characters";
import { Model } from "./Figures/Enemigo";



export default function Cueva_Encantada() {
  const [coins, setCoins] = useState(0);
  const map = useMovements();
  const auth = useAuth();
  const [players] = useAtom(playersAtom);
  const { lifes } = useLifes();
  const [gameOver, setGameOver] = useState(false);
  const {checkpoints,obtained} = UseCheckpoints();

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
            <Avatar />
            <Characters/>
            <Model position={[0, 0, -90]}/>   
            
            
            <Checkpoint position={[0,1,-70]}/>

            <Cone position={[0,1,-43]} velocity={3} onCollide={handleConeCollision}/>
            <Cone position={[0,1,-45]} velocity={4} onCollide={handleConeCollision}/>
            <Cone position={[0,1,-47]} velocity={5} onCollide={handleConeCollision}/>
            <Cone position={[0,1,-49]} velocity={6} onCollide={handleConeCollision}/>
            <Cone position={[0,1,-51]} velocity={7} onCollide={handleConeCollision}/>
            <Cone position={[0,1,-53]} velocity={8} onCollide={handleConeCollision}/>
            <Cone position={[0,1,-55]} velocity={9} onCollide={handleConeCollision}/>
            <Cone position={[0,1,-57]} velocity={10} onCollide={handleConeCollision}/>
            <Cone position={[0,1,-12]} velocity={6} onCollide={handleConeCollision}/>
            <Cone position={[0,1,-16]} velocity={6} onCollide={handleConeCollision}/>
            <Cone position={[0,1,-20]} velocity={6} onCollide={handleConeCollision}/>
            <Cone position={[0,1,-24]} velocity={6} onCollide={handleConeCollision}/>
            <Cone position={[0,1,-80]} velocity={6} onCollide={handleConeCollision}/>

            <Coins position={[-1, 3, -41]} catchCoin={handleCoins} />
            <Coins position={[0, 2, -12]} catchCoin={handleCoins} />
            <Coins position={[0, 2, -14]} catchCoin={handleCoins} />
            <Coins position={[0, 2, -16]} catchCoin={handleCoins} />
            <Coins position={[0, 2, -18]} catchCoin={handleCoins} />
            <Coins position={[0, 2, -20]} catchCoin={handleCoins} />
            <Coins position={[0, 2, -25]} catchCoin={handleCoins} />
            <Coins2 position={[1, 4, -42]} catchCoin={handleCoins} />
            <Coins3 position={[1, 6, -45]} catchCoin={handleCoins} />
            <Coins3 position={[-1, 6, -47]} catchCoin={handleCoins} />
            <Coins3 position={[1, 6, -49]} catchCoin={handleCoins} />
            <Coins3 position={[-1, 6, -51]} catchCoin={handleCoins} />
            <Coins3 position={[1, 6, -53]} catchCoin={handleCoins} />
            <Coins3 position={[-1, 6, -55]} catchCoin={handleCoins} />
            <Coins3 position={[1, 6, -57]} catchCoin={handleCoins} />
            <Coins3 position={[-1, 6, -59]} catchCoin={handleCoins} />
            <Coins3 position={[1, 4, -60]} catchCoin={handleCoins} />
            <Coins3 position={[-1, 3, -63]} catchCoin={handleCoins} />
            <Coins3 position={[0, 2, -87]} catchCoin={handleCoins} />
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