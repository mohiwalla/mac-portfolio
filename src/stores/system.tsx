import { SystemApplications } from "@/lib/applications"
import type { Application } from "@/types/application"
import { create } from "zustand"

type SystemStore = {
	activeApplication: Application
	setActiveApplication: (application: Application) => void
}

export const useSystemStore = create<SystemStore>(set => ({
	activeApplication: SystemApplications.Finder,
	setActiveApplication: (application: Application) =>
		set({ activeApplication: application }),
}))
