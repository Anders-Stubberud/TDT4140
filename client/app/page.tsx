"use client";

import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
<<<<<<< HEAD
import { Code } from "@nextui-org/code";
=======
import { Code } from "@nextui-org/code"
>>>>>>> dev
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { useEffect, useState } from "react";
<<<<<<< HEAD
import { SearchBar } from "@/components/searchbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
export default function Home() {
  const [data, setData] = useState();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api")
      .then((res) => res.json())
      .then((d) => setData(d.test));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index) => (index + 1) % 3);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Use&nbsp;</h1>
          <h1 className={title({ color: "violet" })}>Flashy&nbsp;</h1>
          <br />
          <h1 className={title()}>to level up your learning</h1>
          <h2 className={subtitle({ class: "mt-4" })}>
            Proudly presented by group 40
          </h2>
        </div>

        <div className="flex gap-3">
          <div
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
          >
            Create User
          </div>
          <div
            className={buttonStyles({ variant: "bordered", radius: "full" })}
          >
            Login
          </div>
        </div>

        <div className="mt-8"></div>
      </section>
    </>
  );
=======
import { Button } from "@/components/ui/button"
import { CustomCarousel } from "@/components/custom-carousel";
import { useTheme } from "next-themes";
import useWindowSize from 'react-use/lib/useWindowSize'
import { useRouter } from 'next/navigation'
import Confetti from 'react-confetti'

export default function Home() {

  const router = useRouter();
	const [login, toggleLogin] = useState(false);
	const [darkmode, setDarkmode] = useState<boolean>(true)
	const { theme, setTheme } = useTheme();
	const { width, height } = useWindowSize()

	useEffect(() => {
		setDarkmode(theme === "dark");
	}, [theme])

	const customstyle = {
		backgroundColor: darkmode ? "white" : "black",
		color: darkmode ? "black" : "white"
	}

	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-7.5">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>Use&nbsp;</h1>
				<h1 className={title({ color: "violet" })}>Flashy&nbsp;</h1>
				<br />
				<h1 className={title()}>
					to level up your learning
				</h1>
				<div>
					<CustomCarousel></CustomCarousel>
					<Button style={customstyle} size="lg" className="mt-10" onClick={() => router.push('/login')}>
            Sign me up!
					</Button>
          <h4 className="font-bold text-large mt-3">Already a member? <span className="ml-1 text-blue-600 underline cursor-pointer" onClick={() => router.push('/login')}>Log in</span> </h4>
				</div>
			</div>
		</section>
	);
>>>>>>> dev
}
