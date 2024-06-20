import React, { useEffect, useState, useRef } from "react";
import "./Hud.css";

const CharacterHudcueva_encantada= ({ coins }) => {
  const [displayText, setDisplayText] = useState("");

  const textToShow =
    "¡Bienvenidos a Bosque  Encantado! <br><br>  Atraviesa el sendero hasta llegar a la puerta para avanzar al siguiente nivel y protegete con la letra t.";
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
        }, 2000);
      }
    }, 20);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <div className="hud-container">
      
        {/* Coins */}
        <div className="hud-item2">
          <img
            src="./assets/level1/images/dolar.png"
            alt="coins"
            className="hud-icon"
          />
          <span className="hud-text">
            {coins}
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

export default CharacterHudcueva_encantada;