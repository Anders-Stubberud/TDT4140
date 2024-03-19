import { Spinner } from "@nextui-org/react";
import { flashcardSet, serverEndpoint, useFavouriteSets } from "@/state/zustand";
import { useEffect, useState } from "react";
import { ThreeDCardDemo } from "./threeDCard";
import { PaginationDemo } from "./pagination";
import { tagsAvailable } from "@/state/zustand";

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
  const [index, setIndex] = useState<number>(0);
  const { favourites, setFavourites } = useFavouriteSets();
  const { tags, setTags } = tagsAvailable();

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
      console.log(data);
      const favs: string[] = [];
      for (let i=0; i < Object.keys(data).length; i++) {
        if (!data[i]) {
          continue;
        }
        favs.push(data[i].flashcardSetID)
      } 
      setFavourites(favs);
      const taggiesRAW = await fetch(`${serverEndpoint}/api/getTags`);
      const taggies = await taggiesRAW.json();
      const tagsArr = taggies.tagsArr;
      setTags(tagsArr);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Trigger on render
  }, []); // Empty dependency array means it runs once on mount

  const flashcardSetsGroups = chunkArray(flashcardSets, 3);
  const threeByThree = chunkArray(flashcardSetsGroups, 3);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center mt-10">
          <Spinner />
        </div>
      ) : (
        <div>
          {threeByThree[index]?.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center mt-4">
              {row.map((flashcardSet: any, cardIndex: any) => (
                <div key={cardIndex} className="ml-10 mr-10">
                  <ThreeDCardDemo
                    id={flashcardSet.flashcardSetID}
                    creatorID={flashcardSet.creatorID}
                    title={flashcardSet.setTitle}
                    imageUrl={flashcardSet.coverImage}
                    description={flashcardSet.description}
                    buttonText="Play"
                    favourite={favourites.includes(flashcardSet.flashcardSetID)}
                  />
                </div>
              ))}
            </div>
          ))}
          <div className="mt-10">
            <PaginationDemo
              number={threeByThree.length}
              index={index}
              setIndex={setIndex}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashcardSetList;
