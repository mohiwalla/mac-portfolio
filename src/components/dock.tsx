import { SystemApplications } from "@/lib/applications"
import { useDockStore } from "@/stores/dock"
import { useApplicationStore } from "@/stores/application"
import type { Application } from "@/types/application"
import { MIN_WINDOW_HEIGHT, MIN_WINDOW_WIDTH } from "@/types/window"
import { focusWindowInstance } from "@/utils/application-window"

export default function Dock() {
	const { applications, height } = useDockStore()

	return (
		<footer className="squircle z-99999 mx-auto mb-1.5 flex rounded-full bg-black/20 px-1.5 backdrop-blur-sm">
			<DockApplication
				application={SystemApplications.Finder}
				height={height}
			/>

			{applications.map(application => (
				<DockApplication
					key={application.name}
					application={application}
					height={height}
				/>
			))}

			<DockSeparator />

			<DockApplication
				application={SystemApplications.Trash}
				height={height}
			/>
		</footer>
	)
}

function DockApplication({
	application,
	height,
}: {
	application: Application
	height: number
}) {
	const { name, icon } = application
	const {
		setActiveApplication,
		setActiveWindowInstanceID,
		openWindowInstances,
		setOpenWindowInstances,
	} = useApplicationStore()

	const isOpen =
		(openWindowInstances.some(
			instance => instance.application.name === application.name,
		) ||
			application.name === "Finder") &&
		application.name !== "Trash"

	function handleDockAppIconClick() {
		const existingInstance = openWindowInstances.find(
			instance => instance.application.name === application.name,
		)

		if (existingInstance) {
			focusWindowInstance(existingInstance.id, application)
			return
		}

		const instanceID = crypto.randomUUID()

		setActiveApplication(application)
		setActiveWindowInstanceID(instanceID)

		const newOpenWindowInstances = [...openWindowInstances]
		newOpenWindowInstances.push({
			application,
			id: instanceID,
			children: <div className="p-2">{application.name}</div>,
			position: {
				x: 100 * openWindowInstances.length,
				y: 100 * openWindowInstances.length,
				width: MIN_WINDOW_WIDTH,
				height: MIN_WINDOW_HEIGHT,
			},
			lastFocused: Date.now(),
		})

		setOpenWindowInstances(newOpenWindowInstances)
	}

	return (
		<div
			title={name}
			className="group relative px-1.75 py-3 select-none"
			onClick={handleDockAppIconClick}
		>
			<img
				src={icon}
				style={{
					height,
				}}
				className="aspect-square group-active:brightness-60"
				draggable={false}
			/>

			{isOpen && (
				<span className="pointer-events-none absolute bottom-0.75 left-1/2 size-1 -translate-x-1/2 rounded-full bg-white/60"></span>
			)}
		</div>
	)
}

function DockSeparator() {
	return (
		<div className="flex px-2">
			<div className="my-2 w-px shrink-0 bg-white/30"></div>
		</div>
	)
}
