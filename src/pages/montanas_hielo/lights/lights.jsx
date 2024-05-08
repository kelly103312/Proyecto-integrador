import { useControls } from "leva";
import { useMemo } from "react";
import { Color } from "three";
import { useRef } from "react";

const Lights = () => {
    const spotLightRef = useRef(null);
    const HemisphereRef = useRef(null);

    const optionHemisphereLight = useMemo(() => {

        return {
            intensityHL: { value: 2, Min: 0, Max: 1000, Step: 1 },
            colorHL: { value: "#ef7f15"},
        }
    }, []);

    const optionSpotLight = useMemo(() => {

        return {
            intensitySL: { value: 10, Min: 0, Max: 1000, Step: 1 },
            colorSL: { value: "white"},
            positionSL: { value: [30, 5, 0] }   
        }
    }, []);

const {intensitySL, colorSL, positionSL} = useControls("Spot Light", optionSpotLight);
const {intensityHL, colorHL} = useControls("Hemisphere Light", optionHemisphereLight);

  return<>
            <ambientLight 
                intensity={0.1}
                // color={new Color("#49F749")}
            />
            <directionalLight
                castShadow={true}
                position={[0, 5, -90]} 
                color={new Color("#FFB200")}
                intensity={4}
            />

            {/* <pointLight
                position={[1, 5, 1]}
                color={new Color("#B26BFA")}
                intensity={50}
                distance={30}
                decay={3}
                
            /> */}

            <spotLight
                ref={spotLightRef}
                position={[-4, 5, 0]}
                color="blue"
                intensity={30}
                angle={Math.PI/3}
            />
            

            <hemisphereLight
                position={[0,2,0]}
                skyColor={new Color("#FD1067")}
                groundColor={new Color("#F6279B")}
                color={colorHL}
                intensity={intensityHL} 
            />

    </>
}

export default Lights;