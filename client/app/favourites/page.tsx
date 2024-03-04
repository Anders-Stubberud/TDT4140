"use client";

import { title } from "@/components/primitives";
import FavouritesGrid from "@/components/favourites-grid";

export default function FavouritesPage() {
  return (
    <div>
      <h1 className={title()}>Your Favourite Learning Sets</h1>
      <FavouritesGrid></FavouritesGrid>
    </div>
  );
}
