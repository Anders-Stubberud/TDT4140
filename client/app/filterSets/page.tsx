"use client";

import SearchBar from "@/components/searchbar";
import FlashcardSetList from "@/components/flashcardSetList";
import { useEffect, useState } from "react";
import { flashcardSet, editIndexing, tagsAvailable } from "@/state/zustand";

export default function FilterSetsPage() {

  const [data, setData] = useState([]);
  const [num, setNum] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div>
      <SearchBar setData={setData} setNum ={setNum} setIsLoading={setIsLoading}/>
      <div className="flex justify-center mt-6">
        <div className="scroll-m-20 -mb-2 border-b-1 pb-2 text-3xl font-semibold tracking-tight first:mt-0 w-11/12"></div>
      </div>
      <FlashcardSetList flashcardSets={data} number={num} isLoading={isLoading} />
    </div>
  );
}
