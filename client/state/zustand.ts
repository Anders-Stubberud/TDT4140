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

// interface darkMode {
//     dark: string
//     setDark: (dark: string) => void
// }

// export const toggleDarkMode = create<darkMode>()((set) => ({
//     dark: "bg-white",
//     setDark: (dark: string) => set({dark})
// }))

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
    username: string | null
    profileImageURL: string | null
    isAdmin: boolean
    setIsAdmin: (newAdminStatus: boolean) => void
    setProfileImageURLZustand: (profileImageURL: string | null) => void
    setUserNameZustand: (username: string) => void
    setUserIDZustand: (userID: string | undefined) => void
}

export const useUserStore = create<userLoggedIn>()((set) => ({
    userID: "",
    username: null,
    profileImageURL: null,
    isAdmin: false,
    setIsAdmin: (newAdminStatus: boolean) => set({ isAdmin: newAdminStatus }),
    setProfileImageURLZustand: (newProfileImageURL: string | null) => set({ profileImageURL: newProfileImageURL }),
    setUserNameZustand: (newUserName: string | null) => set({ username: newUserName }),
    setUserIDZustand: (newUserID: string | undefined) => set({ userID: newUserID })
}))

interface setInfo {
    setname: string
    setSet: (set: string) => void
}

export const toggleSet = create<setInfo>()((set) => ({
    setname: 'stock',
    setSet: (setname: string) => set({setname})
}))

interface chosenSet {
    sett: any[]
    setSett: (sett: any[]) => void
}

export const changeChosenSet = create<chosenSet>()((set) => ({
    sett: [],
    setSett: (sett: any[]) => set({sett})
}))


export interface flashcard {
    questionImageURL: string | null
    answerImageURL: string | null
    flashcardID: string
    question: string
    answer: string
}

export interface flashcardSet {
    coverImage: File | undefined
    numberOfLikes: number
    flashcardSetID: string
    setTitle: string
    description: string
    tags: string []
    creatorID: string | null
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
        coverImage: jsonData.coverImage,
        description: jsonData.description,
        tags: jsonData.tags,
        numberOfLikes: jsonData.numberOfLikes,
        flashcardSetID: jsonData.flashcardSetID,
        setTitle: jsonData.setTitle,
        creatorID: jsonData.creatorID,
        flashcards: jsonData.flashcards.map((card: any) => ({
          flashcardID: card.flashcardID,
          question: card.question,
          answer: card.answer,
          answerImage: card.answerImage,
          questionImage: card.questionImage 
        }))
      }];
    }
    return jsonData.map((data: any) => ({
        coverImage: data.coverImage,
        description: data.description,
        tags: data.tags,
        numberOfLikes: data.numberOfLikes,
        flashcardSetID: data.flashcardSetID,
        setTitle: data.setTitle,
        creatorID: data.creatorID,
        flashcards: data.flashcards.map((card: any) => ({
            flashcardID: card.flashcardID,
            question: card.question,
            answer: card.answer,
            answerImage: card.answerImage,
            questionImage: card.questionImage 
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

export interface createCards {
    cardFormArr: any []
    setCardFormArr: (cardFormArr: any[]) => void
}

export const changeCardsForm = create<createCards>()((set) => ({
    cardFormArr: [],
    setCardFormArr: (cardFormArr: any []) => set({cardFormArr})
}))

export interface cardEdit {
    idOfSetToEdit: string | null
    setIdOfSetToEdit: (wannaEdit: string | null) => void
}

export const editTheSet = create<cardEdit>()((set) => ({
    idOfSetToEdit: null,
    setIdOfSetToEdit: (wannaEdit: string | null) => set({idOfSetToEdit: wannaEdit})
}))

export interface availableTags {
    tags: string[]
    setTags: (newTags: string []) => void;
}

export const tagsAvailable = create<availableTags>()((set) => ({
    tags: [],
    setTags: (newTags: string []) => set({tags: newTags}),
}))

export interface indexing {
    indexZustand: any
    setIndexZustand: (newIndex: number) => void;
}

export const editIndexing = create<indexing>()((set) => ({
    indexZustand: 0,
    setIndexZustand: (newIndex: number) => set({indexZustand: newIndex}),
}))
