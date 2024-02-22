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
