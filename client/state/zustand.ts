import { CSSProperties } from 'react'
import { create } from 'zustand'

interface userState {
    isLoggedIn: boolean
    setIsLoggedIn: (isLoggedIn: boolean) => void
}

export const zustand = create<userState>()((set) => ({
    isLoggedIn: false,
    setIsLoggedIn: (isLoggedIn: boolean) => set({isLoggedIn})
}))

interface darkMode {
    dark: string
    setDark: (dark: string) => void
}

export const toggleDarkMode = create<darkMode>()((set) => ({
    dark: "bg-white",
    setDark: (dark: string) => set({dark})
}))

interface favourite_sets {
    favourites: string [];
    setFavourites: (favourites: string []) => void
}

export const useFavouriteSets = create<favourite_sets>()((set) => ({
    favourites: [],
    setFavourites: (favourites: string[]) => set({favourites})
}))
interface userLoggedIn {
    userID: string | undefined;
    setUserID: (userID: string | undefined) => void
}

export const useUserStore = create<userLoggedIn>()((set) => ({
    userID: "",
    setUserID: (newUserID: string | undefined) => set({ userID: newUserID })
}))

interface setInfo {
    setname: string
    setSet: (set: string) => void
}

export const toggleSet = create<setInfo>()((set) => ({
    setname: 'stock',
    setSet: (setname: string) => set({setname})
}))


export interface flashcard {
    flashcardID: string
    question: string
    answer: string
}

export interface flashcardSet {
    flashcardSetID: string
    name: string
    creatorID: string
    flashcards: flashcard []
}

export interface user {
    userID: string
    userName: string
    favourites: string []
}

export const serverEndpoint = "http://localhost:5001"

export function JSONToFlashcardSet(jsonData: any): flashcardSet[] {
    console.log(jsonData);
    if (!Array.isArray(jsonData)) {
      return [{
        flashcardSetID: jsonData.flashcardSetID,
        name: jsonData.name,
        creatorID: jsonData.creatorID,
        flashcards: jsonData.flashcards.map((card: any) => ({
          flashcardID: card.flashcardID,
          question: card.question,
          answer: card.answer 
        }))
      }];
    }
    return jsonData.map((data: any) => ({
      flashcardSetID: data.flashcardSetID,
      name: data.name,
      creatorID: data.creatorID,
      flashcards: data.flashcards.map((card: any) => ({
        flashcardID: card.flashcardID,
        question: card.question,
        answer: card.answer
      }))
    }));
  }
  

export interface userInfo {
    profilePic: File | null
    setProfilePic: (pic: File) => void
}

export const changeUserInfo = create<userInfo>()((set) => ({
    profilePic: null,
    setProfilePic: (profilePic: File) => set({profilePic})
}))
