import TrafficLights from "@/components/traffic-lights"
import { cn } from "@/lib/utils"
import { useApplicationStore } from "@/stores/application"
import { useGlobalStore } from "@/stores/global"
import type { ResizeDirection, WindowInstance } from "@/types/window"
import { MIN_WINDOW_HEIGHT, MIN_WINDOW_WIDTH } from "@/types/window"
import { useEffect, useRef, useState } from "react"

const resizeHandles: {
	direction: ResizeDirection
	className: string
}[] = [
	{ direction: "n", className: "-top-1 left-2 right-2 h-2 cursor-n-resize" },
	{
		direction: "s",
		className: "-bottom-1 left-2 right-2 h-2 cursor-s-resize",
	},
	{
		direction: "e",
		className: "-right-1 top-2 bottom-2 w-2 cursor-e-resize",
	},
	{ direction: "w", className: "-left-1 top-2 bottom-2 w-2 cursor-w-resize" },
	{ direction: "ne", className: "-top-1 -right-1 size-3 cursor-ne-resize" },
	{ direction: "nw", className: "-top-1 -left-1 size-3 cursor-nw-resize" },
	{
		direction: "se",
		className: "-right-1 -bottom-1 size-3 cursor-se-resize",
	},
	{ direction: "sw", className: "-left-1 -bottom-1 size-3 cursor-sw-resize" },
]

function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max)
}

function focusWindowInstance(
	id: WindowInstance["id"],
	application: WindowInstance["application"],
) {
	const {
		openWindowInstances,
		setOpenWindowInstances,
		setActiveWindowInstanceID,
		setActiveApplication,
	} = useApplicationStore.getState()

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
}

function commitWindowPosition(
	id: WindowInstance["id"],
	position: WindowInstance["position"],
) {
	const { openWindowInstances, setOpenWindowInstances } =
		useApplicationStore.getState()

	let didChange = false

	const nextInstances = openWindowInstances.map(instance => {
		if (instance.id !== id) {
			return instance
		}

		const prev = instance.position
		if (
			prev.x === position.x &&
			prev.y === position.y &&
			prev.width === position.width &&
			prev.height === position.height
		) {
			return instance
		}

		didChange = true
		return { ...instance, position }
	})

	if (didChange) {
		setOpenWindowInstances(nextInstances)
	}
}

function calculateNextPositionFromResize({
	startPosition,
	deltaX,
	deltaY,
	direction,
}: {
	startPosition: WindowInstance["position"]
	deltaX: number
	deltaY: number
	direction: ResizeDirection
}) {
	const viewportWidth = window.innerWidth
	const viewportHeight = window.innerHeight

	const startRight = startPosition.x + startPosition.width
	const startBottom = startPosition.y + startPosition.height

	let nextLeft = startPosition.x
	let nextTop = startPosition.y
	let nextRight = startRight
	let nextBottom = startBottom

	if (direction.includes("e")) {
		nextRight = clamp(
			startRight + deltaX,
			nextLeft + MIN_WINDOW_WIDTH,
			viewportWidth,
		)
	}

	if (direction.includes("s")) {
		nextBottom = clamp(
			startBottom + deltaY,
			nextTop + MIN_WINDOW_HEIGHT,
			viewportHeight,
		)
	}

	if (direction.includes("w")) {
		nextLeft = clamp(
			startPosition.x + deltaX,
			0,
			startRight - MIN_WINDOW_WIDTH,
		)
	}

	if (direction.includes("n")) {
		nextTop = clamp(
			startPosition.y + deltaY,
			0,
			startBottom - MIN_WINDOW_HEIGHT,
		)
	}

	let width = Math.max(MIN_WINDOW_WIDTH, nextRight - nextLeft)
	let height = Math.max(MIN_WINDOW_HEIGHT, nextBottom - nextTop)

	width = Math.min(width, viewportWidth)
	height = Math.min(height, viewportHeight)

	const x = clamp(nextLeft, 0, Math.max(0, viewportWidth - width))
	const y = clamp(nextTop, 0, Math.max(0, viewportHeight - height))

	return { x, y, width, height }
}

