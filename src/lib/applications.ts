import type { Application } from "@/types/application"

export const SystemApplications = {
	Finder: {
		name: "Finder",
		icon: "/icons/finder.png",
		isOpen: true,
		isPinned: true,
	},
	Trash: {
		name: "Trash",
		shortName: "Finder",
		icon: "/icons/trash.png",
		isOpen: false,
		isPinned: true,
	},
	Safari: {
		name: "Safari",
		icon: "/icons/safari.png",
	},
	VSCode: {
		name: "Visual Studio Code",
		shortName: "Code",
		icon: "/icons/vscode.png",
	},
	ChatGPT: {
		name: "ChatGPT",
		icon: "/icons/chatgpt.png",
	},
	GoogleChrome: {
		name: "Google Chrome",
		icon: "/icons/google-chrome.png",
	},
	Ghostty: {
		name: "Ghostty",
		icon: "/icons/ghostty.png",
	},
	Preview: {
		name: "Preview",
		icon: "/icons/preview.png",
	},
} satisfies Record<string, Application>
