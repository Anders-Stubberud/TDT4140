"use client";

import { useState } from "react";
import "../styles/flashcard.css";
import { Button } from "@nextui-org/button";

export const FlashCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <>
      <div id="flashcardUpperSection">
        <Button color="primary">Quit session</Button>
      </div>
      <div id="maincontainer" onClick={handleFlip}>
        <div id="thecard" className={isFlipped ? "flipped" : ""}>
          <div id="thefront">
            <p>Dette er foran</p>
          </div>
          <div id="theback">
            <p>Og dette er bak</p>
          </div>
        </div>
      </div>
      <div id="flashcardLowerSection">
        <Button color="primary">Next</Button>
        <p>Question: </p>
        <Button color="primary">Prev</Button>
      </div>
    </>
  );
};
