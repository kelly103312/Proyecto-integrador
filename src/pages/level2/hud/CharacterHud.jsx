import React, { useEffect, useState, useRef } from "react";
import "./Hud.css";

const CharacterHudlevel2= ({ coin }) => {
  const [displayText, setDisplayText] = useState("");

  const textToShow =
    "Bienvenidos a Cueva de Hielo. Recolecta las monedas y llega al final de la pista atravesando los obstaculos ¿Listos? Iniciemos";
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