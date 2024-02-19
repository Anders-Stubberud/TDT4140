// FlashcardCreated.js
import React, { useContext } from "react";
import { FlashcardContext } from "@/app/context/flashcardcontext";
import "../styles/createflashcard.css";

export const FlashcardCreated = () => {
  const { question, answer, isFlipped, setIsFlipped } =
    useContext(FlashcardContext);

  const handleOnClick = () => {
    setIsFlipped(!isFlipped); // Setter isFlipped til det motsatte av dens nåværende verdi
  };

  return (
    <div id="maincontainer">
      <div
        id="thecard"
        onClick={handleOnClick}
        className={isFlipped ? "flipped" : ""}
      >
        <div id="thefront">
          {/* Viser 'Frontside' hvis question er tomt, ellers viser question */}
          <p className="flashText">{question || "Frontside"}</p>
        </div>
        <div id="theback">
          {/* Viser 'Backside' hvis answer er tomt, ellers viser answer */}
          <p className="flashText">{answer || "Backside"}</p>
        </div>
      </div>
    </div>
  );
};
