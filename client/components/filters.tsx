"use client";

import React from "react";
import { Input } from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";
import SortIcon from "@/icons/sortIcon";

export function Filters() {
  const placements = ["inside", "outside", "outside-left"];

  return (
    <div className="flex justify-between">
      <Select
        label="Tags"
        placeholder="Select tags"
        selectionMode="multiple"
        className="max-w-xs"
        variant="bordered"
              >
        {[
          { value: 'math', label: 'Mathematics' },
          { value: 'science', label: 'Natural Sciences' },
          { value: 'english', label: 'English Language Arts' },
          { value: 'history', label: 'History' },
          { value: 'geography', label: 'Geography' },
          { value: 'foreign_languages', label: 'Foreign Languages' },
          { value: 'art', label: 'Art' },
          { value: 'music', label: 'Music' },
          { value: 'physical_education', label: 'Physical Education' },
          { value: 'computer_science', label: 'Computer Science' }
        ].map((item) => (
          <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
        ))}
      </Select>

      <Select
        label="Sort"
        placeholder="Select sort key"
        className="max-w-xs"
        variant="bordered"
        startContent={<SortIcon />}
              >
        {[
          { value: 'Most popular', label: 'Most popular' },
          { value: 'Alphabetically', label: 'Alphabetically' },
        ].map((item) => (
          <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
}
