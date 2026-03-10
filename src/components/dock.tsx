import { SystemApplications } from "@/lib/applications"
import { cn } from "@/lib/utils"
import { useDockStore } from "@/stores/dock"
import { useApplicationStore } from "@/stores/application"
import type { Application } from "@/types/application"

export default function Dock() {
	const { applications, height } = useDockStore()

	return (
		<footer
			className={cn(
				"squircle mx-auto mb-1.5 flex bg-black/20 px-1.5 backdrop-blur-sm",
				CSS.supports("corner-shape: round")
					? "rounded-full"
					: "rounded-4xl",
			)}
		>
			<DockApplication
				application={SystemApplications.Finder}
				height={height}
			/>

			{applications.map((application, i) => (
				<DockApplication
					key={i}
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
	const { setActiveApplication } = useApplicationStore()
	const { isOpen, isPinned, name, icon } = application

	if (!isOpen && !isPinned) {
		return null
	}

	return (
		<div
			title={name}
			className="group relative px-1.75 py-3 select-none"
			onClick={() => setActiveApplication(application)}
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
	return <span className="mx-2 my-2 w-px bg-white/30"></span>
}
