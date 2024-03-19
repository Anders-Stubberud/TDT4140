import { Spinner } from "@nextui-org/react";
import { flashcardSet, serverEndpoint, useFavouriteSets } from "@/state/zustand";
import { useEffect, useState } from "react";
import { ThreeDCardDemo } from "./threeDCard";
import { PaginationDemo } from "./pagination";
import { tagsAvailable, changeChosenSet } from "@/state/zustand";

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
  const { sett } = changeChosenSet();

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
  }, [sett]); // Empty dependency array means it runs once on mount

  const flashcardSetsGroups = chunkArray(flashcardSets, 3);
  const threeByThree = chunkArray(flashcardSetsGroups, 3);

  // const comment = [{
  //   profilePic: 'https://storage.googleapis.com/flashy-3a502.appspot.com/6231a67d-494f-46a5-9661-af382916cfe2.undefined?GoogleAccessId=firebase-adminsdk-j0zai%40flashy-3a502.iam.gserviceaccount.com&Expires=1713925400&Signature=PSX2dvCkuHXFtca7Siq3sdvpsZym5xEVzDTGWLlqUSAse4Td1b%2F4XNBQxf1RZcrPVy8%2FQvf3PpSIkEMFF5Fxc8ve7yF91sW7JAQFRvAb2ieNtkFuvBZ9bltoJQeZUhtdUYcJ1MEHActKSDSvcqPVZuZ9rweoMF8pu%2BVQP4xgUm9B%2Bo5a25qx0LpxhhNvJv9AB5iHcyqJ6X8LzPbGUjUbSbd9PRg%2BrTRV1%2BTOnBhZarCD54QDh5BEVHEkU8A1s6t1QCRc%2FDy2ezVW3bXk5eOTIwu2VupFbD9oH%2F3onttNGSKUtEssp9VLy4%2BM37lFB3nnNqHIAq6xc9pCyw9M2eTkFA%3D%3D',
  //   commentText: 'testcomment',
  //   username: 'gigachad'
  // }]

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
                    comments={flashcardSet.comments}
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
