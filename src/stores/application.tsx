import { SystemApplications } from "@/lib/applications"
import type { Application } from "@/types/application"
import type { WindowInstance } from "@/types/window"
import { create } from "zustand"

type ApplicationStore = {
	activeWindowInstanceID: string | null
	setActiveWindowInstanceID: (application: string | null) => void
	activeApplication: Application
	setActiveApplication: (application: Application) => void
	openWindowInstances: WindowInstance[]
	setOpenWindowInstances: (windowInstances: WindowInstance[]) => void
}

const openWindowInstances = [
	{
		id: "uuidV4",
		application: SystemApplications.Finder,
		children: <div className="px-3 py-2">Finder</div>,
		position: {
			x: 100,
			y: 100,
			width: 200,
			height: 120,
		},
		lastFocused: Date.now(),
	},
	{
		id: "uuidV5",
		application: SystemApplications.ChatGPT,
		children: <div className="px-3 py-2">ChatGPT</div>,
		position: {
			x: 200,
			y: 200,
			width: 200,
			height: 120,
		},
		lastFocused: Date.now(),
	},
] satisfies WindowInstance[]

export const useApplicationStore = create<ApplicationStore>(set => ({
	activeWindowInstanceID: null,
	setActiveWindowInstanceID: (application: string | null) =>
		set({ activeWindowInstanceID: application }),
	activeApplication: SystemApplications.Finder,
	setActiveApplication: (application: Application) =>
		set({ activeApplication: application }),
	openWindowInstances: openWindowInstances,
	setOpenWindowInstances: windowInstances =>
		set({ openWindowInstances: windowInstances }),
}))
