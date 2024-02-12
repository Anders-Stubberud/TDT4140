"use client";

import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { useEffect, useState } from "react";
import { Login } from "@/components/login";
import { Button } from "@/components/ui/button"
import { CustomCarousel } from "@/components/custom-carousel";
import { useTheme } from "next-themes";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

export default function Home() {

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
				{login ?
				<div>
					<Login></Login>
				</div>
				:
				<div>
					<CustomCarousel></CustomCarousel>
					<Button style={customstyle} size="lg" className="mt-10" onClick={() => toggleLogin(true)}>
						Okay let's go!
					</Button>
				</div>
				}
			</div>
		</section>
	);
}
