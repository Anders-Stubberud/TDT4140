"use client";

import { CreateflashcardForm } from "@/components/createflashcardForm";
import { FlashcardCreated } from "@/components/flashcardCreated";
import { FlashcardProvider } from "@/app/context/flashcardcontext";

export default function CreateflashcardsPage() {
  return (
    <FlashcardProvider>
      <div className="flex justify-center items-center ">
        <CreateflashcardForm />
      </div>
      <div className="flex justify-center items-center ">
        <FlashcardCreated />
      </div>
    </FlashcardProvider>
  );
}
