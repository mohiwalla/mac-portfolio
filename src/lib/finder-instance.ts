import { SystemApplications } from "@/lib/applications"
import type { WindowInstance } from "@/types/window"

const finderInstance: WindowInstance = {
	id: "system",
	application: SystemApplications.Finder,
	children: null,
	lastFocused: Date.now(),
	position: {
		x: 0,
		y: 0,
		height: 0,
		width: 0,
	},
}

export default finderInstance
