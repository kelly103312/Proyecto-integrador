import { Environment } from "@react-three/drei";

export default function Environments() {
    return (
        <Environment
            files={"https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/fouriesburg_mountain_midday_4k.hdr"}
            preset={null}
            background={false}
            ground={{
                height: 100,
                scale: 500,
                radius: 1000
            }}
        />
    )
}