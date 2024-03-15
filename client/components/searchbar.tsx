import React, { useEffect, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { serverEndpoint, flashcardSet } from "@/state/zustand";
import { changeChosenSet } from "@/state/zustand";

export default function SearchBar({ setData, setNum, setIsLoading, data }: any ) {
  const [searchTerm, setSearchTerm] = useState("");
  const [first, setFirst] = useState(true);
  const { sett, setSett } = changeChosenSet();

  const handleSearch = async () => {
    const endpoint = serverEndpoint + '/api/getFlashcards';
    if (first) {
      setFirst(false);
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
    
        const receivedData = await response.json();
        setData(receivedData);
        setSett(receivedData);
        setNum(Math.ceil(receivedData.length / 3))
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    } else {
      const filteredData: any[] = sett.filter((value: any) => value.setTitle.toLowerCase().startsWith(searchTerm.toLowerCase()));
      setData(filteredData);
      setNum(Math.ceil(filteredData.length / 3))
      setIsLoading(false);
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
