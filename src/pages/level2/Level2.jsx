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
import Coin from "./figures/Coin";
import Coin2 from "./figures/Coin2";
import Coin3 from "./figures/Coin3";
import CharacterHudlevel2 from "./hud/CharacterHud";
import { Vid } from "./layout/Vid";
import { useLifes } from '../../context/ManagementLifes';
import GameOver from "./world/GameOver";
import { Obs } from "./figures/Obs";
import { UseCheckpoints } from "../../context/ManagementCheckpoints";
import { Checkpoint } from "./checkpoints/Checkpoint";
import { readCheckpoint, pointValidated} from '../../db/checkpoints-collection'
import { Characters } from "./characters/Characters";
import { Model } from "./figures/Enemigo";


export default function Level2() {

    const map = useMovements();
    const auth = useAuth()
    const [players] = useAtom(playersAtom);
    const [coin, setCoin] = useState(0);
    const { lifes } = useLifes();
    const [gameOver, setGameOver] = useState(false);
    const { checkpoints, obtained } = UseCheckpoints();

    const readCheckpoints = async (email, nameLevel) => {
        const { success, checkpointData } = await readCheckpoint(email, nameLevel)
        if (success) {
            await obtained();
            localStorage.setItem('position', JSON.stringify(checkpointData[0].position));
        }
    }

    useEffect(() => {
        if (auth.userLogged) {
            const { displayName, email } = auth.userLogged
            saveDataUser({
                displayName: displayName,
                email: email,
            })
            readCheckpoints(email, "level2");
        }
    }, [auth.userLogged])


    /**
     * Save the user data in the DB.
     * @param {*} valuesUser 
     */
    const saveDataUser = async (valuesUser) => {
        const { success } = await readUser(valuesUser.email)
        if (!success)
            await createUser(valuesUser)
    }

    const handleCoin = () => {
        setCoin((coin) => coin + 1);
    };

    const handleObsCollision = () => {


        if (lifes === 0) {
            setGameOver(true);
        }
    };

    useEffect(() => {
        if (lifes === 0) {
            setGameOver(true);
        }
    }, [lifes]);


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
        }
    }, [auth.userLogged])
    /**
     * Emit to the server that the player is connected.
     */
    useEffect(() => {
        socket.emit("player-connected")
    }, [])

    return (
        <Suspense fallback={<Loader />}>
            <KeyboardControls map={map} >
                <Players />
                <Vid />
                <Logout />
                <EcctrlJoystick />
                <Canvas shadows={true} camera={{
                    position: [0, 1, 0],
                    rotation: [0, 0, 0],
                }} >
                    {/* <Perf position="top-left" /> */}
                    <Lights />
                    <Environments />
                    <Physics debug={false}>
                        <World />
                        <Avatar />
                        <Checkpoint position={[20.2,1.5,-88.5]}/>
                        <Coin position={[22.5, 1, -59]} catchCoin={handleCoin} />
                        <Coin2 position={[-18, 2, -41]} catchCoin={handleCoin} />
                        <Coin3 position={[22.5, 1, -41]} catchCoin={handleCoin} />
                        <Obs position={[-14, 6, -48]} velocity={4} onCollide={handleObsCollision} />
                        <Obs position={[-14, 1, -55]} velocity={19} onCollide={handleObsCollision} />
                        <Obs position={[-14, 1, -68]} velocity={7} onCollide={handleObsCollision} />
                        <Obs position={[-14, 1, -73]} velocity={3} onCollide={handleObsCollision} />
                        <Obs position={[-14, 6, -77]} velocity={12} onCollide={handleObsCollision} />
                        <Characters/>
                        <Model position={[0, 0, -90]}/>

                    </Physics>
                    <WelcomeText position={[1, 15, -93]} />
                    <Controls />
                </Canvas>
                <CharacterHudlevel2 coin={coin} />
                {gameOver && <GameOver />}
            </KeyboardControls>
        </Suspense>
    )
}
