"use client";

import { title } from "@/components/primitives";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@nextui-org/react";
import { CameraIcon } from "../../../icons/cameraIcon";
import { useRef, useState } from "react";
import { changeUserInfo } from "@/state/zustand";
import { AvatarDemo } from "@/components/avatar";
import { FlashyButton } from "@/components/borderFlash";
import {Chip} from "@nextui-org/react";
import { TabsDemo } from "@/components/tabs";

export default function ProfilePage() {

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
    <div>
      <div className="flex justify-center">
		    <AvatarDemo className="w-24 h-24"></AvatarDemo>
      </div>
      <Button
        color="success"
        className="mt-2"
        endContent={<CameraIcon />}
        onClick={handleButtonClick}
      >
        Upload profile picture
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <div className="mt-7">
         <TabsDemo></TabsDemo>
      </div>
    </div>
  );
}
