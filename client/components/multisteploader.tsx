"use client";
import React, { useState } from "react";
import { MultiStepLoader as Loader } from "./ui/multi_step_loader";
import { IconSquareRoundedX } from "@tabler/icons-react";
import { Button } from "./ui/button";

const loadingStates = [
  {
    text: "Buying a condo",
  },
  {
    text: "Travelling in a flight",
  },
  {
    text: "Meeting Tyler Durden",
  },
  {
    text: "He makes soap",
  },
  {
    text: "We goto a bar",
  },
  {
    text: "Start a fight",
  },
  {
    text: "We like it",
  },
  {
    text: "Welcome to F**** C***",
  },
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
    }, 2000);
  }

  return (
    <div className="flex items-center justify-center">
      {/* Core Loader Modal */}
      <Loader loadingStates={loadingStates} loading={loading} duration={250} />

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
