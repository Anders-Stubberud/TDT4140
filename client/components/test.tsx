import React, { useState, useEffect } from 'react';

function FlashcardComponent() {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    async function fetchFlashcards() {
      try {
        const response = await fetch('api/getFlashcards');
        if (!response.ok) {
          throw new Error('Failed to fetch flashcards');
        }
        const flashcardsData = await response.json();
        setFlashcards(flashcardsData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchFlashcards();
  }, []);

  return (
    <div>
      <h1>Flashcards</h1>
      <div>
        {flashcards.map((flashcard, index) => (
          <div key={index}>
            <h2>{flashcard.name}</h2>
            {flashcard.cards && (
              <ul>
                {Object.entries(flashcard.cards).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FlashcardComponent;