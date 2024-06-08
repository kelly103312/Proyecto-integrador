import React, { useEffect, useState, useRef } from "react";
import "./Hud.css";

const CharacterHudcueva_encantada= ({ coins }) => {
  const [displayText, setDisplayText] = useState("");

  const textToShow =
    "¡Bienvenidos a Cueva Encantada! <br><br> Recolecta todas las monedas  para conseguir llegar al siguiente nivel.";
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
      
        {/* Coins */}
        <div className="hud-item2">
          <img
            src="./assets/cueva_encantada/images/dolar.png"
            alt="coins"
            className="hud-icon"
          />
          <span className="hud-text">
            {coins}/{3}
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