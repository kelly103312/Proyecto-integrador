import { Environment, Sky } from "@react-three/drei";

export default function Environments(){
    return<>
        <Environment
            files={"/assets/cueva_encantada/hdris/fouriesburg_mountain_midday_4k.hdr"}
            preset={null}
            background={true}
            ground={{
                heigh:30,
                scale: 400,
                radius: 700
            }}
        /> 

        
    </>

}