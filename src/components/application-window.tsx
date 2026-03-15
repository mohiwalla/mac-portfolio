import TrafficLights from "@/components/traffic-lights"
import { cn } from "@/lib/utils"
import { useApplicationStore } from "@/stores/application"
import { useGlobalStore } from "@/stores/global"
import type { WindowInstance } from "@/types/window"

export default function ApplicationWindow({
	id,
	index,
	position,
	children,
	application,
}: WindowInstance & { index: number }) {
	const { macFocused } = useGlobalStore()

	const {
		openWindowInstances,
		setOpenWindowInstances,
		activeWindowInstanceID,
		setActiveWindowInstanceID,
		setActiveApplication,
	} = useApplicationStore()
	const { x, y, width, height } = position

	const isWindowFocused = macFocused && activeWindowInstanceID === id

	return (
		<article
			onMouseDown={() => {
				setActiveWindowInstanceID(id)
				setActiveApplication(application)

				setOpenWindowInstances(
					openWindowInstances
						.map(instance => {
							if (instance.id !== id) {
								return instance
							}

							return { ...instance, lastFocused: Date.now() }
						})
						.sort((a, b) => a.lastFocused - b.lastFocused),
				)
			}}
			className={cn(
				"bg-background squircle absolute rounded-[32px] border-[0.5px] border-white/15 shadow-black/75",
				isWindowFocused ? "shadow-xl" : "shadow-2xl",
			)}
			style={{
				width,
				height,
				top: x,
				left: y,
				zIndex: index * 0.1,
			}}
		>
			<TrafficLights
				id={id}
				application={application}
				isWindowFocused={isWindowFocused}
			/>

			<section>{children}</section>
		</article>
	)
}
