import React, { CSSProperties, useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react";
import { Button } from "@nextui-org/button";
import { Progress, Spinner, card } from "@nextui-org/react";
import { FlashcardArray } from "react-quizlet-flashcard";
import { toggleSet, flashcard, flashcardSet, serverEndpoint, JSONToFlashcardSet } from "@/state/zustand";
import "../styles/flashcard.css";

interface FlashcardRef {
  nextCard: () => void;
  prevCard: () => void;
  resetArray: () => void;
}

export const FlashCard = forwardRef<FlashcardRef, {}>(() => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcardSet, setFlashcardSet] = useState<flashcardSet | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const { setname, setSet } = toggleSet();
  const flashcardArrayRef = useRef<FlashcardRef>({ nextCard: () => {}, prevCard: () => {}, resetArray: () => {} })!;
  const [cards, setCards] = useState<Flashcard[]>([]); // Use state to trigger re-render when cards change

  const defaultFrontContentStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  interface Flashcard {
    id: number;
    frontHTML: string | JSX.Element;
    backHTML: string | JSX.Element;
    frontContentStyle: CSSProperties | undefined;
    backContentStyle: CSSProperties | undefined;
  }

  let num = 1;

  const markAsHard = () => {
    if (!flashcardSet) {
      return;
    }
    console.log(flashcardSet.flashcards);
    const newFlashcardSet = [...flashcardSet.flashcards];
    const currentCard = newFlashcardSet[currentCardIndex];

    //Removes(splice) the card from its current position and pushes it to the end
    newFlashcardSet.splice(currentCardIndex, 1);
    newFlashcardSet.push(currentCard);
    setFlashcardSet({ ...flashcardSet, flashcards: newFlashcardSet });
    const newCardss: Flashcard[] = newFlashcardSet.map((flashcard) => ({
      id: num++,
      frontHTML: flashcard.question,
      backHTML: flashcard.answer,
      frontContentStyle: defaultFrontContentStyle,
      backContentStyle: defaultFrontContentStyle
    }));
    setCards(newCardss);
    setIsFlipped(false);
  };


  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        console.log(setname);
        let response;
        if (setname != 'stock') {
          response = await fetch( serverEndpoint + `/api/getFlashcard/${setname}`);
        }
        else {
          response = await fetch(serverEndpoint + "/api/getFlashcards");
        }
        if (!response.ok) {
          throw new Error("Failed to fetch flashcards");
        }
        let result = await response.json();
        let flashcardSets = JSONToFlashcardSet(result);
        Object.keys(flashcardSets).length;
        if (setname != 'stock') {
          const flashcardSetObject = flashcardSets[0]
          setFlashcardSet(flashcardSetObject);
          const newCards: Flashcard[] = flashcardSetObject.flashcards.map((flashcard) => ({
            id: num++,
            frontHTML: flashcard.question,
            backHTML: flashcard.answer,
            frontContentStyle: defaultFrontContentStyle,
            backContentStyle: defaultFrontContentStyle
          }));
          setCards(newCards);
        }
        else {
          const flashcardSetObject = flashcardSets[Math.floor(Math.random() * Object.keys(flashcardSets).length)];
          setFlashcardSet(flashcardSetObject);
          const newCards: Flashcard[] = flashcardSetObject.flashcards.map((flashcard) => ({
            id: num++,
            frontHTML: flashcard.question,
            backHTML: flashcard.answer,
            frontContentStyle: defaultFrontContentStyle,
            backContentStyle: defaultFrontContentStyle
          }));
          setCards(newCards);
        }
        console.log(setname);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFlashcards();
  }, [setname]);

  // const populateCards = (flashcardSet: flashcardSet): void => {
  //   const newCards: Flashcard[] = flashcardSet.flashcards.map((flashcard) => ({
  //     id: num++,
  //     frontHTML: flashcard.question,
  //     backHTML: flashcard.answer,
  //     frontContentStyle: defaultFrontContentStyle,
  //     backContentStyle: defaultFrontContentStyle
  //   }));
  //   console.log(newCards)
  //   setCards(newCards);
  // };

  const goToNextCard = () => {
    flashcardArrayRef.current?.nextCard();
    setCurrentCardIndex((prevIndex) =>
      Math.min(prevIndex + 1, flashcardSet?.flashcards.length ?? 0 - 1)
    );
  };

  const goToPrevCard = () => {
    flashcardArrayRef.current?.prevCard();
    setCurrentCardIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  useEffect(() => {
    if (flashcardArrayRef.current) {
      flashcardArrayRef.current.resetArray();
    }
  }, [flashcardSet]);

  if (!flashcardSet) {
    return <Spinner></Spinner>;
  }

  const d: Flashcard[] = [
    {
      id: 1,
      frontHTML: 'a',
      backContentStyle: defaultFrontContentStyle,
      frontContentStyle: defaultFrontContentStyle,
      backHTML: 'k'
    },
    {
      id: 2,
      frontHTML: 'b',
      backContentStyle: defaultFrontContentStyle,
      frontContentStyle: defaultFrontContentStyle,
      backHTML: 'k'
    },
  ]

  const progressValue =
    ((currentCardIndex + 1) / flashcardSet.flashcards.length) * 100;

  return (
    <div>
      <Button name="hardButton" color="primary" className="mb-5" onClick={markAsHard}>
        Mark as difficult
      </Button>
      <div className=" flex flex-row items-center justify-center">
        <Button
          variant="ghost"
          className="border border-none"
          onClick={goToPrevCard}
          // disabled={currentCardIndex <= 0}
        >
          <span className="text-2xl">&larr;</span>
        </Button>
        <FlashcardArray controls={false} forwardRef={flashcardArrayRef} cards={cards} />
        <Button
          onClick={goToNextCard}
          variant="ghost"
          className="border border-none"
          // disabled={currentCardIndex >= flashcardSet.flashcards.length - 1}
        >
          
          <span className="text-2xl">&rarr;</span>
        </Button>
      </div>
      <div className="flex items-center justify-center content-center mt-3">
        <Progress
          isStriped
          aria-label="Progress"
          color="warning"
          value={progressValue}
          className="max-w-md"
        />
      </div>
    </div>
  );
});
