import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AvatarDemo } from "./avatar"
import NextLink from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useAuthState } from "react-firebase-hooks/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase.js";
import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";


export function SheetDemo() {

    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const [user] = useAuthState(auth);

  return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost">
                    <AvatarDemo></AvatarDemo>
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                    Make changes to your profile here. Click save when you're done.
                </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                    Name
                    </Label>
                    <Input id="name" placeholder="Pedro Duarte" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                    Username
                    </Label>
                    <Input id="username" placeholder="@peduarte" className="col-span-3" />
                </div>
                </div>
                <SheetFooter>
                <SheetClose asChild>
                    <Button type="submit">Save changes</Button>
                </SheetClose>
                </SheetFooter>
                <div className="flex justify-center mt-64">
                    <NextLink href='/'>
                        <Button onClick={() => signOut(auth)} type="submit" className="mt-28 bg-red-700">
                            Log out
                        </Button>
                    </NextLink>
                </div>
            </SheetContent>
        </Sheet>
  )
}
