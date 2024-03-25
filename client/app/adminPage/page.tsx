"use client";

import dynamic from "next/dynamic";

const DynamicAdmin = dynamic(() => import("@/components/admin"), {
	ssr: false,
});

export default function AdminPage() {

	return <DynamicAdmin></DynamicAdmin>

}
