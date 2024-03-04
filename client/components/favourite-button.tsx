"use client";

import { serverEndpoint } from "@/state/zustand";
import React, { useEffect, useState } from "react";
// @ts-ignore
import Heart from "react-heart";

interface FavouriteButtonProps {
  flashcardSetID: string;
  isFavorite: boolean;
  userID: string;
}

function FavouriteButton({
  flashcardSetID,
  isFavorite,
  userID,
}: FavouriteButtonProps) {
  const [active, setActive] = useState(isFavorite);

  useEffect(() => {
    setActive(isFavorite);
  }, [isFavorite]);

  const handleToggleFavorite = async () => {
    try {
      if (isFavorite) {
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
      <Heart isActive={active} onClick={handleToggleFavorite} />
    </div>
  );
}

export default FavouriteButton;
