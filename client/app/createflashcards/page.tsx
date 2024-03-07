"use client";

import { CreateflashcardForm } from "@/components/createflashcardForm";
import { FlashcardCreated } from "@/components/flashcardCreated";
import { FlashcardProvider } from "@/app/context/flashcardcontext";
import { TextareaWithButton } from "@/components/textarea";

export default function CreateflashcardsPage() {
  return (
    <div>
      <TextareaWithButton></TextareaWithButton>
    </div>
    // <FlashcardProvider>
    //   <div className="flex justify-center items-center ">
    //     <CreateflashcardForm />
    //   </div>
    //   <div className="flex justify-center items-center ">
    //     <FlashcardCreated />
    //   </div>
    // </FlashcardProvider>
  );
}
