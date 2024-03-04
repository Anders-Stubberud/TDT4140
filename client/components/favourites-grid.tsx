"use client";

import React, { useEffect, useState } from "react";
import "../styles/favourites-grid.css";
import FavouriteButton from "./favourite-button";
import {
  JSONToFlashcardSet,
  flashcardSet,
  serverEndpoint,
  useUserStore,
} from "@/state/zustand";
import NextLink from "next/link";
import { useStore } from "zustand";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

function FavouritesGrid() {
  const [data, setData] = useState<flashcardSet[]>([]);

  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [userID, setUserID] = useState<string | null>(null);


  useEffect(() => {

    if (user) {
      setUserID(user.uid)
      const fetchData = async () => {
        try {
          const response = await fetch(`${serverEndpoint}/api/getFavourites/${user.uid}`);
          const result = await response.json();
          const flashcardSets = JSONToFlashcardSet(result);
          setData(flashcardSets);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }

  }, [user]);

  return (
    <div>
      {userID ? (
        <div className="grid-container">
          {data.map((item) => (
            <div key={item.flashcardSetID} className="set">
              <NextLink href={`/getFlashcard/${item.flashcardSetID}`}>
                <h2>{item.name}</h2>
                <p>{item.creatorID}</p>
              </NextLink>
              <FavouriteButton
                flashcardSetID={item.flashcardSetID}
                isFavorite={
                  true /* Add logic to determine if it's a favorite */
                }
                userID={userID!}
              />
            </div>
          ))}
        </div>
      ) : (
        <h1>You are not logged in:)</h1>
      )}
    </div>
  );
}

export default FavouritesGrid;
