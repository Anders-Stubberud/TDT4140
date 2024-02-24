"use client";

import FlashcardSetListDisplay from "@/components/flashcardSetListDisplay";
import { title } from "@/components/primitives";
import { DataTableDemo } from "@/components/scrollarea";


export default function allSetsPage() {
	return (
		<div>
			<FlashcardSetListDisplay></FlashcardSetListDisplay>
		</div>
	);
}
