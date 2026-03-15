import { create } from "zustand"
import { SystemApplications } from "@/lib/applications"
import type { Application } from "@/types/application"

type DockStore = {
	height: number
	setHeight: (height: number) => void
	applications: Application[]
	setApplications: (applications: Application[]) => void
}

export const useDockStore = create<DockStore>(set => ({
	height: 40,
	setHeight: height => set({ height }),
	applications: [
		{ ...SystemApplications.Safari, isPinned: true },
		{ ...SystemApplications.VSCode, isPinned: true },
		{ ...SystemApplications.Ghostty, isPinned: true },
		{ ...SystemApplications.ChatGPT, isPinned: true },
	],
	setApplications: applications => set({ applications }),
}))
