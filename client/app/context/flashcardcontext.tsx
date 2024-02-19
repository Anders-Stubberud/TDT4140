"use client";

import React, { createContext, useState, FC } from "react";
import { ReactNode } from "react";

interface IFlashcardContext {
  content: string;
  setContent: (content: string) => void;
  isFlipped: boolean;
  setIsFlipped: (isFlipped: boolean) => void;
}

// Initialverdier for konteksten
const defaultState = {
  content: "",
  setContent: () => {},
  isFlipped: false,
  setIsFlipped: () => {},
};

interface FlashcardProviderProps {
  children: ReactNode;
}

export const FlashcardContext = createContext<IFlashcardContext>(defaultState);

export const FlashcardProvider = ({ children }: FlashcardProviderProps) => {
  const [content, setContent] = useState<string>("");
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  return (
    <FlashcardContext.Provider
      value={{ content, setContent, isFlipped, setIsFlipped }}
    >
      {children}
    </FlashcardContext.Provider>
  );
};
