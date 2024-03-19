// "use client";

// import React, { useEffect, useState } from "react";
// import "../styles/favourites-grid.css";
// import FavouriteButton from "./favourite-button";
// import {
//   JSONToFlashcardSet,
//   flashcardSet,
//   serverEndpoint,
//   useUserStore,
// } from "@/state/zustand";
// import NextLink from "next/link";
// import { useStore } from "zustand";
// import { getAuth } from "firebase/auth";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { ThreeDCardDemo } from "./threeDCard";
// import { useFavouriteSets } from "@/state/zustand";
// import { PaginationDemo } from "./pagination";

// function FavouritesGrid() {
//   const [data, setData] = useState<flashcardSet[]>([]);
//   // const auth = getAuth();
//   // const [user] = useAuthState(auth);
//   const [userID, setUserID] = useState<string | null>(null);
//   const { favourites, setFavourites } = useFavouriteSets();
//   const [index, setIndex] = useState<number>(0);
//   const [num, setNum] = useState<number>(0);

//   const chunkArray = (array: any[], size: number) => {
//     return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
//       array.slice(index * size, index * size + size)
//     );
//   };


//   // useEffect(() => {

//   //   if (user) {
//   //     setUserID(user.uid)
//   //     const fetchData = async () => {
//   //       try {
//   //         const response = await fetch(`${serverEndpoint}/api/getFavourites/${user?.uid}`);
//   //         const result = await response.json();
//   //         const flashcardSets = JSONToFlashcardSet(result);
//   //         setData(flashcardSets);
//   //       } catch (error) {
//   //         console.error("Error fetching data:", error);
//   //       }
//   //     };
//   //     fetchData();
//   //   }

//   // }, [user]); 

//   const fetchData = async () => {
//     try {
//       const userIDZustand = localStorage.getItem('userID');
//       setUserID(userIDZustand);
//       const response = await fetch(`${serverEndpoint}/api/getFavourites/${userIDZustand}`);
//       const data = await response.json();
//       const flashcardSets = JSONToFlashcardSet(data);
//       console.log(flashcardSets);
//       setData(flashcardSets);
//       setNum(Math.ceil(flashcardSets.length / 3))
//       const favs: string[] = [];
//       for (let i=0; i < Object.keys(data).length; i++) {
//         favs.push(data[i].flashcardSetID)
//       } 
//       setFavourites(favs);
//       console.log(favs);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData(); // Trigger on render
//   }, []); // Empty dependency array means it runs once on mount

//   const flashcardSetsGroups = chunkArray(data, 3);

//   return (
//     <div>
//       {userID ? (
//           <div>
//           <div className="flex justify-between">
//             {flashcardSetsGroups[index].map((flashcardSet, index) => (
//               <div key={index}  className="ml-10 mr-10">
//                 <ThreeDCardDemo
//                 id = {flashcardSet.flashcardSetID}
//                 title={flashcardSet.name}
//                 imageUrl ={`https://source.unsplash.com/random?dummy=${Math.floor(1000000 + Math.random() * 9000000)}`}
//                 description="description"
//                 buttonText="Play"
//                 favourite={favourites.includes(flashcardSet.flashcardSetID)}
//               ></ThreeDCardDemo>
//               </div>
//               ))}
//           </div>
//           <div className="mt-10">
//             <PaginationDemo number={num} index={index} setIndex={setIndex}></PaginationDemo>
//           </div>
//         </div>
//       ) : (
//         <h1>You are not logged in:)</h1>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { flashcard, flashcardSet, JSONToFlashcardSet, serverEndpoint } from '@/state/zustand';
import FlashcardSetList from './flashcardSetList';

const FavouritesGrid: React.FC = () => {
  const [data, setData] = useState<flashcardSet[]>([]);
  const [num, setNum] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const userIDZustand = localStorage.getItem('userID');
        const response = await fetch(`${serverEndpoint}/api/getFavourites/${userIDZustand}`);
        const result = await response.json();
        const favSets = result.filter((val: any) => val != null && val != undefined);
        const flashcardSets = JSONToFlashcardSet(favSets);
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

export default FavouritesGrid;

