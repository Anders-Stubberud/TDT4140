"use client";

import React, { useEffect } from "react";
import { Input } from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";
import SortIcon from "@/icons/sortIcon";
import { tagsAvailable } from "@/state/zustand";

export function Filters() {
  const placements = ["inside", "outside", "outside-left"];
  const { tags, setTags } = tagsAvailable();

  return (
    <div className="flex justify-between">
      <Select
        label="Tags"
        placeholder="Select tags"
        selectionMode="multiple"
        className="max-w-xs"
        variant="bordered"
              >
        {tags.map((item) => (
          <SelectItem key={item} value={item}>{item}</SelectItem>
        ))}
      </Select>

      <Select
        label="Sort"
        placeholder="Select sort keyy"
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
