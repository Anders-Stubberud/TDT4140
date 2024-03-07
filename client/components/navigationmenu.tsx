"use client";

import * as React from "react";
import Link from "next/link";
import { toggleDarkMode } from "../state/zustand";
import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons"
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { toggleSet } from "../state/zustand"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Create flashcards",
    href: "/createflashcards",
    description: "Create yout own flashcards",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export function NavigationMenuDemo() {
  const { dark } = toggleDarkMode();
  const router = useRouter();
  const { setname, setSet } = toggleSet();

  return (
    <NavigationMenu className="ml-5">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Play with flashcards</NavigationMenuTrigger>
          <NavigationMenuContent className={dark}>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[350px] lg:grid-cols-[.75fr_1fr]">
              <NextLink href="allSets">
              <ListItem href="/docs/primitives/typography" title="routine resistor">
                View all sets
              </ListItem>
              </NextLink>
              <NextLink href="allSets">
                <ListItem title="stability stalwart">
                  Filters and searching
                </ListItem>
              </NextLink>
              <NextLink href='displayFlashcardSet'>
                <ListItem title="daredevil" onClick={() => setSet('stock')}>
                  Randomized sets
                </ListItem>
              </NextLink>
              <NextLink href='favourites'>
                <ListItem title="me-centric master">
                  Your favourite sets
                </ListItem>
              </NextLink>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Create flashcards</NavigationMenuTrigger>
          <NavigationMenuContent className={dark}>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <NextLink key={component.title} href={component.href}>
                  <ListItem title={component.title} href={component.href}>
                    {component.description}
                  </ListItem>
                </NextLink>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
