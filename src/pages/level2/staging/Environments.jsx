import { Environment } from "@react-three/drei";

export default function Environments() {
    return (
        <Environment
            files={"/assets/level2/hdris/winter_river_4k.hdr"}
            preset={null}
            background={false}
            ground={{
                height: 20,
                scale: 300,
                radius: 500
            }}
        />
    )
}