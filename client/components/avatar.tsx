// AvatarDemo.js

import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { changeUserInfo } from "@/state/zustand";

interface AvatarDemoProps {
  className?: string;
}

export function AvatarDemo({ className }: AvatarDemoProps) {
  const { profilePic } = changeUserInfo();

  return (
    <div>
      {profilePic ? (
        <Avatar className={className}>
          <AvatarImage src={URL.createObjectURL(profilePic)} alt="profile" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ) : (
        <Avatar className={className}>
          <AvatarImage src="https://github.com/shadcn.png" alt="profile" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
