import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import "../styles/flashcard.css";
import { Progress } from "@nextui-org/react";
import {
  toggleSet,
  flashcard,
  flashcardSet,
  serverEndpoint,
  JSONToFlashcardSet,
} from "@/state/zustand";

export const FlashCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcardSet, setFlashcardSet] = useState<flashcardSet | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const { setname } = toggleSet();

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await fetch(serverEndpoint + "/api/getFlashcards");
        if (!response.ok) {
          throw new Error("Failed to fetch flashcards");
        }
        console.log(response);
        const result = await response.json();
        const flashcardSets = JSONToFlashcardSet(result);
        const flashcardSetObject: flashcardSet = flashcardSets[1];
        setFlashcardSet(flashcardSetObject);
        console.log(flashcardSetObject);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFlashcards();
  }, [setname]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const goToNextCard = () => {
    setCurrentCardIndex((prevIndex) =>
      Math.min(prevIndex + 1, flashcardSet?.flashcards.length ?? 0 - 1)
    );
  };

  const goToPrevCard = () => {
    setCurrentCardIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const markAsHard = () => {
    if (!flashcardSet) {
      return;
    }

    const newFlashcardSet = [...flashcardSet.flashcards];
    const currentCard = newFlashcardSet[currentCardIndex];

    //Removes(splice) the card from its current position and pushes it to the end
    newFlashcardSet.splice(currentCardIndex, 1);
    newFlashcardSet.push(currentCard);
    setFlashcardSet({ ...flashcardSet, flashcards: newFlashcardSet });
    setIsFlipped(false);
  };

  if (!flashcardSet) {
    return <div>Loading flashcards...</div>;
  }

  const currentCard = flashcardSet.flashcards[currentCardIndex];
  const progressValue =
    ((currentCardIndex + 1) / flashcardSet.flashcards.length) * 100;

  return (
    <>
      <div id="wrapper">
        <p id="title">{flashcardSet.name}</p>
        <div id="flashcardUpperSection">
          <Button name="hardButton" color="primary" onClick={markAsHard}>
            Mark as difficult
          </Button>
        </div>
        <div id="maincontainer">
          <div
            id="thecard"
            onClick={handleFlip}
            className={isFlipped ? "flipped" : ""}
          >
            <div id="thefront">
              <p>{currentCard.question}</p>
            </div>
            <div id="theback">
              <p>{currentCard.answer}</p>
            </div>
          </div>
        </div>
        <div id="flashcardLowerSection">
          <Button
            color="primary"
            onClick={goToPrevCard}
            disabled={currentCardIndex <= 0}
          >
            Prev
          </Button>
          <Progress
            isStriped
            arial-label="Progress"
            color="warning"
            value={progressValue}
            className="max-w-md"
          />
          <Button
            color="primary"
            onClick={goToNextCard}
            disabled={currentCardIndex >= flashcardSet.flashcards.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};
