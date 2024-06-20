import React, { useEffect, useState, useRef } from 'react';
import { useGLTF,useTexture } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { useLifes } from '../../../context/ManagementLifes';
import { useNavigate } from 'react-router-dom';
import { RepeatWrapping } from "three";

export default function Model(props) {
    const { nodes, materials } = useGLTF('/assets/level1/models/world/game4.glb');
    
    const navigate = useNavigate();
    const group = useRef();
    const [color, setColor] = useState(new THREE.Color(0xffffff));
    const object1 = useRef(null);
    const { restarLifes } = useLifes();
    const PATH = '/assets/level1/models/floor/';
   

    const propsTexture = useTexture({
        map: PATH + "aerial_rocks_02_diff_4k.jpg",
        normalMap: PATH + "aerial_rocks_02_nor_dx_4k.jpg",
        roughnessMap: PATH + "aerial_rocks_02_rough_4k.jpg",
        displacementMap: PATH + "aerial_rocks_02_disp_4k.jpg",
    });


    propsTexture.map.repeat.set(4, 120);
    propsTexture.map.wrapS = propsTexture.map.wrapT = RepeatWrapping;

    propsTexture.normalMap.repeat.set(4, 120);
    propsTexture.normalMap.wrapS = propsTexture.normalMap.wrapT = RepeatWrapping;

    propsTexture.displacementMap.repeat.set(4, 120);
    propsTexture.displacementMap.wrapS = propsTexture.displacementMap.wrapT = RepeatWrapping;

    propsTexture.roughnessMap.repeat.set(4, 120);
    propsTexture.roughnessMap.wrapS = propsTexture.roughnessMap.wrapT = RepeatWrapping;


    
    useEffect(() => {
        const interval = setInterval(() => {
            setColor(new THREE.Color(Math.random(), Math.random(), Math.random()));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    

    const handleCollisionExit = (e) => {
        if (e.other.rigidBodyObject.name === 'AVATAR') {
            restarLifes();
            window.location.reload();
        }
    };

    const handleCollisionExits = (e) => {
        if (e.other.rigidBodyObject.name === 'AVATAR') {
            
           
            navigate('/cueva_encantada');
        }
    };


    

    const soundRef = useRef();

    useEffect(() => {
      // Cargar el sonido de fondo
      const listener = new THREE.AudioListener();
      const sound = new THREE.Audio(listener);
      const audioLoader = new THREE.AudioLoader();
  
      audioLoader.load('/assets/level1/sounds/Y2meta.app - Dracovallis - Morning In The Forest (Celtic Music) (128 kbps).mp3', (buffer) => { // Cambia 'background.mp3' al nombre de tu archivo de sonido
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.5);
        sound.play();
      });
  
      soundRef.current = sound;
  
      return () => {
        // Detener el sonido cuando el componente se desmonte
        soundRef.current?.stop();
      };
    }, []);



    return (
        <group ref={group} {...props} dispose={null}>

             
            
            <group name="Scene">
                <RigidBody type="fixed" colliders="trimesh">
                    <mesh
                        name="walls"
                        geometry={nodes.walls.geometry}
                        
                    >
                <meshStandardMaterial {...propsTexture} opacity={0} transparent={false} />
                </mesh>
                </RigidBody>
                <RigidBody type="fixed" colliders="trimesh">
                <mesh name="floor" geometry={nodes.floor.geometry} position={[0, 0.857, 0]}>
                <meshStandardMaterial {...propsTexture} opacity={1} transparent={false} />
               </mesh>
               </RigidBody>

               <mesh
          name="tree1"
          castShadow
          receiveShadow
          geometry={nodes.tree1.geometry}
          material={materials['Material.003']}
          position={[-7.731, -0.053, 64.495]}>
          <mesh
            name="leaves001"
            castShadow
            receiveShadow
            geometry={nodes.leaves001.geometry}
            material={materials['Material.004']}
          />
        </mesh>
        <mesh
          name="tree2"
          castShadow
          receiveShadow
          geometry={nodes.tree2.geometry}
          material={materials['Material.005']}
          position={[8.137, -0.053, 75.199]}>
          <mesh
            name="leaves002"
            castShadow
            receiveShadow
            geometry={nodes.leaves002.geometry}
            material={materials['Material.006']}
          />
        </mesh>
        <mesh
          name="tree4"
          castShadow
          receiveShadow
          geometry={nodes.tree4.geometry}
          material={materials['Material.009']}
          position={[7.475, -0.053, 43.76]}>
          <mesh
            name="leaves005"
            castShadow
            receiveShadow
            geometry={nodes.leaves005.geometry}
            material={materials['Material.010']}
          />
        </mesh>
        <mesh
          name="tree3"
          castShadow
          receiveShadow
          geometry={nodes.tree3.geometry}
          material={materials['Material.013']}
          position={[7.692, -0.053, 57.852]}>
          <mesh
            name="leaves003"
            castShadow
            receiveShadow
            geometry={nodes.leaves003.geometry}
            material={materials['Material.014']}
            position={[-0.073, 0, 0]}
          />
        </mesh>
        <mesh
          name="tree5"
          castShadow
          receiveShadow
          geometry={nodes.tree5.geometry}
          material={materials['Material.015']}
          position={[-8.374, -0.053, 85.016]}>
          <mesh
            name="leaves004"
            castShadow
            receiveShadow
            geometry={nodes.leaves004.geometry}
            material={materials['Material.016']}
            position={[0.288, 0, 0.011]}
          />
        </mesh>
        <mesh
          name="tree6"
          castShadow
          receiveShadow
          geometry={nodes.tree6.geometry}
          material={materials['Material.018']}
          position={[-6.468, -0.053, 51.832]}>
          <mesh
            name="leaves006"
            castShadow
            receiveShadow
            geometry={nodes.leaves006.geometry}
            material={materials['Material.017']}
            position={[-0.073, 0, 0]}
          />
        </mesh>
        <mesh
          name="tree9"
          castShadow
          receiveShadow
          geometry={nodes.tree9.geometry}
          material={materials['Material.019']}
          position={[7.39, -0.053, 91.4]}>
          <mesh
            name="leaves007"
            castShadow
            receiveShadow
            geometry={nodes.leaves007.geometry}
            material={materials['Material.020']}
            position={[-0.073, 0, 0]}
          />
        </mesh>
        <RigidBody type="fixed" colliders="trimesh">
          <mesh  
          name="Cylinder"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder.geometry}
          material={materials['Material.041']}
          position={[0, 0.863, 0]}
          rotation={[0, 0, 1.587]}
          scale={[1, 10, 1]}
        />
        </RigidBody>
        <mesh
          name="Cylinder1"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder1.geometry}
          material={materials['Material.040']}
          position={[0, 0.863, 16.088]}
          rotation={[0, 0, 1.587]}
          scale={[1, 10, 1]}
        />
        <mesh
          name="Cylinder2"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder2.geometry}
          material={materials['Material.042']}
          position={[0, 1.004, -13.036]}
          rotation={[0, 0, 1.587]}
          scale={[1, 10, 1]}
        />
        <mesh
          name="Cylinder001"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001.geometry}
          material={materials['Material.043']}
          position={[0, 0.863, -24.082]}
          rotation={[0, 0, 1.587]}
          scale={[1, 10, 1]}
        />
        <mesh
          name="Cylinder3"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder3.geometry}
          material={materials['Material.044']}
          position={[0, 0.863, -42.186]}
          rotation={[0, 0, 1.587]}
          scale={[1, 10, 1]}
        />
        <mesh
          name="tree7"
          castShadow
          receiveShadow
          geometry={nodes.tree7.geometry}
          material={materials['Material.021']}
          position={[-7.37, -0.053, 93.101]}>
          <mesh
            name="leaves008"
            castShadow
            receiveShadow
            geometry={nodes.leaves008.geometry}
            material={materials['Material.022']}
            position={[-0.073, 0, 0]}
          />
        </mesh>
        <mesh
          name="tree10"
          castShadow
          receiveShadow
          geometry={nodes.tree10.geometry}
          material={materials['Material.025']}
          position={[-8.026, -0.053, 43.76]}>
          <mesh
            name="leaves009"
            castShadow
            receiveShadow
            geometry={nodes.leaves009.geometry}
            material={materials['Material.026']}
          />
        </mesh>
        <mesh
          name="tree11"
          castShadow
          receiveShadow
          geometry={nodes.tree11.geometry}
          material={materials['Material.027']}
          position={[-8.276, -0.053, 26.481]}>
          <mesh
            name="leaves010"
            castShadow
            receiveShadow
            geometry={nodes.leaves010.geometry}
            material={materials['Material.028']}
          />
        </mesh>
        <mesh
          name="tree12"
          castShadow
          receiveShadow
          geometry={nodes.tree12.geometry}
          material={materials['Material.029']}
          position={[7.561, -0.053, 26.481]}>
          <mesh
            name="leaves011"
            castShadow
            receiveShadow
            geometry={nodes.leaves011.geometry}
            material={materials['Material.030']}
          />
        
        </mesh>
                <RigidBody  type="fixed" onCollisionEnter={handleCollisionExits} colliders="trimesh">
                    <mesh
                        name="polySurface10"
                        geometry={nodes.polySurface10.geometry}
                        material={materials.lambert1}
                        position={[0.133, -1.001, -96.288]}
                        rotation={[Math.PI / 2, 0, -3.084]}
                        scale={0.248}
                    />
                    
                </RigidBody>
        <mesh
          name="Cylinder4"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder4.geometry}
          material={materials['Material.045']}
          position={[0, 0.863, -65.509]}
          rotation={[0, 0, 1.587]}
          scale={[1, 10, 1]}
        />
        <mesh
          name="Cylinder5"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder5.geometry}
          material={materials['Material.046']}
          position={[0, 0.863, -85.014]}
          rotation={[0, 0, 1.587]}
          scale={[1, 10, 1]}
        />
         <RigidBody type="fixed" colliders="trimesh">
      <mesh
        name="stair2"
        castShadow
        receiveShadow
        geometry={nodes.stair2.geometry}
        material={materials['Material.001']}
        position={[4.62, 0, -54.355]}
        rotation={[Math.PI, -0.792, Math.PI]}
      >
        <mesh
          name="Cylinder005"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder005.geometry}
          material={materials.Gitter_treppe}
        />
      </mesh>
    </RigidBody>
    <RigidBody type="fixed" colliders="trimesh">
      <mesh
        name="stair1"
        castShadow
        receiveShadow
        geometry={nodes.stair1.geometry}
        material={materials['Material.002']}
        position={[-7.123, 0, -16.881]}
        rotation={[0, -1.158, 0]}
      >
        <mesh
          name="Cylinder003"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder003.geometry}
          material={materials['Gitter_treppe.001']}
        />
      </mesh>
    </RigidBody>
        <group
          name="tesoro2"
          position={[2.401, 18.193, -53.715]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={1.538}>
          <group
            name="16167a798c8e4ad1bda23329ecb5e2bdfbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.025}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <group name="Base" rotation={[-Math.PI / 2, 0, 0.262]} scale={0.35}>
                    <mesh
                      name="Base_Base_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Base_Base_0.geometry}
                      material={materials.Base}
                    />
                  </group>
                  <group name="Chest" rotation={[-Math.PI / 2, 0, 0]} scale={[0.381, 0.394, 0.381]}>
                    <group name="Object_11" position={[0, 0, 5.667]}>
                      <mesh
                        name="Chest_Chest_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Chest_Chest_0.geometry}
                        material={materials.Chest}
                      />
                    </group>
                  </group>
                  <group
                    name="Coin001"
                    position={[3.052, 12.723, 1.236]}
                    rotation={[-1.153, 0.06, -0.229]}
                    scale={0.394}>
                    <mesh
                      name="Coin001_Base_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Coin001_Base_0.geometry}
                      material={materials.Base}
                    />
                  </group>
                  <group
                    name="Coin002"
                    position={[-6.766, 12.506, 0.908]}
                    rotation={[-1.476, -0.114, 2.402]}
                    scale={0.394}>
                    <mesh
                      name="Coin002_Base_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Coin002_Base_0.geometry}
                      material={materials.Base}
                    />
                  </group>
                  <group
                    name="Coin003"
                    position={[-2.995, 12.532, -1.406]}
                    rotation={[-1.66, -0.081, -0.234]}
                    scale={0.394}>
                    <mesh
                      name="Coin003_Base_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Coin003_Base_0.geometry}
                      material={materials.Base}
                    />
                  </group>
                  <group
                    name="Coin004"
                    position={[6.737, 12.456, -1.373]}
                    rotation={[-1.765, 0.104, -0.233]}
                    scale={0.394}>
                    <mesh
                      name="Coin004_Base_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Coin004_Base_0.geometry}
                      material={materials.Base}
                    />
                  </group>
                  <group
                    name="Coin005"
                    position={[-0.289, 12.876, 1.325]}
                    rotation={[-1.363, -0.014, -0.251]}
                    scale={0.394}>
                    <mesh
                      name="Coin005_Base_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Coin005_Base_0.geometry}
                      material={materials.Base}
                    />
                  </group>
                  <group
                    name="Coin006"
                    position={[1.203, 12.874, -1.686]}
                    rotation={[-1.775, 0.048, -0.244]}
                    scale={0.394}>
                    <mesh
                      name="Coin006_Base_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Coin006_Base_0.geometry}
                      material={materials.Base}
                    />
                  </group>
                  <group
                    name="Coin007"
                    position={[-5.732, 12.487, -2.6]}
                    rotation={[-1.684, -0.076, 2.829]}
                    scale={0.394}>
                    <mesh
                      name="Coin007_Base_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Coin007_Base_0.geometry}
                      material={materials.Base}
                    />
                  </group>
                  <group
                    name="Coin008"
                    position={[-1.621, 12.839, -1.219]}
                    rotation={[-1.69, -0.074, -2.791]}
                    scale={0.394}>
                    <mesh
                      name="Coin008_Base_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Coin008_Base_0.geometry}
                      material={materials.Base}
                    />
                  </group>
                  <group
                    name="Coin009"
                    position={[2.49, 12.516, 2.097]}
                    rotation={[-1.121, 0.003, 2.812]}
                    scale={0.394}>
                    <mesh
                      name="Coin009_Base_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Coin009_Base_0.geometry}
                      material={materials.Base}
                    />
                  </group>
                  <group
                    name="Coin010"
                    position={[5.506, 12.657, -0.808]}
                    rotation={[-1.695, 0.103, 2.843]}
                    scale={0.394}>
                    <mesh
                      name="Coin010_Base_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Coin010_Base_0.geometry}
                      material={materials.Base}
                    />
                  </group>
                  <group
                    name="Coin011"
                    position={[4.93, 12.145, -2.853]}
                    rotation={[-1.86, 0.086, 2.858]}
                    scale={0.394}>
                    <mesh
                      name="Coin011_Base_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Coin011_Base_0.geometry}
                      material={materials.Base}
                    />
                  </group>
                  <group
                    name="Coin012"
                    position={[-0.817, 13.103, 1.083]}
                    rotation={[-1.363, -0.012, 2.84]}
                    scale={0.394}>
                    <mesh
                      name="Coin012_Base_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Coin012_Base_0.geometry}
                      material={materials.Base}
                    />
                  </group>
                  <group
                    name="Coin013"
                    position={[1.908, 13.279, -1.241]}
                    rotation={[-1.743, 0.073, 2.851]}
                    scale={0.394}>
                    <mesh
                      name="Coin013_Base_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Coin013_Base_0.geometry}
                      material={materials.Base}
                    />
                  </group>
                  <group
                    name="Coin014"
                    position={[-5.855, 12.726, 1.286]}
                    rotation={[-1.448, 0.185, -1.865]}
                    scale={0.394}>
                    <mesh
                      name="Coin014_Base_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Coin014_Base_0.geometry}
                      material={materials.Base}
                    />
                  </group>
                  <group
                    name="Coin015"
                    position={[0.307, 12.353, 3.702]}
                    rotation={[-1.595, 0.004, 2.81]}
                    scale={0.394}>
                    <mesh
                      name="Coin015_Base_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Coin015_Base_0.geometry}
                      material={materials.Base}
                    />
                  </group>
                  <group
                    name="Coin016"
                    position={[-0.039, 13.252, -0.329]}
                    rotation={[-1.651, -0.415, 1.339]}
                    scale={0.394}>
                    <mesh
                      name="Coin016_Base_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Coin016_Base_0.geometry}
                      material={materials.Base}
                      position={[0.001, 0, 0]}
                    />
                  </group>
                  <group
                    name="Object_6"
                    position={[0, 13.69, -5.182]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={0.394}
                  />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials.Chest}
                    skeleton={nodes.Object_7.skeleton}
                  />
                  <primitive object={nodes._rootJoint} />
                </group>
              </group>
            </group>
          </group>
        </group>
        <group
          name="tesoro1"
          position={[-7.063, 18.333, -14.703]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={1.538}>
          <group
            name="16167a798c8e4ad1bda23329ecb5e2bdfbx001"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.025}>
            <group name="Object_2001">
              <group name="RootNode001">
                <group name="Object_4001">
                  <group name="Base001" rotation={[-Math.PI / 2, 0, 0.262]} scale={0.35}>
                    <mesh
                      name="Base_Base_0001"
                      castShadow
                      receiveShadow
                      geometry={nodes.Base_Base_0001.geometry}
                      material={materials['Base.001']}
                    />
                  </group>
                  <group
                    name="Chest001"
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={[0.381, 0.394, 0.381]}>
                    <group name="Object_11001" position={[0, 0, 5.667]}>
                      <mesh
                        name="Chest_Chest_0001"
                        castShadow
                        receiveShadow
                        geometry={nodes.Chest_Chest_0001.geometry}
                        material={materials['Chest.001']}
                      />
                    </group>
                  </group>
                  <group
                    name="Coin001001"
                    position={[3.052, 12.723, 1.236]}
                    rotation={[-1.153, 0.06, -0.229]}
                    scale={0.394}>
                    <mesh
                      name="Coin001_Base_0001"
                      castShadow
                      receiveShadow
                      geometry={nodes.Coin001_Base_0001.geometry}
                      material={materials['Base.001']}
                    />
                  </group>
                  <group
                    name="Coin002001"
                    position={[-6.766, 12.506, 0.908]}
                    rotation={[-1.476, -0.114, 2.402]}
                    scale={0.394}>
                    <mesh
                      name="Coin002_Base_0001"
                      castShadow
                      receiveShadow
                      geometry={nodes.Coin002_Base_0001.geometry}
                      material={materials['Base.001']}
                    />
                  </group>
                  <group
                    name="Coin003001"
                    position={[-2.995, 12.532, -1.406]}
                    rotation={[-1.66, -0.081, -0.234]}
                    scale={0.394}>
                    <mesh
                      name="Coin003_Base_0001"
                      castShadow
                      receiveShadow
                      geometry={nodes.Coin003_Base_0001.geometry}
                      material={materials['Base.001']}
                    />
                  </group>
                  <group
                    name="Coin004001"
                    position={[6.737, 12.456, -1.373]}
                    rotation={[-1.765, 0.104, -0.233]}
                    scale={0.394}>
                    <mesh
                      name="Coin004_Base_0001"
                      castShadow
                      receiveShadow
                      geometry={nodes.Coin004_Base_0001.geometry}
                      material={materials['Base.001']}
                    />
                  </group>
                  <group
                    name="Coin005001"
                    position={[-0.289, 12.876, 1.325]}
                    rotation={[-1.363, -0.014, -0.251]}
                    scale={0.394}>
                    <mesh
                      name="Coin005_Base_0001"
                      castShadow
                      receiveShadow
                      geometry={nodes.Coin005_Base_0001.geometry}
                      material={materials['Base.001']}
                    />
                  </group>
                  <group
                    name="Coin006001"
                    position={[1.203, 12.874, -1.686]}
                    rotation={[-1.775, 0.048, -0.244]}
                    scale={0.394}>
                    <mesh
                      name="Coin006_Base_0001"
                      castShadow
                      receiveShadow
                      geometry={nodes.Coin006_Base_0001.geometry}
                      material={materials['Base.001']}
                    />
                  </group>
                  <group
                    name="Coin007001"
                    position={[-5.732, 12.487, -2.6]}
                    rotation={[-1.684, -0.076, 2.829]}
                    scale={0.394}>
                    <mesh
                      name="Coin007_Base_0001"
                      castShadow
                      receiveShadow
                      geometry={nodes.Coin007_Base_0001.geometry}
                      material={materials['Base.001']}
                    />
                  </group>
                  <group
                    name="Coin008001"
                    position={[-1.62, 12.838, -1.219]}
                    rotation={[-1.69, -0.074, -2.791]}
                    scale={0.394}>
                    <mesh
                      name="Coin008_Base_0001"
                      castShadow
                      receiveShadow
                      geometry={nodes.Coin008_Base_0001.geometry}
                      material={materials['Base.001']}
                    />
                  </group>
                  <group
                    name="Coin009001"
                    position={[2.49, 12.516, 2.097]}
                    rotation={[-1.121, 0.003, 2.812]}
                    scale={0.394}>
                    <mesh
                      name="Coin009_Base_0001"
                      castShadow
                      receiveShadow
                      geometry={nodes.Coin009_Base_0001.geometry}
                      material={materials['Base.001']}
                    />
                  </group>
                  <group
                    name="Coin010001"
                    position={[5.506, 12.657, -0.808]}
                    rotation={[-1.695, 0.103, 2.843]}
                    scale={0.394}>
                    <mesh
                      name="Coin010_Base_0001"
                      castShadow
                      receiveShadow
                      geometry={nodes.Coin010_Base_0001.geometry}
                      material={materials['Base.001']}
                    />
                  </group>
                  <group
                    name="Coin011001"
                    position={[4.93, 12.145, -2.853]}
                    rotation={[-1.86, 0.086, 2.858]}
                    scale={0.394}>
                    <mesh
                      name="Coin011_Base_0001"
                      castShadow
                      receiveShadow
                      geometry={nodes.Coin011_Base_0001.geometry}
                      material={materials['Base.001']}
                    />
                  </group>
                  <group
                    name="Coin012001"
                    position={[-0.817, 13.103, 1.083]}
                    rotation={[-1.363, -0.012, 2.84]}
                    scale={0.394}>
                    <mesh
                      name="Coin012_Base_0001"
                      castShadow
                      receiveShadow
                      geometry={nodes.Coin012_Base_0001.geometry}
                      material={materials['Base.001']}
                    />
                  </group>
                  <group
                    name="Coin013001"
                    position={[1.908, 13.279, -1.241]}
                    rotation={[-1.743, 0.073, 2.851]}
                    scale={0.394}>
                    <mesh
                      name="Coin013_Base_0001"
                      castShadow
                      receiveShadow
                      geometry={nodes.Coin013_Base_0001.geometry}
                      material={materials['Base.001']}
                    />
                  </group>
                  <group
                    name="Coin014001"
                    position={[-5.855, 12.726, 1.286]}
                    rotation={[-1.448, 0.185, -1.865]}
                    scale={0.394}>
                    <mesh
                      name="Coin014_Base_0001"
                      castShadow
                      receiveShadow
                      geometry={nodes.Coin014_Base_0001.geometry}
                      material={materials['Base.001']}
                    />
                  </group>
                  <group
                    name="Coin015001"
                    position={[0.307, 12.353, 3.702]}
                    rotation={[-1.595, 0.004, 2.81]}
                    scale={0.394}>
                    <mesh
                      name="Coin015_Base_0001"
                      castShadow
                      receiveShadow
                      geometry={nodes.Coin015_Base_0001.geometry}
                      material={materials['Base.001']}
                    />
                  </group>
                  <group
                    name="Coin016001"
                    position={[-0.039, 13.252, -0.329]}
                    rotation={[-1.651, -0.415, 1.339]}
                    scale={0.394}>
                    <mesh
                      name="Coin016_Base_0001"
                      castShadow
                      receiveShadow
                      geometry={nodes.Coin016_Base_0001.geometry}
                      material={materials['Base.001']}
                    />
                  </group>
                  <group
                    name="Object_6001"
                    position={[0, 13.69, -5.182]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={0.394}
                  />
                  <skinnedMesh
                    name="Object_7001"
                    geometry={nodes.Object_7001.geometry}
                    material={materials['Chest.001']}
                    skeleton={nodes.Object_7001.skeleton}
                  />
                  <primitive object={nodes._rootJoint_1} />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>

                
        
      
        
    );
}

useGLTF.preload('/assets/level1/models/world/game4.glb');
