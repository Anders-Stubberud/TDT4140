import React, { useEffect, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { serverEndpoint, flashcardSet } from "@/state/zustand";

export default function SearchBar({ setData, setNum, setIsLoading }: any ) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {

    // Retrieve all flashcards ass default
    let endpoint = serverEndpoint + '/api/getFlashcards'

    // If searching for something, retrive from search endpoint
    if (searchTerm.trim().length != 0)
      endpoint = serverEndpoint + '/api/getFlashcardsBySearch/' + searchTerm;
    
    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      setData(data);
      setNum(Math.ceil(data.length / 3))
      setIsLoading(false);
    } catch (error) {
      console.error("Feil ved sending av data:", error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  return (
    <div className="flex items-center space-x-2">
      <Input
        type="email"
        placeholder="Search for set"
        variant="bordered"
        className="flex-1"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button onClick={handleSearch} color="primary">
        Search
      </Button>
      <Button color="secondary">Filter</Button>
    </div>
  );
}
