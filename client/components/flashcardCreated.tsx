"use client";

import { useState } from "react";
import "../styles/createflashcard.css";
import { FlashcardContext } from "@/app/context/flashcardcontext";
import { useContext } from "react";

export const FlashcardCreated = () => {
  const { isFlipped, setIsFlipped } = useContext(FlashcardContext);

  return (
    <>
      <div id="maincontainer" onClick={() => setIsFlipped(!isFlipped)}>
        <div id="thecard" className={isFlipped ? "flipped" : ""}>
          <div id="thefront">
            <p>Front of card</p>
          </div>
          <div id="theback">
            <p>Back of card</p>
          </div>
        </div>
      </div>
    </>
  );
};
