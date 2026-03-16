import ApplicationWindow from "@/components/application-window"
import Dock from "@/components/dock"
import Menubar from "@/components/menubar"
import { SystemApplications } from "@/lib/applications"
import { clamp } from "@/lib/utils"
import { useApplicationStore } from "@/stores/application"
import { focusWindowInstance } from "@/utils/application-window"
import { useCallback, useEffect, useRef, useState } from "react"

type Point = { x: number; y: number }

export default function HomeScreen() {
	const { openWindowInstances } = useApplicationStore()
	const selectionStartRef = useRef<Point | null>(null)
	const activePointerIdRef = useRef<number | null>(null)
	const [isSelecting, setIsSelecting] = useState(false)
	const [selectionBox, setSelectionBox] = useState<{
		x: number
		y: number
		width: number
		height: number
	} | null>(null)

	const updateSelectionBox = useCallback(
		(clientX: number, clientY: number) => {
			const start = selectionStartRef.current
			if (!start) {
				return
			}

			const currentX = clamp(clientX, 0, window.innerWidth)
			const currentY = clamp(clientY, 0, window.innerHeight)

			setSelectionBox({
				x: Math.min(start.x, currentX),
				y: Math.min(start.y, currentY),
				width: Math.abs(currentX - start.x),
				height: Math.abs(currentY - start.y),
			})
		},
		[],
	)

	function stopDesktopSelection() {
		if (!selectionStartRef.current) {
			return
		}

		selectionStartRef.current = null
		activePointerIdRef.current = null
		setIsSelecting(false)
		setSelectionBox(null)
	}

	function handleDesktopPointerDown(e: React.PointerEvent<HTMLElement>) {
		if (e.button !== 0 || e.target !== e.currentTarget) {
			return
		}

		e.preventDefault()

		const x = clamp(e.clientX, 0, window.innerWidth)
		const y = clamp(e.clientY, 0, window.innerHeight)

		selectionStartRef.current = { x, y }
		activePointerIdRef.current = e.pointerId
		setIsSelecting(true)
		setSelectionBox({ x, y, width: 0, height: 0 })
		focusWindowInstance("system", SystemApplications.Finder)
	}

	useEffect(() => {
		if (!isSelecting) {
			return
		}

		function handlePointerMove(e: PointerEvent) {
			if (
				activePointerIdRef.current !== null &&
				e.pointerId !== activePointerIdRef.current
			) {
				return
			}

			updateSelectionBox(e.clientX, e.clientY)
		}

		function handlePointerUp(e: PointerEvent) {
			if (
				activePointerIdRef.current !== null &&
				e.pointerId !== activePointerIdRef.current
			) {
				return
			}

			stopDesktopSelection()
		}

		function handleBlur() {
			stopDesktopSelection()
		}

		window.addEventListener("pointermove", handlePointerMove)
		window.addEventListener("pointerup", handlePointerUp)
		window.addEventListener("pointercancel", handlePointerUp)
		window.addEventListener("blur", handleBlur)

		return () => {
			window.removeEventListener("pointermove", handlePointerMove)
			window.removeEventListener("pointerup", handlePointerUp)
			window.removeEventListener("pointercancel", handlePointerUp)
			window.removeEventListener("blur", handleBlur)
		}
	}, [isSelecting, updateSelectionBox])

	return (
		<div
			onPointerDown={handleDesktopPointerDown}
			className="flex h-screen max-h-screen min-h-screen w-screen min-w-screen flex-col overflow-hidden bg-[url('/images/wallpapers/sequioa.jpeg')] bg-cover bg-no-repeat"
		>
			<Menubar />

			<main
				className="relative grid flex-1"
				onPointerDown={handleDesktopPointerDown}
			>
				{selectionBox ? (
					<span
						className="pointer-events-none fixed z-1 border border-white/45 bg-white/20"
						style={{
							left: selectionBox.x,
							top: selectionBox.y,
							width: selectionBox.width,
							height: selectionBox.height,
						}}
					/>
				) : null}

				{openWindowInstances.map((instance, i) => (
					<ApplicationWindow
						key={instance.id}
						index={i}
						{...instance}
					/>
				))}
			</main>

			<Dock />
		</div>
	)
}
