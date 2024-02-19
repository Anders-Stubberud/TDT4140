"use client";

import React, { createContext, useState, FC, ReactNode } from "react";

interface IFlashcardContext {
  question: string;
  setQuestion: (question: string) => void;
  answer: string;
  setAnswer: (answer: string) => void;
  isFlipped: boolean;
  setIsFlipped: (isFlipped: boolean) => void;
}

const defaultState: IFlashcardContext = {
  question: "",
  setQuestion: () => {},
  answer: "",
  setAnswer: () => {},
  isFlipped: false,
  setIsFlipped: () => {},
};

// Oppretter konteksten med standardverdiene definert ovenfor
export const FlashcardContext = createContext<IFlashcardContext>(defaultState);

interface FlashcardProviderProps {
  children: ReactNode;
}

export const FlashcardProvider: FC<FlashcardProviderProps> = ({ children }) => {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  return (
    <FlashcardContext.Provider
      value={{
        question,
        setQuestion,
        answer,
        setAnswer,
        isFlipped,
        setIsFlipped,
      }}
    >
      {children}
    </FlashcardContext.Provider>
  );
};

// Husk å eksportere Flashcard
