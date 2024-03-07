"use client";

import { title } from "@/components/primitives";
import FavouritesGrid from "@/components/favourites-grid";

export default function FavouritesPage() {
  return (
      <div>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Your Favourite Learning Sets
            </h2>
        <FavouritesGrid></FavouritesGrid> 
      </div>
  );
}
