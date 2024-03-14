"use client";

import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { toggleSet, useUserStore, zustand } from "@/state/zustand";
import NextLink from "next/link";
import FavouriteButton from "./favourite-button";
import { TrashCanIcon } from "@/icons/trashcan";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "@nextui-org/button";
import { serverEndpoint } from "@/state/zustand";
import { FlashCard } from "./flashcard";
import { Flashcard } from "react-quizlet-flashcard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ThreeDCardProps {
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  id: string;
  creatorID: string;
  favourite: boolean;
}

export function ThreeDCardDemo({
  title,
  description,
  imageUrl,
  buttonText,
  id,
  creatorID,
  favourite,
}: ThreeDCardProps) {
  const { setname, setSet } = toggleSet();
  const { setIsLoggedIn } = zustand();
  const { setUserID } = useUserStore();
  const auth = getAuth();
  const [user] = useAuthState(auth);

  const handleDelete = async () => {
    try {
      await fetch(`${serverEndpoint}/api/deleteSet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          flashcardSetID: id,
        }),
      });
    } catch (error) {
      console.error("Error deleting set:", error);
    }
    window.location.reload();
  };

  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[20rem] h-auto rounded-xl p-6 border  ">
        <FavouriteButton
          flashcardSetID={id}
          isFavorite={favourite}
          userID={user?.uid}
        ></FavouriteButton>
        {user?.uid == creatorID /*|| user?.isAdmin*/ ? (
          <div className="absolute top-5 right-5">
            <AlertDialog>
              <AlertDialogTrigger>
                <TrashCanIcon></TrashCanIcon>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to delete this learning set?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this learning set from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ) : (
          <p></p>
        )}
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white mx-auto"
        >
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 mx-auto"
        >
          {description}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={imageUrl}
            height="1000"
            width="1000"
            className="h-44 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="mx-auto items-center mt-10" onClick={() => setSet(id)}>
          <NextLink href="/displayFlashcardSet">
            <CardItem
              translateZ={20}
              as="button"
              className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
            >
              {buttonText}
            </CardItem>
          </NextLink>
        </div>
      </CardBody>
    </CardContainer>
  );
}
