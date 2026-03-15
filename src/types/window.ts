import type { Application } from "@/types/application"

type Coordinate = number
// | `${number}px`
// | `-${number}px`
// | `${string}%`
// | `-${number}%`

export type WindowPosition = {
	x: Coordinate
	y: Coordinate
	height: Coordinate
	width: Coordinate
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
