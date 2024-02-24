import React, { useEffect, useState } from 'react';
import { flashcard, flashcardSet, JSONToFlashcardSet, serverEndpoint } from '@/state/zustand';
import FlashcardSetList from './flashcardSetList';

const FlashcardSetListDisplay: React.FC = () => {
  const [data, setData] = useState<flashcardSet[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(serverEndpoint + '/api/getFlashcards');
        const result = await response.json();
        const flashcardSets = JSONToFlashcardSet(result);
        setData(flashcardSets);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <FlashcardSetList flashcardSets={data} />
    </div>
  );
};

export default FlashcardSetListDisplay;
