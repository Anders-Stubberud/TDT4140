import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AvatarDemo } from "./avatar"
import { useRouter } from 'next/navigation'
import { useAuthState } from "react-firebase-hooks/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase.js";
import { Logo } from "@/components/icons";
import { signOut } from "firebase/auth";
import { Bot } from "lucide-react";
import { NavigationMenuDemo } from "./navigationmenu";
import { zustand } from "../state/zustand";
import { getAuth } from "firebase/auth";
import { useTheme } from "next-themes";

export function SheetDemo() {

    const router = useRouter();
    const app = initializeApp(firebaseConfig);
    const {setIsLoggedIn} = zustand();
    const auth = getAuth();
    const [user] = useAuthState(auth);
    const { theme, setTheme } = useTheme();

    const logOut = () => {
        signOut(auth)
        localStorage.removeItem('userID')
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost"><AvatarDemo></AvatarDemo></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={`w-56 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator className="scroll-m-2 border-b pb-2 text-m font-semibold tracking-tight first:mt-0"/>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => router.push('/profile')}>
              <button className="text-m">
                Profile
              </button>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="scroll-m-2 border-b pb-2 text-m font-semibold tracking-tight first:mt-0"/>
          <DropdownMenuItem> 
            <button onClick={() => logOut()}>
              Log out
            </button>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
}
