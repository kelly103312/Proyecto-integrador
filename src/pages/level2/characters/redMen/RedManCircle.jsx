import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier"
import { useRef } from "react"

export default function RedManCircle({ position }) {
    const redManCircleRef = useRef(null)
    const redManCircleBodyRef = useRef(null)
    const { nodes, materials } = useGLTF('/assets/level2/models/red-mens/villano.glb')

    const radius = 3.5
    const speed = 1.5

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime()
        const angle = elapsedTime * speed
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius

        redManCircleRef.current.rotation.y = -angle

        redManCircleBodyRef.current?.setTranslation({
            x: position[0] + x,
            y: position[1],
            z: position[2] + z
        }, true)
    })

    return (
        <RigidBody ref={redManCircleBodyRef} type="fixed" position={position}>
            <group ref={redManCircleRef} dispose={null} scale={2.5}>
                <group name="Scene">
                    <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
                        <mesh
                            name="MutantMesh001"
                            geometry={nodes.MutantMesh001.geometry}
                            material={materials['mutant_M.001']}
                        />
                        <group
                            name="mixamorigHips"
                            position={[0, 4.552, -92.555]}
                            rotation={[-Math.PI / 2, 0, 0]}>
                            <group name="mixamorigSpine" position={[0, 10.764, 1.244]} rotation={[0.017, 0, 0.001]}>
                                <group name="mixamorigSpine1" position={[0, 13.063, 0]} rotation={[-0.088, 0, 0]}>
                                    <group
                                        name="mixamorigSpine2"
                                        position={[0, 13.021, 0]}
                                        rotation={[0.07, 0, -0.002]}>
                                        <group name="mixamorigNeck" position={[-0.012, 24.671, 2.028]}>
                                            <group name="mixamorigHead" position={[0, 8.817, 6.103]}>
                                                <group name="mixamorigHeadTop_End" position={[0, 20.494, -0.283]} />
                                            </group>
                                        </group>
                                        <group
                                            name="mixamorigLeftShoulder"
                                            position={[9.554, 16.065, -5.228]}
                                            rotation={[1.577, 0.115, -1.623]}>
                                            <group
                                                name="mixamorigLeftArm"
                                                position={[0, 18.036, 0]}
                                                rotation={[0.115, 0, -0.004]}>
                                                <group
                                                    name="mixamorigLeftForeArm"
                                                    position={[0, 26.415, 0]}
                                                    rotation={[0, 0, 0.055]}>
                                                    <group name="mixamorigLeftHand" position={[0, 26.753, 0]} />
                                                </group>
                                            </group>
                                        </group>
                                        <group
                                            name="mixamorigRightShoulder"
                                            position={[-9.554, 16.065, -5.228]}
                                            rotation={[1.577, -0.115, 1.623]}>
                                            <group
                                                name="mixamorigRightArm"
                                                position={[0, 17.955, 0]}
                                                rotation={[0.115, 0, 0.003]}>
                                                <group
                                                    name="mixamorigRightForeArm"
                                                    position={[0, 26.415, 0]}
                                                    rotation={[0, 0, -0.055]}>
                                                    <group name="mixamorigRightHand" position={[0, 26.753, 0]}>
                                                        <group name="mixamorigRightHandIndex1" position={[8.654, 18.448, -1.48]}>
                                                            <group name="mixamorigRightHandIndex2" position={[0, 7.514, 0]}>
                                                                <group
                                                                    name="mixamorigRightHandIndex3"
                                                                    position={[0, 7.489, 0]}
                                                                    rotation={[0.091, -0.003, -0.03]}>
                                                                    <group name="mixamorigRightHandIndex4" position={[0, 6.77, 0]} />
                                                                </group>
                                                            </group>
                                                        </group>
                                                        <group
                                                            name="mixamorigRightHandPinky1"
                                                            position={[-10.003, 17.508, 0.478]}
                                                            rotation={[0, 1.571, 0]}>
                                                            <group name="mixamorigRightHandPinky2" position={[0, 7.044, 0]}>
                                                                <group name="mixamorigRightHandPinky3" position={[0, 7.079, 0]}>
                                                                    <group name="mixamorigRightHandPinky4" position={[0, 7.093, 0]} />
                                                                </group>
                                                            </group>
                                                        </group>
                                                        <group
                                                            name="mixamorigRightHandThumb1"
                                                            position={[6.163, 2.492, 4.446]}
                                                            rotation={[0.377, -0.226, -0.741]}>
                                                            <group
                                                                name="mixamorigRightHandThumb2"
                                                                position={[0, 10.473, 0]}
                                                                rotation={[-0.077, -0.023, 0.232]}>
                                                                <group
                                                                    name="mixamorigRightHandThumb3"
                                                                    position={[0, 8.499, 0]}
                                                                    rotation={[-0.093, -0.028, 0.141]}>
                                                                    <group name="mixamorigRightHandThumb4" position={[0, 8.025, 0]} />
                                                                </group>
                                                            </group>
                                                        </group>
                                                    </group>
                                                </group>
                                            </group>
                                        </group>
                                    </group>
                                </group>
                            </group>
                            <group
                                name="mixamorigLeftUpLeg"
                                position={[13.656, -7.135, 0.13]}
                                rotation={[-0.041, 0, Math.PI]}>
                                <group name="mixamorigLeftLeg" position={[0, 35.95, 0]} rotation={[-0.118, 0, 0]}>
                                    <group name="mixamorigLeftFoot" position={[0, 34.409, 0]} rotation={[0.853, 0, 0]}>
                                        <group
                                            name="mixamorigLeftToeBase"
                                            position={[0, 21.288, 0]}
                                            rotation={[0.795, 0, 0]}>
                                            <group name="mixamorigLeftToe_End" position={[0, 16.884, 0]} />
                                        </group>
                                    </group>
                                </group>
                            </group>
                            <group
                                name="mixamorigRightUpLeg"
                                position={[-13.656, -7.135, 0.13]}
                                rotation={[-0.041, 0, Math.PI]}>
                                <group name="mixamorigRightLeg" position={[0, 35.95, 0]} rotation={[-0.118, 0, 0]}>
                                    <group name="mixamorigRightFoot" position={[0, 34.409, 0]} rotation={[0.853, 0, 0]}>
                                        <group
                                            name="mixamorigRightToeBase"
                                            position={[0, 21.288, 0]}
                                            rotation={[0.795, 0, 0]}>
                                            <group name="mixamorigRightToe_End" position={[0, 16.884, 0]} />
                                        </group>
                                    </group>
                                </group>
                            </group>
                        </group>
                    </group>
                </group>

            </group>

        </RigidBody>
    )
}

useGLTF.preload('/assets/level2/models/red-mens/villano.glb')
