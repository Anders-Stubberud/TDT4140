"use client";

import FlashcardSetListDisplay from "@/components/flashcardSetListDisplay";
import { title } from "@/components/primitives";
import { DataTableDemo } from "@/components/scrollarea";
import SearchBar from "@/components/searchbar";
import FlashcardSetList from "@/components/flashcardSetList";
import { useState } from "react";
import { flashcardSet } from "@/state/zustand";

export default function allSetsPage() {

  const [data, setData] = useState([]);
  const [num, setNum] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div>
      <div style={{ padding: '20px' }}>
      <SearchBar setData={setData} setNum ={setNum} setIsLoading={setIsLoading}/>
      </div>
      <FlashcardSetList flashcardSets={data} number={num} isLoading={isLoading} />
    </div>
  );
}
