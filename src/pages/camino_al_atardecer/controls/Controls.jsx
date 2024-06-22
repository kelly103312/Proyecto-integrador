import { useKeyboardControls } from "@react-three/drei";
import { useAvatar } from "../../../context/AvatarContext";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Quaternion, Vector3 } from "three";

export default function Controls() {
  const { avatar, setAvatar } = useAvatar();
  const [sub, get] = useKeyboardControls();
  const controlsRef = useRef();
  const [runSound] = useState(new Audio("/assets/camino_al_atardecer/sounds/Run.wav"));
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const unsubscribe = sub(
      (state) =>
        state.forward || state.backward || state.leftward || state.rightward,
      (pressed) => {
        setAvatar((prev) => ({
          ...prev,
          animation: pressed ? "Running" : "Idle",
        }));
      }
    );
    return () => unsubscribe();
  }, [sub, setAvatar]);

  useEffect(() => {
    if (play) {
      runSound.currentTime = 0;
      runSound.volume = Math.random();
      runSound.play();
    } else {
      runSound.pause();
    }
  }, [play, runSound]);

  useFrame((state, delta) => {
    const { forward, backward, leftward, rightward } = get();
    if (forward || backward || leftward || rightward) {
      setPlay(true);
      // Add your movement logic here if needed
    } else {
      setPlay(false);
    }
  });

  return null;
}
