import type { Application } from "@/types/application"

export type WindowPosition = {
	x: number
	y: number
	height: number
	width: number
}

export type WindowInstance = {
	id: string
	application: Application
	children: React.ReactNode
	position: WindowPosition
	isMinimized?: boolean
	isMaximized?: boolean
	lastFocused: number
}
