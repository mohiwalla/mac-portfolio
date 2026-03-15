import ApplicationWindow from "@/components/application-window"
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
			{openWindowInstances.map((instance, i) => (
				<ApplicationWindow key={instance.id} index={i} {...instance} />
			))}
		</main>
	)
}
