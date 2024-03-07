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

export function SheetDemo() {

    const router = useRouter();
    const app = initializeApp(firebaseConfig);
    const {setIsLoggedIn} = zustand();
    const auth = getAuth();
    const [user] = useAuthState(auth);

    const logOut = () => {
        signOut(auth)
        localStorage.removeItem('userID')
    }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost"><AvatarDemo></AvatarDemo></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push('/profile')}>
            <button className="m-2">Settings</button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button className="m-2">My sets</button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button className="m-2">My favourite sets</button>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-center mt-10">
            <Button onClick={() => logOut()} type="submit" className="mt-28 bg-red-700">
              Log out
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
