import { create } from 'zustand'

//   import { User, getAuth } from "firebase/auth";
//   import { useAuthState } from "react-firebase-hooks/auth";
//   import { initializeApp } from "firebase/app";
//   import { firebaseConfig } from "../firebase.js";

//   const app = initializeApp(firebaseConfig);
//   const auth = getAuth();
//   const [user] = useAuthState(auth);

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

interface userLoggedIn {
    userID: string
    setUserID: (userID: string) => void
}

export const useUserStore = create<userLoggedIn>()((set) => ({
    userID: "",
    setUserID: (newUserID: string) => set({ userID: newUserID })
}))

interface setInfo {
    setname: string
    setSet: (set: string) => void
}

export const toggleSet = create<setInfo>()((set) => ({
    setname: 'hovesteder',
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

export function JSONToFlashcardSet(jsonData: any[]): flashcardSet[] {
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