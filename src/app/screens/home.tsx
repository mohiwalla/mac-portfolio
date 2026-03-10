import ApplicationWindow from "@/components/window"
import { useApplicationStore } from "@/stores/application"
import { useEffect } from "react"

export default function HomeScreen() {
	const { openWindowInstances } = useApplicationStore()

	useEffect(() => {
		// window.onkeydown = e => console.log(e.key)
		// window.onclick = () => document.body.requestFullscreen()
	}, [])

	return (
		<main className="relative grid flex-1">
			{openWindowInstances.map(
				({ id, application, position, children }, i) => (
					<ApplicationWindow
						key={i}
						id={id}
						index={i}
						application={application}
						position={position}
					>
						{children}
					</ApplicationWindow>
				),
			)}
		</main>
	)
}
