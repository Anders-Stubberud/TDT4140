"use client";

import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { useEffect, useState } from "react";

export default function Home() {

	const [data, setData] = useState();
	const [index, setIndex] = useState(0);

	useEffect(() => {
		fetch("http://localhost:5000/api").then(
			res => res.json()
		).then(
			d => setData(d.test)
		)
	}, [])

	useEffect(() => {
		const interval = setInterval(() => {
		  setIndex((index) => ((index + 1) % 3));
		}, 500);
	
		return () => clearInterval(interval);
	  }, []);

	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>Use&nbsp;</h1>
				<h1 className={title({ color: "violet" })}>Flashy&nbsp;</h1>
				<br />
				<h1 className={title()}>
					to level up your learning
				</h1>
				<h2 className={subtitle({ class: "mt-4" })}>
					Proudly presented by group 40
				</h2>
			</div>

			<div className="flex gap-3">
				<div
					className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
				>
					Create User
				</div>
				<div
					className={buttonStyles({ variant: "bordered", radius: "full" })}
				>
					Login
				</div>
			</div>

			<div className="mt-8">
				<Snippet hideSymbol hideCopyButton variant="flat">
					<span>
						{data ? data[index] : "gruppe 40 <3 <3 <3"}
					</span>
				</Snippet>
			</div>
		</section>
	);
}
