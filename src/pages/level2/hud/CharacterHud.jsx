import React, { useEffect, useState, useRef } from "react";
import "./Hud.css";

const CharacterHudlevel2= ({ coin }) => {
  const [displayText, setDisplayText] = useState("");

  const textToShow =
    "Bienvenidos a Cueva de Hielo recolecta las monedas y llega al final de la pista atravesando los obstaculos. En nuestro juego, puedes mover a tu personaje con las teclas W para avanzar, A para ir a la izquierda, D para moverte a la derecha y S para retroceder. Además, presiona la tecla T para activar un escudo protector que te resguardará del enemigo durante 15 segundos. ¿listos? ¡Buena suerte!";
  const currentIndexRef = useRef(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentIndex = currentIndexRef.current;

      if (currentIndex < textToShow.length) {
        setDisplayText((prevText) => prevText + textToShow[currentIndex]);
        currentIndexRef.current = currentIndex + 1;
      } else {
        clearInterval(intervalId);

        setTimeout(() => {
          setDisplayText("");
        }, 8000);
      }
    }, 40);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <div className="hud-container">
      
        <div className="hud-item2">
          <img
            src="./assets/level2/images/moneda.png"
            alt="coins"
            className="hud-icon"
          />
          <span className="hud-text">
            {coin}
          </span>
        </div>
      </div>

      

      

      {/* Condiciona la renderización del texto animado */}
      {displayText && (
        <div
          className="text-info"
          dangerouslySetInnerHTML={{ __html: displayText }}
        ></div>
      )}
    </>
  );
};

export default CharacterHudlevel2;