import React, { useContext, useState, useEffect } from "react";
import { FlashcardContext } from "@/app/context/flashcardcontext";
import "../styles/createflashcardform.css";
import { flashcard, flashcardSet, serverEndpoint } from "@/state/zustand";
import {v4 as uuidv4} from "uuid";

export const CreateflashcardForm = () => {
  const { setQuestion, setAnswer, question, answer, isFlipped, setIsFlipped } =
    useContext(FlashcardContext);
  const [flashcards, setFlashcards] = useState<flashcard[]>([]);
  const [showSavePopup, setShowSavePopup] = useState(false);
  const [setName, setSetName] = useState("");
  const payload = setName + flashcards;

  useEffect(() => {
    console.log(flashcards);
    console.log(setName);
  }, [flashcards]); // Runs every time flashcards is used

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
      const newFlashcard: flashcard = {
        flashcardID: uuidv4(),
        question: question,
        answer: answer
      }
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

  const handleSaveSet = async () => {
    const payload: flashcardSet = {
      flashcardSetID: uuidv4(),
      name: setName,
      creatorID: "", // You may set the creator's ID here
      flashcards: flashcards
    };
    try {
      const response = await fetch(serverEndpoint + '/api/uploadSet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payload
        }),
      });
      if (response.ok) {
        console.log('success');
      } else {
        console.error('Failed to setup user:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setShowSavePopup(false);
    setSetName("");
    setFlashcards([]); // Flush set
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
