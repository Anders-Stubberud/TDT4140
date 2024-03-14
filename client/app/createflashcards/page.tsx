"use client";

import { CreateflashcardForm } from "@/components/createflashcardForm";
import { FlashcardCreated } from "@/components/flashcardCreated";
import { FlashcardProvider } from "@/app/context/flashcardcontext";
import { FlashcardForm } from "@/components/flashcardForm";
import { Textarea } from "@nextui-org/input";
import { Divider } from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { changeUserInfo } from "@/state/zustand";
import { useRef } from "react";
import { CameraIcon } from "../../icons/cameraIcon";
import { AvatarDemo } from "@/components/avatar";
import { TabsDemo } from "@/components/tabs";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";
import {Card, CardBody} from "@nextui-org/react";

export default function CreateflashcardsPage() {

  const { profilePic, setProfilePic } = changeUserInfo();
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    (fileInputRef.current as HTMLInputElement | null)?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
	if (selectedFile != undefined) {
		setProfilePic(selectedFile);
	}
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-1/2">
        <div className="space-y-1">
            <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
              Create new flashcard-set
            </h2>
        </div>
        <Input label='Title' placeholder="The title of your set" className="h-14 my-4"></Input>
        <Divider className="my-4" />
        <div className="flex flex-row">
            <Textarea
            fullWidth={true}
            label="Description"
            placeholder="Include short description"
            className="h-full"
          />
          <Divider orientation="vertical" className="mx-4"/>
          <div className="">
            <Button
              color="primary"
              className="w-full mb-1"
              endContent={<CameraIcon />}
              onClick={handleButtonClick}
            >
              Upload cover image
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <div className="w-56">
            <Select
              label="Tags"
              placeholder="Select tag"
              selectionMode="multiple"
              className="max-w-xs"
            >
              {[
                {value: 'math', label: 'Mathematics'}, 
                {value: 'science', label: 'Natural Sciences'}, 
                {value: 'english', label: 'English Language Arts'}, 
                {value: 'history', label: 'History'}, 
                {value: 'geography', label: 'Geography'}, 
                {value: 'foreign_languages', label: 'Foreign Languages'}, 
                {value: 'art', label: 'Art'}, 
                {value: 'music', label: 'Music'}, 
                {value: 'physical_education', label: 'Physical Education'}, 
                {value: 'computer_science', label: 'Computer Science'}
              ].map((animal) => (
                <SelectItem key={animal.value} value={animal.value}>
                  {animal.label}
                </SelectItem>
              ))}
            </Select>
            </div>
          </div>
        </div>
        <Divider className="my-4" />
      </div>
      <FlashcardForm flashcardNumberInLine={1} />
      <Button color="primary" className="mt-6">
        New card
      </Button>
    </div>
  );
}
