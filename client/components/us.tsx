"use client";
import React from "react";
import { AnimatedTooltip } from "./ui/animated-tooltip";
const people = [
  {
    id: 1,
    name: "Anders Stubberud",
    designation: "B.Sc. informatics",
    image:
      "/resources/placeholder2.jpeg",
  },
  {
    id: 2,
    name: "Kristin åsen",
    designation: "M.Sc. Engineering and ICT",
    image:
      "/resources/placeholder5.jpg",
  },
  {
    id: 3,
    name: "Torbjørn Wiik",
    designation: "M.Sc. Computer Science",
    image:
      "/resources/placeholder7.jpg",
  },
  {
    id: 4,
    name: "Petter Teisberg",
    designation: "M.Sc. Computer Science",
    image:
      "/resources/placeholder2.jpeg",
  },
  {
    id: 5,
    name: "Jenny Straumbotn",
    designation: "M.Sc. Computer Science",
    image:
      "/resources/placeholder5.jpg",
  },
  {
    id: 6,
    name: "Johan Legreid",
    designation: "M.Sc. Computer Science",
    image:
      "/resources/placeholder7.jpg",
  },
  {
    id: 7,
    name: "Nikolai Thougaard",
    designation: "B.Sc. informatics",
    image:
      "/resources/placeholder7.jpg",
  },
];

export function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}
