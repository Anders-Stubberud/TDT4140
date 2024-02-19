import { FlashcardContext } from "@/app/context/flashcardcontext";
import { useContext } from "react";
import "../styles/createflashcardform.css";

export const CreateflashcardForm = () => {
  const { setContent, setIsFlipped } = useContext(FlashcardContext);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleFlipCard = () => {
    setIsFlipped((flipped) => !flipped); // Flipp kortet når "Backside"-knappen trykkes
  };

  return (
    <div className="card-component">
      <div className="card-header">
        <div>QUESTION 6</div>
        <button className="toggle-button" onClick={handleFlipCard}>
          Backside
        </button>
      </div>
      <div className="card-body">
        <textarea
          className="text-area"
          placeholder="Frontside"
          onChange={handleTextChange}
        ></textarea>
        <button className="small-button">Add picture</button>
      </div>
      <div className="card-footer">
        <button className="button blue">Create card</button>
        <button className="button red">DELETE CARD</button>
        <button className="button red">Discard set</button>
        <div className="navigation">
          <button className="button">Prev</button>
          <button className="button">Next</button>
          <button className="button blue">Save set</button>
        </div>
      </div>
    </div>
  );
};
