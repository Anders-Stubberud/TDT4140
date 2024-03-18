"use client";

import FlashcardSetListDisplay from "@/components/flashcardSetListDisplay";
import { title } from "@/components/primitives";
import { DataTableDemo } from "@/components/scrollarea";
import SearchBar from "@/components/searchbar";
import FlashcardSetList from "@/components/flashcardSetList";
import { useEffect, useState } from "react";
import { flashcardSet, editIndexing } from "@/state/zustand";
import { Filters } from "@/components/filters";

export default function filterSetsPage() {

  const [data, setData] = useState([]);
  const [num, setNum] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { indexZustand, setIndexZustand } = editIndexing();

  return (
    <div>
      <SearchBar setData={setData} setNum ={setNum} setIsLoading={setIsLoading}/>
      <div className="flex justify-center mt-6">
        <div className="scroll-m-20 -mb-2 border-b-2 pb-2 text-3xl font-semibold tracking-tight first:mt-0 w-11/12"></div>
      </div>
      <FlashcardSetList flashcardSets={data} number={num} isLoading={isLoading} />
    </div>
  );
}
