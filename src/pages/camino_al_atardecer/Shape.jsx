import { BallCollider, CuboidCollider, RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";

export default function Shape(props) {
    const shapeBodyRef = useRef()

    // const onHandleTorus = () => {
    //     // shapeBodyRef.current.applyImpulse({x:0, y: 0, z: -5}, true)
    //     shapeBodyRef.current.addTorque({x:0, y: 5, z: 0}, true)
    // }
    
    // useEffect(() => { 
    //     shapeBodyRef.current.addForce({x: 0, y: 0, z: -50}, true)
    // }, [shapeBodyRef.current])


    return (
      <RigidBody ref={shapeBodyRef} position={props.position} colliders="hull" >
        <mesh>
          <torusGeometry args={[1, 0.4, 16, 100]} />
          <meshStandardMaterial color="red" />
         
        </mesh>
      </RigidBody>
    );
}