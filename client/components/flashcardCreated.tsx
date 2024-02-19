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
            <p>Dette er foran</p>
          </div>
          <div id="theback">
            <p>Og dette er bak</p>
          </div>
        </div>
      </div>
    </>
  );
};
