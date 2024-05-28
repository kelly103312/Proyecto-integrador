import { Environment, EnvironmentMap, OrbitControls } from "@react-three/drei";
import World from "./world/World";
import { Color } from "three";
import Lights from "./lights/lights";
import Environments from "./staging/environments";
import { Suspense } from "react";
import WelcomeText from "./abstractions/WelcomeText";


const Experience = () => {
    return (
        <>
            {/* <Perf position="top-left" /> */}
            <OrbitControls   />
            <Suspense fallback={null}>
                <Lights />
                <Environments />
                <World />

                <WelcomeText position={[0, 4 , 160]} />
            </Suspense>
        </>
    )
}

export default Experience;