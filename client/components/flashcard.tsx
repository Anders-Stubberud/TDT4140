import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import "../styles/flashcard.css";
import { toggleSet, flashcard, flashcardSet, serverEndpoint, JSONToFlashcardSet } from "@/state/zustand";

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
        console.log(response)
        const result = await response.json();
        const flashcardSets = JSONToFlashcardSet(result);
        const flashcardSetObject: flashcardSet = flashcardSets[0];
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
      Math.min(prevIndex + 1, flashcardSet?.flashcards.length - 1 || 0)
    );
  };

  const goToPrevCard = () => {
    setCurrentCardIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  if (!flashcardSet) {
    return <div>Loading flashcards...</div>;
  }

  const currentCard = flashcardSet.flashcards[currentCardIndex];

  return (
    <>
      <div id="wrapper">
        <p id="title">{flashcardSet.name}</p>
        <div id="flashcardUpperSection"></div>
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
          <p>
            Question: {currentCardIndex + 1} of {flashcardSet.flashcards.length}
          </p>
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
