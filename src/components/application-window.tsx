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
				translate: `${x}px ${y}px`,
				zIndex: index * 0.1,
			}}
		>
			<ApplicationWindowHeader
				id={id}
				application={application}
				isWindowFocused={isWindowFocused}
			/>

			<section>{children}</section>
		</article>
	)
}

function ApplicationWindowHeader({
	id,
	application,
	isWindowFocused,
}: {
	id: WindowInstance["id"]
	application: WindowInstance["application"]
	isWindowFocused: boolean
}) {
	const { setOpenWindowInstances } = useApplicationStore()

	function handleApplicationDrag() {
		function handleWindowDrag(e: MouseEvent) {
			const { openWindowInstances } = useApplicationStore.getState()

			const newOpenWindowInstances = openWindowInstances.map(instance => {
				if (instance.id === id) {
					return {
						...instance,
						position: {
							...instance.position,
							x: instance.position.x + e.movementX,
							y: instance.position.y + e.movementY,
						},
					}
				}

				return instance
			})

			setOpenWindowInstances(newOpenWindowInstances)
		}

		function stopDragging() {
			window.removeEventListener("mousemove", handleWindowDrag)
			window.removeEventListener("mouseup", stopDragging)
		}

		window.addEventListener("mousemove", handleWindowDrag)
		window.addEventListener("mouseup", stopDragging, { once: true })
	}

	return (
		<header
			// draggable
			onMouseDown={e => {
				e.preventDefault()
				handleApplicationDrag()
			}}
			// onMouseMove={e => {
			// 	console.log(e.pageX, e.clientX, e.screenX, e.movementX)
			// 	setDelta({
			// 		x: e.pageX,
			// 		y: e.pageY,
			// 	})
			// }}
		>
			<TrafficLights
				id={id}
				application={application}
				isWindowFocused={isWindowFocused}
			/>
		</header>
	)
}
