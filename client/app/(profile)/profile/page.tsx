"use client";

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { title } from "@/components/primitives";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@nextui-org/react";
import { CameraIcon } from "../../../icons/cameraIcon";
import { useRef, useState } from "react";
import { AvatarDemo } from "@/components/avatar";
import { FlashyButton } from "@/components/borderFlash";
import {Chip} from "@nextui-org/react";
import { TabsDemo } from "@/components/tabs";
import {v4 as uuidv4} from 'uuid';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function ProfilePage() {

  const [name, setName] = useState("Pedro Duarte");
  const [userName, setUserName] = useState("@peduarte");
  const [profilePicURL, setProfilePicURL] = useState<string>();
	const [ profilePic, setProfilePic ] = useState<File>();
  const fileInputRef = useRef(null);

  const mimeToExt: Record<string, string> = {
    "jpeg": "jpg",
    "png": "png",
  };

  const sendPictureToDatabase = async () => {
    try {

      let formData = new FormData();

      if (profilePic) {
        const fileType: string = profilePic.type.split('/')[1]
        const fileExtension = mimeToExt[fileType];
        const newImage:any = new File([profilePic], `${uuidv4()}.${fileExtension}`, { type: profilePic.type });
        formData.append("file", newImage);
      }
      const userID = localStorage.getItem('userID');
      if (userID) {
        formData.append("userID", userID);
      }
      formData.append("username", userName);
      const response = await fetch("http://localhost:5001/api/editUserProfile", {
        method: "POST",
        body: formData,
      });

    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

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
      {
      profilePic ? 
      <Avatar className="w-24 h-24">
        <AvatarImage src="https://github.com/shadcn.png"/>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      :       
      <Avatar className="w-24 h-24">
        <AvatarImage src=""/>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      }
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
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you're done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button onClick={() => sendPictureToDatabase()}>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
