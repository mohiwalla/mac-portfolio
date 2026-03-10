import { create } from "zustand"

type GlobalStore = {
	macFocused: boolean
	setMacFocused: (focus: boolean) => void
}

export const useGlobalStore = create<GlobalStore>(set => ({
	macFocused: true,
	setMacFocused: (focus: boolean) => set({ macFocused: focus }),
}))
