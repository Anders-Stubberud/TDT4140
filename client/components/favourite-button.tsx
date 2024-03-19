"use client";

import { idToLikeStore, serverEndpoint } from "@/state/zustand";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
// @ts-ignore
import Heart from "react-heart";
import { useFavouriteSets } from "@/state/zustand";
import CommentIcon from "@/icons/commentIcon";
import HeartIcon from "@/icons/heartIcon";
import { act } from "@react-three/fiber";

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

  const { favourites, setFavourites } = useFavouriteSets();
  const [active, setActive] = useState<boolean>(false);
  const { idToLikeMapper, updateIdToLikeMapper } = idToLikeStore();
  const activeFromStart = isFavorite;

  useEffect(() => {
    setActive(isFavorite);
  }, [isFavorite])

  const handleToggleFavorite = async () => {
    try {
      console.log('punch');
      if (active) {
        console.log('includes id');
        const response = await fetch(`${serverEndpoint}/api/increaseLikeCount/${flashcardSetID}/-1`);
        setNumberOfLikes(numberOfLikes - 1);
        // const newarr: string [] = [];
        // for (let i=0; i<favourites.length; i++) {
        //   if (favourites[i] != flashcardSetID) {
        //     newarr.push(favourites[i])
        //   }
        // }
        setFavourites(favourites.filter((fav: string) => fav != flashcardSetID));
        setActive(false);
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
        console.log('not include');
        const response = await fetch(`${serverEndpoint}/api/increaseLikeCount/${flashcardSetID}/1`);
        setNumberOfLikes(numberOfLikes + 1);
        setFavourites([...favourites, flashcardSetID])
        setActive(true);
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

  const addLikeCount = active && !activeFromStart ? 1 : activeFromStart && !active ? -1 : 0

  return (
    <div style={{ width: "1.3rem" }}>
      <button onClick={handleToggleFavorite}>
        <HeartIcon isActive={active} />
      </button>
      <p className="ml-1 text-base">{(idToLikeMapper.get(flashcardSetID) || 0) + addLikeCount}</p>
    </div>
  );
}

export default FavouriteButton;
