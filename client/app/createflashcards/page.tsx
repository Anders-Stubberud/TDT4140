"use client";

import { CreateflashcardForm } from "@/components/createflashcardForm";
import { title } from "@/components/primitives";

export default function CreateflashcardsPage() {
  return (
    <div>
      <div className="flex justify-center items-center ">
        {" "}
        <CreateflashcardForm></CreateflashcardForm>
      </div>
    </div>
  );
}
