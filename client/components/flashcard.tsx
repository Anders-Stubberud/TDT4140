import React, {
  CSSProperties,
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Button } from "@nextui-org/button";
import { Progress, Spinner, card } from "@nextui-org/react";
import { FlashcardArray } from "react-quizlet-flashcard";
import {
  toggleSet,
  flashcard,
  flashcardSet,
  serverEndpoint,
  JSONToFlashcardSet,
} from "@/state/zustand";
import "../styles/flashcard.css";
// @ts-ignore
import ReactCardFlip from "react-card-flip";
import { useRouter } from "next/navigation";
import ConfettiExplosion from "react-confetti-explosion";

interface FlashcardRef {
  nextCard: () => void;
  prevCard: () => void;
  resetArray: () => void;
}

export const FlashCard = forwardRef<FlashcardRef, {}>(() => {
  const [flashcardSet, setFlashcardSet] = useState<flashcardSet | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const { setname, setSet } = toggleSet();
  const flashcardArrayRef = useRef<FlashcardRef>({
    nextCard: () => {},
    prevCard: () => {},
    resetArray: () => {},
  })!;

  const [cards, setCards] = useState<Flashcard[]>([]); // Use state to trigger re-render when cards change
  const [isFlipped, setIsFlipped] = useState(false);
  const router = useRouter();
  const [isExploding, setIsExploding] = React.useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [displayedCardIndex, setDisplayedCardIndex] = useState<number | null>(
    null
  );

  const defaultFrontContentStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  interface Flashcard {
    id: number;
    frontHTML: string | JSX.Element;
    backHTML: string | JSX.Element;
    frontContentStyle: CSSProperties | undefined;
    backContentStyle: CSSProperties | undefined;
  }

  let num = 1;

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        console.log(setname);
        let response;
        if (setname != "stock") {
          response = await fetch(
            serverEndpoint + `/api/getFlashcard/${setname}`
          );
        } else {
          response = await fetch(serverEndpoint + "/api/getFlashcards");
        }
        if (!response.ok) {
          throw new Error("Failed to fetch flashcards");
        }
        let result = await response.json();
        let flashcardSets = JSONToFlashcardSet(result);
        Object.keys(flashcardSets).length;
        if (setname != "stock") {
          const flashcardSetObject = flashcardSets[0];
          setFlashcardSet(flashcardSetObject);
          const newCards: Flashcard[] = flashcardSetObject.flashcards.map(
            (flashcard) => ({
              id: num++,
              frontHTML: flashcard.question,
              backHTML: flashcard.answer,
              frontContentStyle: defaultFrontContentStyle,
              backContentStyle: defaultFrontContentStyle,
            })
          );
          setCards(newCards);
        } else {
          const flashcardSetObject =
            flashcardSets[
              Math.floor(Math.random() * Object.keys(flashcardSets).length)
            ];
          setFlashcardSet(flashcardSetObject);
          const newCards: Flashcard[] = flashcardSetObject.flashcards.map(
            (flashcard) => ({
              id: num++,
              frontHTML: flashcard.question,
              backHTML: flashcard.answer,
              frontContentStyle: defaultFrontContentStyle,
              backContentStyle: defaultFrontContentStyle,
              isFlipped: false,
            })
          );
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
  //     backContentStyle: defaultFrontContentStyle,
  //   }));
  //   console.log(newCards);
  //   setCards(randomizeFlashcards(newCards));
  // };

  const goToNextCard = () => {
    setTimeout(() => {
      if (currentCardIndex < flashcardSet.flashcards.length - 1) {
        flashcardArrayRef.current?.nextCard();
        setIsFlipped(false);
        setCurrentCardIndex((prevIndex) =>
          Math.min(prevIndex + 1, flashcardSet.flashcards.length - 1)
        );
        setDisplayedCardIndex(currentCardIndex);
      } else {
        setIsFinished(true);
        setIsExploding(true);
      }
    }, 130);
  };

  const markAsHard = () => {
    setIsFlipped(false);

    if (currentCardIndex !== undefined) {
      const currentCard = cards[currentCardIndex];
      const newCards = [...cards];

      newCards.splice(currentCardIndex, 1);
      newCards.push(currentCard);
      setCards(newCards);
    }
  };

  const randomizeFlashcards = () => {
    const remainingCards = cards.filter(
      (_, index) => index !== displayedCardIndex
    );
    const copyList = [...remainingCards];

    for (let i = copyList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copyList[i], copyList[j]] = [copyList[j], copyList[i]];
    }

    if (displayedCardIndex !== null) {
      copyList.splice(displayedCardIndex, 0, cards[displayedCardIndex]);
    }
    return copyList;
  };

  const goToPrevCard = () => {
    setIsFlipped(false);
    flashcardArrayRef.current?.prevCard();
    setCurrentCardIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const exitSession = () => {
    router.push("/allSets");
  };

  const shuffleCards = () => {
    setCards(randomizeFlashcards());
  };

  useEffect(() => {
    if (flashcardArrayRef.current) {
      flashcardArrayRef.current.resetArray();
    }
  }, [flashcardSet]);

  useEffect(() => {
    if (isExploding) {
      setTimeout(() => {
        setIsExploding(false);
      }, 2000);
    }
  }, [isExploding]);

  if (!flashcardSet) {
    return <Spinner></Spinner>;
  }

  const d: Flashcard[] = [
    {
      id: 1,
      frontHTML: "a",
      backContentStyle: defaultFrontContentStyle,
      frontContentStyle: defaultFrontContentStyle,
      backHTML: "k",
    },
    {
      id: 2,
      frontHTML: "b",
      backContentStyle: defaultFrontContentStyle,
      frontContentStyle: defaultFrontContentStyle,
      backHTML: "k",
    },
  ];

  const progressValue =
    ((currentCardIndex + 1) / flashcardSet.flashcards.length) * 100;

  if (isFinished) {
    return (
      <div>
        {isExploding && <ConfettiExplosion />}
        <div className="text-center text-4xl font-bold mt-5">
          Congratulations! You have finished the set!
        </div>
        <Button
          name="exitButton"
          color="danger"
          className="mt-5"
          onClick={exitSession}
        >
          Go Back To Sets
        </Button>
      </div>
    );
  }

  if (currentCardIndex === flashcardSet.flashcards.length - 1) {
    return (
      <div>
        <Button
          name="hardButton"
          color="primary"
          className="mb-5"
          onClick={markAsHard}
        >
          Mark as difficult
        </Button>

        <div className=" flex flex-row items-center justify-center">
          <Button
            variant="ghost"
            className="border border-none"
            onClick={goToPrevCard}
          >
            <span className="text-2xl">&larr;</span>
          </Button>

          <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
            <div className="card" onClick={handleClick}>
              {cards[currentCardIndex]?.frontHTML}
            </div>

            <div className="card" onClick={handleClick}>
              {cards[currentCardIndex]?.backHTML}
            </div>
          </ReactCardFlip>

          <Button
            onClick={goToNextCard}
            variant="ghost"
            className="border border-none"
            // disabled={currentCardIndex >= flashcardSet.flashcards.length - 1}
          >
            Finish set
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

        <Button
          name="exitButton"
          color="danger"
          className="mt-5"
          onClick={exitSession}
        >
          Exit session
        </Button>
      </div>
    );
  }
  return (
    <div>
      <Button
        name="hardButton"
        color="primary"
        className="mb-5"
        onClick={markAsHard}
      >
        Mark as difficult
      </Button>

      <div className=" flex flex-row items-center justify-center">
        <Button
          variant="ghost"
          className="border border-none"
          onClick={goToPrevCard}
        >
          <span className="text-2xl">&larr;</span>
        </Button>

        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
          <div className="card" onClick={handleClick}>
            {cards[currentCardIndex]?.frontHTML}
          </div>

          <div className="card" onClick={handleClick}>
            {cards[currentCardIndex]?.backHTML}
          </div>
        </ReactCardFlip>

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

      <Button
        name="exitButton"
        color="danger"
        className="mt-5 mr-10"
        onClick={exitSession}
      >
        Exit session
      </Button>

      <Button
        name="shuffleButton"
        color="secondary"
        className="shuffle-button"
        onClick={shuffleCards}
      >
        Shuffle cards
      </Button>
    </div>
  );
});
