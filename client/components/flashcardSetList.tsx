import { Card, CardBody, CardFooter, Image, Spinner } from "@nextui-org/react";
import {
  flashcard,
  flashcardSet,
  serverEndpoint,
  useUserStore,
} from "@/state/zustand";
import { ThreeDCardDemo } from "./threeDCard";
import { PaginationDemo } from "./pagination";
import { useEffect, useState } from "react";
import FavouriteButton from "./favourite-button";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFavouriteSets } from "@/state/zustand";

interface FlashcardSetListProps {
  flashcardSets: flashcardSet[];
  number: number;
  isLoading: boolean;
}

const FlashcardSetList: React.FC<FlashcardSetListProps> = ({
  flashcardSets,
  number,
  isLoading,
}) => {
  // const [favourites, setFavourites] = useState<string []>([]);
  const [index, setIndex] = useState<number>(0);
  const { favourites, setFavourites } = useFavouriteSets();
  const chunkArray = (array: any[], size: number) => {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
      array.slice(index * size, index * size + size)
    );
  };

  const fetchData = async () => {
    try {
      const userID = localStorage.getItem('userID');
      const response = await fetch(`${serverEndpoint}/api/getFavourites/${userID}`);
      const data = await response.json();
      const favs: string[] = [];
      for (let i=0; i < Object.keys(data).length; i++) {
        favs.push(data[i].flashcardSetID)
      } 
      setFavourites(favs);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    console.log(flashcardSets);
    fetchData(); // Trigger on render
  }, []); // Empty dependency array means it runs once on mount

  const flashcardSetsGroups = chunkArray(flashcardSets, 3);

  return (
    <div>
      {isLoading ? (
        <Spinner></Spinner>
      ) : (
        <div>
          {flashcardSetsGroups[index] ? (
            <div className="flex justify-between">
              {flashcardSetsGroups[index].map((flashcardSet, index) => (
                <div key={index} className="ml-10 mr-10">
                  <ThreeDCardDemo
                    id={flashcardSet.flashcardSetID}
                    creatorID={flashcardSet.creatorID}
                    title={flashcardSet.setTitle}
                    imageUrl={flashcardSet.coverImage}
                    description={flashcardSet.description}
                    buttonText="Play"
                    favourite={favourites.includes(flashcardSet.flashcardSetID)}
                  ></ThreeDCardDemo>
                </div>
              ))}
            </div>
          ) : (
            <p>No learning sets available</p>
          )}
          <div className="mt-10">
            <PaginationDemo
              number={number}
              index={index}
              setIndex={setIndex}
            ></PaginationDemo>
          </div>
        </div>
      )}
    </div>
  );
};


export default FlashcardSetList;
