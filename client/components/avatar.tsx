// AvatarDemo.js

import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { changeUserInfo, useUserStore } from "@/state/zustand";

interface AvatarDemoProps {
  className?: string;
}

export function AvatarDemo({ className }: AvatarDemoProps) {
  const { profilePic } = changeUserInfo();
  const { username, profileImageURL } = useUserStore();

  function getInitials(fullName: string | null | undefined) {
    if (!fullName) return "Profile"; 
    const words = fullName.split(" ");
    const initials = words.map(word => word.charAt(0).toUpperCase());
    return initials.join("");
}

  return (
    <div>
      <Avatar className={className}>
        <AvatarImage src={profileImageURL ? profileImageURL : 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/510px-Default_pfp.svg.png'} alt="profile" />
        <AvatarFallback>{getInitials(username)}</AvatarFallback>
      </Avatar>
    </div>
  );
}
