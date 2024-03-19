"use client";

import { serverEndpoint } from "@/state/zustand";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
// @ts-ignore
import Heart from "react-heart";
import { useFavouriteSets } from "@/state/zustand";
import CommentIcon from "@/icons/commentIcon";

interface FavouriteButtonProps {
  flashcardSetID: string;
  isFavorite: boolean;
  userID: string | undefined;
  numberOfLikes: number;
  setNumberOfLikes: (n: number) => void;
}

function FavouriteButton({
  flashcardSetID,
  isFavorite,
  userID,
  numberOfLikes, 
  setNumberOfLikes
}: FavouriteButtonProps) {
  const [active, setActive] = useState(isFavorite);

  const { favourites, setFavourites } = useFavouriteSets();

  const handleToggleFavorite = async () => {
    try {
      if (favourites.includes(flashcardSetID)) {
        const response = await fetch(`${serverEndpoint}/api/increaseLikeCount/${flashcardSetID}/-1`);
        setNumberOfLikes(numberOfLikes - 1);
        const newarr: string [] = [];
        for (let i=0; i<favourites.length; i++) {
          if (favourites[i] != flashcardSetID) {
            newarr.push(favourites[i])
          }
        }
        setFavourites(newarr);
        setActive(!active);
        // Remove from favorites
        await fetch(`${serverEndpoint}/api/removeFavourite`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: userID,
            flashcardSetID: flashcardSetID,
          }),
        });
      } else {
        const response = await fetch(`${serverEndpoint}/api/increaseLikeCount/${flashcardSetID}/1`);
        setNumberOfLikes(numberOfLikes + 1);
        setFavourites([...favourites, flashcardSetID])
        setActive(active);
        // Add to favorites
        await fetch(`${serverEndpoint}/api/setFavourite`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: userID,
            flashcardSetID: flashcardSetID,
          }),
        });
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <div style={{ width: "1.3rem" }}>
      <Heart isActive={favourites.includes(flashcardSetID)} onClick={handleToggleFavorite} />
      <p className="ml-1">{numberOfLikes}</p>
    </div>
  );
}

export default FavouriteButton;
