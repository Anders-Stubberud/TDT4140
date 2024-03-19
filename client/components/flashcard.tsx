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
  changeChosenSet
} from "@/state/zustand";
import "../styles/flashcard.css";
// @ts-ignore
import ReactCardFlip from "react-card-flip";
import { useRouter } from "next/navigation";
import ConfettiExplosion from "react-confetti-explosion";
import {Image} from "@nextui-org/react";
import NextImage from "next/image";
import Confetti from 'react-confetti-boom';

interface FlashcardRef {
  nextCard: () => void;
  prevCard: () => void;
  resetArray: () => void;
}

export const FlashCard = forwardRef<FlashcardRef, {}>(() => {
  // const [flashcardSet, setFlashcardSet] = useState<flashcardSet | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const { setname, setSet } = toggleSet();
  const flashcardArrayRef = useRef<FlashcardRef>({
    nextCard: () => {},
    prevCard: () => {},
    resetArray: () => {},
  })!;

  const { sett, setSett } = changeChosenSet();
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
    frontImageURL: string | undefined;
    backImageURL: string | undefined;
    frontContentStyle: CSSProperties | undefined;
    backContentStyle: CSSProperties | undefined;
  }

  let num = 1;

  useEffect(() => {
    console.log(sett);
    const chosenSet = setname !== 'stock' ? sett.find(card => card.flashcardSetID === setname) : sett[Math.floor(Math.random() * sett.length)];
    const newCards: Flashcard[] = chosenSet.flashcards.map(
      (flashcard: any) => ({
        id: num++,
        frontHTML: flashcard.question,
        backHTML: flashcard.answer,
        frontImageURL: flashcard.questionImage,
        backImageURL: flashcard.answerImage,
        frontContentStyle: defaultFrontContentStyle,
        backContentStyle: defaultFrontContentStyle,
        isFlipped: false,
      })
    );
    setCards(newCards);
    console.log(newCards);
  }, []);

  const goToNextCard = () => {
    setTimeout(() => {
      if (currentCardIndex < cards.length - 1) {
        flashcardArrayRef.current?.nextCard();
        setIsFlipped(false);
        setCurrentCardIndex((prevIndex) =>
          Math.min(prevIndex + 1, cards.length - 1)
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

  function shuffleArray(array: Flashcard []) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  function shuffleRemainingItems(array: Flashcard [], currentIndex: number) {
    const beforeIndex = array.slice(0, currentIndex);
    const afterIndex = array.slice(currentIndex);
    const shuffledAfterIndex = shuffleArray(afterIndex);
    const shuffledArray = beforeIndex.concat(shuffledAfterIndex);
  
    return shuffledArray;
  }

  const shuffleCards = () => {
    // setCards(randomizeFlashcards());
    const shuffledCards = shuffleRemainingItems(cards, currentCardIndex);
    setCards(shuffledCards);
  };

  useEffect(() => {
    if (flashcardArrayRef.current) {
      flashcardArrayRef.current.resetArray();
    }
  }, [cards]);

  useEffect(() => {
    if (isExploding) {
      setTimeout(() => {
        setIsExploding(false);
      }, 2000);
    }
  }, [isExploding]);

  if (!cards) {
    return <Spinner></Spinner>;
  }

  // const d: Flashcard[] = [
  //   {
  //     id: 1,
  //     frontHTML: "a",
  //     backContentStyle: defaultFrontContentStyle,
  //     frontContentStyle: defaultFrontContentStyle,
  //     backHTML: "k",
  //   },
  //   {
  //     id: 2,
  //     frontHTML: "b",
  //     backContentStyle: defaultFrontContentStyle,
  //     frontContentStyle: defaultFrontContentStyle,
  //     backHTML: "k",
  //   },
  // ];

  const progressValue =
    ((currentCardIndex + 1) / cards.length) * 100;

  if (isFinished) {
    return (
      <div>
        <Confetti 
          mode="boom" effectCount={3} effectInterval={1000} particleCount={1000}
          colors={['#ff577f', '#ff884b', '#ffd384', '#fff9b0', '#3498db']}
          y={0.6}
          deg={270}
          shapeSize={8}
          spreadDeg={45}
        />
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

  if (currentCardIndex === cards.length - 1) {
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
              {
                cards[currentCardIndex]?.frontImageURL && (
                  <Image
                    src={cards[currentCardIndex]?.frontImageURL}
                    as={NextImage}
                    height="1000"
                    width="1000"
                    className="h-44 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="thumbnail"
                  />
                )
              }
              {cards[currentCardIndex]?.frontHTML}
            </div>

            <div className="card" onClick={handleClick}>
              {
                cards[currentCardIndex]?.backImageURL && (
                  <Image
                    src={cards[currentCardIndex]?.backImageURL}
                    as={NextImage}
                    height="1000"
                    width="1000"
                    className="h-44 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="thumbnail"
                  />
                )
              }
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
              {
                cards[currentCardIndex]?.frontImageURL && (
                  <Image
                    src={cards[currentCardIndex]?.frontImageURL}
                    as={NextImage}
                    height="1000"
                    width="1000"
                    className="h-44 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="thumbnail"
                  />
                )
              }
              {cards[currentCardIndex]?.frontHTML}
            </div>

            <div className="card" onClick={handleClick}>
              {
                cards[currentCardIndex]?.backImageURL && (
                  <Image
                    src={cards[currentCardIndex]?.backImageURL}
                    as={NextImage}
                    height="1000"
                    width="1000"
                    className="h-44 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="thumbnail"
                  />
                )
              }
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
