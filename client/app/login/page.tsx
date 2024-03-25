"use client";

import Login from "@/components/login";
import dynamic from "next/dynamic";

const DynamicLogin = dynamic(() => import("@/components/login"), {
	ssr: false,
});

export default function LoginPage() {
	return (
		<div>
			<DynamicLogin></DynamicLogin>
		</div>
	);
}
