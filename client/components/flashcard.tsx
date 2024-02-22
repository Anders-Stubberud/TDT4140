import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import "../styles/flashcard.css";

interface Card {
  question: string;
  answer: string;
}

interface FlashcardSet {
  name: string;
  cards: Card[];
}

export const FlashCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcardSet, setFlashcardSet] = useState<FlashcardSet | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const setName = "Steiner"; // Settet du vil ha spørsmål fra

  useEffect(() => {
    async function fetchFlashcards() {
      try {
        const response = await fetch("http://localhost:5001/api/getFlashcards");
        if (!response.ok) {
          throw new Error("Failed to fetch flashcards");
        }
        const flashcardsData: any[] = await response.json();
        const setNameData = flashcardsData.find((set) => set.name === setName);

        if (setNameData && setNameData.cards) {
          const cardsArray: Card[] = Object.keys(setNameData.cards).map(
            (key) => ({
              question: key,
              answer: setNameData.cards[key],
            })
          );
          setFlashcardSet({ name: setName, cards: cardsArray });
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchFlashcards();
  }, [setName]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const goToNextCard = () => {
    setCurrentCardIndex((prevIndex) =>
      Math.min(prevIndex + 1, flashcardSet?.cards.length - 1 || 0)
    );
  };

  const goToPrevCard = () => {
    setCurrentCardIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  if (!flashcardSet) {
    return <div>Loading flashcards...</div>;
  }

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
              <p>{flashcardSet.cards[currentCardIndex].question}</p>
            </div>
            <div id="theback">
              <p>{flashcardSet.cards[currentCardIndex].answer}</p>
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
            Question: {currentCardIndex + 1} of {flashcardSet.cards.length}
          </p>
          <Button
            color="primary"
            onClick={goToNextCard}
            disabled={currentCardIndex >= flashcardSet.cards.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};
