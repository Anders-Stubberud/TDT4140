"use client";
import React, { useState } from "react";
import { MultiStepLoader as Loader } from "./ui/multi_step_loader";
import { IconSquareRoundedX } from "@tabler/icons-react";
import { Button } from "./ui/button";

const loadingStates = [
  {
    text: "Extracting information...",
  },
  {
    text: "Sending data to server...",
  },
  {
    text: "Inserting into database...",
  },
  {
    text: "Validating...",
  },
  {
    text: "Flashcardset upload success!",
  },
  {
    text: "Group 40 rocks :)",
  }
];

interface AreaProps {
  clicked: () => void;
}

export function MultiStepLoaderDemo({clicked}: AreaProps) {

  const [loading, setLoading] = useState(false);

  const load = () => {
    clicked()
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 6000);
  }

  return (
    <div className="flex items-center justify-center">
      {/* Core Loader Modal */}
      <Loader loadingStates={loadingStates} loading={loading} duration={1000} />

      <Button onClick={() => load()}>
        Create set
      </Button>

      {loading && (
        <button
          className="fixed top-4 right-4 text-black dark:text-white z-[120]"
          onClick={() => setLoading(false)}
        >
          <IconSquareRoundedX className="h-10 w-10" />
        </button>
      )}
    </div>
  );
}
