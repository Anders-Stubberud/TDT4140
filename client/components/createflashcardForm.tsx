import { useContext } from "react";
import { FlashcardContext } from "@/app/context/flashcardcontext";
import "../styles/createflashcardform.css";

export const CreateflashcardForm = () => {
  const { content, isFlipped, setIsFlipped } = useContext(FlashcardContext);

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="card-component">
      <div className="card-header">
        <div> {"Question: 11"}</div>
        <button className="toggle-button" onClick={handleFlipCard}>
          {isFlipped ? "Frontside" : "Backside"}
        </button>
      </div>
      <div className="card-body">
        <textarea
          className="text-area"
          placeholder={isFlipped ? "Backside" : "Frontside"}
          value={content}
        />
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
