"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { getAuth } from "firebase/auth";
import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";
import { zustand } from "../state/zustand";
import { useEffect } from "react";
import { LoggedOutNavbar } from "./loggedOutNavbar";
import { LoggedInNavbar } from "./loggedInNavbar";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
} from "@/components/icons";
import { Logo } from "@/components/icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase.js";
import { signOut } from "firebase/auth";
export const Navbar = () => {

  const app = initializeApp(firebaseConfig);
  const {isLoggedIn} = zustand();
  const auth = getAuth();
  const [user] = useAuthState(auth);

  return (
    <div>
      {
        user?
        <LoggedInNavbar></LoggedInNavbar>
        :
        <LoggedOutNavbar></LoggedOutNavbar>
      }
    </div>
  );
};
