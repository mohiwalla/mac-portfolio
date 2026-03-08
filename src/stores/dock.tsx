import { create } from "zustand"
import type { Applications } from "@/types/application"
import { SystemApplications } from "@/lib/applications"

type DockStore = {
	height: number
	setHeight: (height: number) => void
	applications: Applications
	setApplications: (applications: Applications) => void
}

export const useDockStore = create<DockStore>(set => ({
	height: 40,
	setHeight: height => set({ height }),
	applications: [
		{ ...SystemApplications.Safari, isPinned: true },
		{ ...SystemApplications.VSCode, isPinned: true },
		{ ...SystemApplications.Ghostty, isPinned: true },
		{ ...SystemApplications.ChatGPT, isPinned: true },
		{ ...SystemApplications.Preview, isPinned: true },
	],
	setApplications: applications => set({ applications }),
}))
