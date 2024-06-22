import React, { useEffect, useState, useRef } from "react";
import "./stylesHub.css";

const CharacterHubCamino = ({ coins }) => {
  const [displayText, setDisplayText] = useState("");

  const textToShow =
    "¡Bienvenidos al ultimo nivel!  El camino hacia el atardecer! <br><br>  Atraviesa el sendero, siguiendo el sol, para terminar esta aventura.";
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
      {displayText && (
        <div
          className="text-info"
          dangerouslySetInnerHTML={{ __html: displayText }}
        ></div>
      )}
    </>
  );
};

export default CharacterHubCamino;