export default function ApplicationWindow({
	id,
	index,
	position,
	children,
	application,
}: WindowInstance & { index: number }) {
	const { macFocused } = useGlobalStore()

	const activeWindowInstanceID = useApplicationStore(
		state => state.activeWindowInstanceID,
	)

	const [localPosition, setLocalPosition] = useState(position)
	const localPositionRef = useRef(position)
	const isInteractingRef = useRef(false)
	const { x, y, width, height } = localPosition

	const isWindowFocused = macFocused && activeWindowInstanceID === id

	useEffect(() => {
		if (!isInteractingRef.current) {
			localPositionRef.current = position
			setLocalPosition(position)
		}
	}, [position])

	function updateLocalPosition(nextPosition: WindowInstance["position"]) {
		localPositionRef.current = nextPosition
		setLocalPosition(nextPosition)
	}

	function handleDragStart(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()

		focusWindowInstance(id, application)
		isInteractingRef.current = true

		const startMouseX = e.clientX
		const startMouseY = e.clientY
		const startPosition = localPositionRef.current

		function handleWindowDrag(moveEvent: MouseEvent) {
			updateLocalPosition({
				...startPosition,
				x: startPosition.x + (moveEvent.clientX - startMouseX),
				y: startPosition.y + (moveEvent.clientY - startMouseY),
			})
		}

		function stopDragging() {
			isInteractingRef.current = false
			window.removeEventListener("mousemove", handleWindowDrag)
			window.removeEventListener("mouseup", stopDragging)
			commitWindowPosition(id, localPositionRef.current)
		}

		window.addEventListener("mousemove", handleWindowDrag)
		window.addEventListener("mouseup", stopDragging, { once: true })
	}

	function handleResizeStart(
		direction: ResizeDirection,
		e: React.MouseEvent,
	) {
		e.preventDefault()
		e.stopPropagation()

		focusWindowInstance(id, application)
		isInteractingRef.current = true

		const startMouseX = e.clientX
		const startMouseY = e.clientY
		const startPosition = localPositionRef.current

		function handleResizeWindow(moveEvent: MouseEvent) {
			const deltaX = moveEvent.clientX - startMouseX
			const deltaY = moveEvent.clientY - startMouseY

			const nextPosition = calculateNextPositionFromResize({
				startPosition,
				deltaX,
				deltaY,
				direction,
			})

			updateLocalPosition(nextPosition)
		}

		function stopResizing() {
			isInteractingRef.current = false
			window.removeEventListener("mousemove", handleResizeWindow)
			window.removeEventListener("mouseup", stopResizing)
			commitWindowPosition(id, localPositionRef.current)
		}

		window.addEventListener("mousemove", handleResizeWindow)
		window.addEventListener("mouseup", stopResizing, { once: true })
	}

	return (
		<article
			onMouseDown={() => {
				focusWindowInstance(id, application)
			}}
			className={cn(
				"bg-background squircle absolute rounded-[32px] border-[0.5px] border-white/15 shadow-black/75",
				isWindowFocused ? "shadow-xl" : "shadow-2xl",
			)}
			style={{
				width,
				height,
				top: y,
				left: x,
				zIndex: index * 0.1,
			}}
		>
			<ApplicationWindowHeader
				id={id}
				application={application}
				isWindowFocused={isWindowFocused}
				onDragStart={handleDragStart}
			/>

			<section>{children}</section>

			{resizeHandles.map(handle => (
				<span
					key={handle.direction}
					onMouseDown={e => handleResizeStart(handle.direction, e)}
					className={cn(
						"absolute z-20 rounded-full",
						handle.className,
						isWindowFocused ? "opacity-100" : "opacity-60",
					)}
				/>
			))}
		</article>
	)
}

function ApplicationWindowHeader({
	id,
	application,
	isWindowFocused,
	onDragStart,
}: {
	id: WindowInstance["id"]
	application: WindowInstance["application"]
	isWindowFocused: boolean
	onDragStart: (e: React.MouseEvent) => void
}) {
	return (
		<header
			// draggable
			onMouseDown={e => {
				onDragStart(e)
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
