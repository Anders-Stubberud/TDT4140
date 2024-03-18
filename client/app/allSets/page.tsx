"use client";

import FlashcardSetListDisplay from "@/components/flashcardSetListDisplay";
import { title } from "@/components/primitives";
import { DataTableDemo } from "@/components/scrollarea";
import SearchBar from "@/components/searchbar";
import FlashcardSetList from "@/components/flashcardSetList";
import { useEffect, useState } from "react";
import { changeChosenSet, flashcardSet, serverEndpoint } from "@/state/zustand";

export default function allSetsPage() {

  const [data, setData] = useState([]);
  const [num, setNum] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { sett, setSett } = changeChosenSet();

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = serverEndpoint + '/api/getFlashcards';
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
        setNum(Math.ceil(receivedData.length / 3));
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <div className="-mt-12">
      {/* <div style={{ padding: '20px' }}>
      <SearchBar data={data} setData={setData} setNum ={setNum} setIsLoading={setIsLoading}/>
      </div> */}
      <FlashcardSetList flashcardSets={data} number={num} isLoading={isLoading} />
    </div>
  );
}
