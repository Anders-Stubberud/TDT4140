import React, { useContext, useState, useEffect } from "react";
import { FlashcardContext } from "@/app/context/flashcardcontext";
import "../styles/createflashcardform.css";

interface IFlashcard {
  question: string;
  answer: string;
}

export const CreateflashcardForm = () => {
  const { setQuestion, setAnswer, question, answer, isFlipped, setIsFlipped } =
    useContext(FlashcardContext);

  const [flashcards, setFlashcards] = useState<IFlashcard[]>([]);
  const [showSavePopup, setShowSavePopup] = useState(false);
  const [setName, setSetName] = useState("");
  const payload = setName + flashcards;

  useEffect(() => {
    console.log(flashcards);
    console.log(setName);
  }, [flashcards]); // Denne useEffect vil kjøre hver gang `flashcards` endrer seg

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const handleCreateCard = () => {
    if (question && answer) {
      const newFlashcard = { question, answer };
      setFlashcards([...flashcards, newFlashcard]);
      setQuestion("");
      setAnswer("");
      setIsFlipped(false);
    } else {
      alert("Please fill out both the question and answer.");
    }
  };

  const handleSaveSetClick = () => {
    setShowSavePopup(true);
  };

  const handleSaveSet = () => {
    console.log("Set Name:", setName);
    console.log("Flashcards:", flashcards);
    // Her ville du lagre settet med et navn og flashcards til din lagringsløsning
    setShowSavePopup(false);
    setSetName("");
    setFlashcards([]); // Rens liste etter lagring, eller kommenter ut denne linjen for å beholde flashcards i state
  };

  return (
    <div className="card-component">
      <div className="card-header">
        <div>Question: {flashcards.length + 1}</div>
        <button className="toggle-button" onClick={handleFlipCard}>
          {isFlipped ? "Frontside" : "Backside"}
        </button>
      </div>
      <div className="card-body">
        <input
          type="text"
          className="text-area"
          placeholder={isFlipped ? "Backside (Answer)" : "Frontside (Question)"}
          value={isFlipped ? answer : question}
          onChange={isFlipped ? handleAnswerChange : handleQuestionChange}
        />
        <button className="small-button">Add picture</button>
      </div>
      <div className="card-footer">
        <button className="button blue" onClick={handleCreateCard}>
          Create card
        </button>
        <button className="button red">DELETE CARD</button>
        <button className="button red">Discard set</button>
        <button className="button blue" onClick={handleSaveSetClick}>
          Save set
        </button>
      </div>
      {showSavePopup && (
        <div className="save-set-popup">
          <input
            type="text"
            placeholder="Set name"
            value={setName}
            onChange={(e) => setSetName(e.target.value)}
          />
          <button onClick={handleSaveSet}>Save</button>
          <button onClick={() => setShowSavePopup(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};
