"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";
import "../styles/searchbar.css";

export const SearchBar = () => {
  return (
    <div id="searchbarWrapper">
      <div id="inputSection">
        <input type="text" id="inputField" placeholder="Serch for set/user" />
      </div>
      <div id="buttonSection">
        <button className="buttonStyle">Filter</button>
        <button className="buttonStyle">Popular</button>
        <button className="buttonStyle" id="createSetButton">
          Create Set
        </button>
      </div>
    </div>
  );
};
