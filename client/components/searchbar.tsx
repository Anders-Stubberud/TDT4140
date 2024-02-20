<<<<<<< HEAD
import React, { useState } from "react";
import "../styles/searchbar.css";
import { Button } from "@nextui-org/button";
import { db } from "@/firebase";
import { query, where, getDocs, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  // State hook for å holde søkeverdien

  const [searchValue, setSearchValue] = useState("");

  // Event handler for å oppdatere søkeverdien når brukeren skriver i feltet
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = async () => {
    if (!searchValue.trim()) {
      console.log("Please enter a search term.");
      return;
    }

    // Sett opp spørringen for å sjekke om 'fag' matcher searchValue
    const setsQuery = query(
      collection(db, "flashcardsets"),
      where("title", "==", searchValue)
    );

    try {
      const querySnapshot = await getDocs(setsQuery);
      if (querySnapshot.empty) {
        console.log("No matching subject found.");
      } else {
        querySnapshot.forEach((doc) => {
          console.log(`Found set: ${doc.id}`, doc.data());
        });
      }
    } catch (error) {
      console.error("Error searching for subject: ", error);
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen "
      id="searchbarWrapper"
    >
      <div id="inputSection">
        <input
          type="text"
          id="inputField"
          className="border p-2"
          placeholder="Search for set/user"
          value={searchValue}
          onChange={handleInputChange}
        />
      </div>
      <div id="buttonSection">
        <button id="search" className="buttonStyle" onClick={handleSearch}>
          Search
        </button>
=======
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
>>>>>>> dev
        <button className="buttonStyle">Filter</button>
        <button className="buttonStyle">Popular</button>
        <button className="buttonStyle" id="createSetButton">
          Create Set
        </button>
      </div>
    </div>
  );
};
