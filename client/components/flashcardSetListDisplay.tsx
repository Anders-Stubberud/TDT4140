import React, { useEffect, useState } from 'react';
import { flashcard, flashcardSet, JSONToFlashcardSet, serverEndpoint } from '@/state/zustand';
import FlashcardSetList from './flashcardSetList';

const FlashcardSetListDisplay: React.FC = () => {
  const [data, setData] = useState<flashcardSet[]>([]);
  const [num, setNum] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(serverEndpoint + '/api/getFlashcards');
        const result = await response.json();
        const flashcardSets = JSONToFlashcardSet(result);
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
