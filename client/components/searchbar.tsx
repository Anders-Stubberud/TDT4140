import React, { useEffect, useState } from "react";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { serverEndpoint, flashcardSet } from "@/state/zustand";
import { changeChosenSet } from "@/state/zustand";
import SortIcon from "@/icons/sortIcon";

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
    <div className="flex justify-between px-14">

      <Input
        placeholder="Search for set"
        variant="bordered"
        className="w-80"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Select
        label="Tags"
        placeholder="Select tags"
        selectionMode="multiple"
        className="w-80"
        variant="bordered"
              >
        {[
          { value: 'math', label: 'Mathematics' },
          { value: 'science', label: 'Natural Sciences' },
          { value: 'english', label: 'English Language Arts' },
          { value: 'history', label: 'History' },
          { value: 'geography', label: 'Geography' },
          { value: 'foreign_languages', label: 'Foreign Languages' },
          { value: 'art', label: 'Art' },
          { value: 'music', label: 'Music' },
          { value: 'physical_education', label: 'Physical Education' },
          { value: 'computer_science', label: 'Computer Science' }
        ].map((item) => (
          <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
        ))}
      </Select>

      <Select
        label="Sort"
        placeholder="Select sort key"
        className="w-80"
        variant="bordered"
        startContent={<SortIcon />}
              >
        {[
          { value: 'Most popular', label: 'Most popular' },
          { value: 'Alphabetically', label: 'Alphabetically' },
        ].map((item) => (
          <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
        ))}
      </Select>

    </div>
);
}