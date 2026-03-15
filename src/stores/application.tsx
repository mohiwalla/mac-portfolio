import { SystemApplications } from "@/lib/applications"
import type { Application } from "@/types/application"
import type { WindowInstance } from "@/types/window"
import { create } from "zustand"

type ApplicationStore = {
	activeWindowInstanceID: string
	setActiveWindowInstanceID: (application: string) => void
	activeApplication: Application
	setActiveApplication: (application: Application) => void
	openWindowInstances: WindowInstance[]
	setOpenWindowInstances: (windowInstances: WindowInstance[]) => void
}

export const useApplicationStore = create<ApplicationStore>(set => ({
	activeWindowInstanceID: "system",
	setActiveWindowInstanceID: application =>
		set({ activeWindowInstanceID: application }),
	activeApplication: SystemApplications.Finder,
	setActiveApplication: (application: Application) =>
		set({ activeApplication: application }),
	openWindowInstances: [],
	setOpenWindowInstances: windowInstances =>
		set({ openWindowInstances: windowInstances }),
}))
