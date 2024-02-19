"use client";

import { Button } from "@nextui-org/button";
import "../styles/createflashcard.css";

export const CreateflashcardForm = () => {
  return (
    <div className="card-component">
      <div className="card-header">
        <div>QUESTION 6</div>
        <button className="toggle-button">Backside</button>
      </div>
      <div className="card-body">
        <textarea className="text-area" placeholder="Frontside"></textarea>
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
