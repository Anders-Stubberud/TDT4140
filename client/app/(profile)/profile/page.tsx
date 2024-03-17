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
import { Button, user } from "@nextui-org/react";
import { CameraIcon } from "../../../icons/cameraIcon";
import { useEffect, useRef, useState } from "react";
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
import { serverEndpoint, useUserStore } from "@/state/zustand";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProfilePage() {

  const { username, profileImageURL } = useUserStore(); 
  const [userName, setUserNameLocal] = useState(username);
  const { setUserIDZustand, setUserNameZustand, setProfileImageURLZustand } = useUserStore();
  const [profilePicURL, setProfilePicURL] = useState<string | null>(profileImageURL);
	const [ profilePic, setProfilePic ] = useState<File | null>(null);
  const fileInputRef = useRef(null);
  const auth = getAuth();
	const [user] = useAuthState(auth);
  const notify = () => toast("User updated!");
  const [adminStatus, setAdminStatus] = useState();

  const mimeToExt: Record<string, string> = {
    "jpeg": "jpg",
    "png": "png",
  };

  const setupUserInformation = async () => {
    try {
      const response = await fetch(serverEndpoint + `/api/getUserInformation/${user?.uid}`);
      const data = await response.json();
      console.log(data);
      setAdminStatus(data.admin);
      console.log(adminStatus);
      setProfileImageURLZustand(data.profilePictureURL);
      setUserNameZustand(data.userName);
      setProfilePicURL(data.profilePictureURL);
      setUserNameLocal(data.userName);
    } catch (error) {
      console.error("Error setting up user information:", error);
    }
  };

  useEffect(() => {
    setupUserInformation();
  }, []);

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
      if (userName) {
        console.log('username')
        formData.append("userName", userName);
      }
      const response = await fetch(serverEndpoint + '/api/editUserProfile', {
        method: "POST",
        body: formData,
      });

      setupUserInformation();
      notify();

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

  function getInitials(fullName: string | null | undefined) {
    if (!fullName) return ""; 
    const words = fullName.split(" ");
    const initials = words.map(word => word.charAt(0).toUpperCase());
    return initials.join("");
}

  return (
    <div className="-mt-20">
      <div className="flex justify-center">
      {
      profilePic ? 
      <Avatar className="w-24 h-24">
        <AvatarImage src={URL.createObjectURL(profilePic)}/>
        <AvatarFallback>{getInitials(user?.displayName)}</AvatarFallback>
      </Avatar> 
      :
      profilePicURL ? 
      <Avatar className="w-24 h-24">
        <AvatarImage src={profilePicURL}/>
        <AvatarFallback>{getInitials(user?.displayName)}</AvatarFallback>
      </Avatar>    
      :
      <Avatar className="w-24 h-24">
        <AvatarImage src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/510px-Default_pfp.svg.png'/>
        <AvatarFallback>{getInitials(user?.displayName)}</AvatarFallback>
      </Avatar>
      }
      </div>
      <Button
        color="primary"
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
                    disabled
                    value={user?.displayName ? user.displayName : 'filern'}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="admin">Admin</Label>
                  <Input
                    id="admin"
                    disabled
                    value={adminStatus ? "You're an admin" : "Sorry, you're not an admin"}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={userName ? userName : ""}
                    onChange={(e) => setUserNameLocal(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button color="primary" onClick={() => sendPictureToDatabase()}>Save changes</Button>
                <ToastContainer 
                position="bottom-right"
                theme="light"
                />
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
