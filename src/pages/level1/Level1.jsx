import React, { useRef, useState } from 'react';
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

export default function Level1() {
    const map = useMovements();
    const { lifes } = useLifes();
    const [coins, setCoins] = useState(0); // Estado para mantener el número de monedas recogidas
    const [sphereCollisions, setSphereCollisions] = useState(0); // Estado para contar las colisiones con esferas

    // Función para manejar la recolección de monedas
    const handleCollectCoin = () => {
        setCoins(prevCoins => prevCoins + 1); // Incrementar el contador de monedas
    };

    // Función para manejar las colisiones con las esferas
     const handleSphereCollision = () => {
      

        // Reiniciar el juego si se han tocado las esferas tres veces
        if (lifes === 0 ) {
            window.location.reload();
        }
    };



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
                <Perf position="top-center" />
                <Suspense fallback={null}>
                    <Lights />
                    <BakeShadows />
                    <Environments />
                    <Physics debug={false}>
                        <World />
                        <Sphere position={[0, 0.4, -21]} velocity={3} onCollide={handleSphereCollision} />
                        <Sphere position={[0, 0.4, -31]} velocity={4} onCollide={handleSphereCollision} />
                        <Sphere position={[0, 0.4, -41]} velocity={5} onCollide={handleSphereCollision} />
                        <Sphere position={[0, 0.4, -51]} velocity={6} onCollide={handleSphereCollision} />
                        <Sphere position={[0, 0.4, -61]} velocity={7} onCollide={handleSphereCollision} />

                        <Charaters />

                        {/* Añadir las monedas y pasar la función handleCollectCoin como prop */}
                        <Coins position={[-2, 0.4, -3]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 0.4, -4]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 0.4, -5]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 0.4, -6]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 0.4, -10]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 0.4, -18]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 0.4, -19]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 0.4, -20]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 0.4, -21]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 0.4, -23]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 0.4, -24]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 0.4, -25]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 0.4, -26]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 0.4, -27]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 0.4, -28]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 0.4, -29]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 0.4, -41]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 0.4, -44]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 0.4, -47]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 0.4, -50]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 0.4, -53]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 0.4, -56]} onCollect={handleCollectCoin} />
                        <Coins position={[-2, 0.4, -59]} onCollect={handleCollectCoin} />
                    </Physics>

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
