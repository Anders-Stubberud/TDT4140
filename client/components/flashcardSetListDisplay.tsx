import React, { useEffect, useState } from 'react';
import { flashcard, flashcardSet, JSONToFlashcardSet, serverEndpoint, tagsAvailable } from '@/state/zustand';
import FlashcardSetList from './flashcardSetList';
import { changeChosenSet } from '@/state/zustand';

const FlashcardSetListDisplay: React.FC = () => {
  const [data, setData] = useState<flashcardSet[]>([]);
  const [num, setNum] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {sett, setSett} = changeChosenSet();
  const { tags, setTags } = tagsAvailable();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(serverEndpoint + '/api/getFlashcards');
        const result = await response.json();
        const flashcardSets = JSONToFlashcardSet(result);
        setSett(flashcardSets);
        console.log(flashcardSets);
        setData(flashcardSets);
        setNum(Math.ceil(flashcardSets.length / 3))
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
      <FlashcardSetList flashcardSets={data} number={num} isLoading={isLoading}/>
  );
};

export default FlashcardSetListDisplay;
