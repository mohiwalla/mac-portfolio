import finderInstance from "@/lib/finder-instance"
import { useApplicationStore } from "@/stores/application"
import type { WindowInstance } from "@/types/window"

export function focusWindowInstance(
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

export function handleApplicationClose(id: WindowInstance["id"]) {
	closeApplicationInstance(id)

	const { openWindowInstances } = useApplicationStore.getState()
	const newActiveInstance = openWindowInstances.at(-1) || finderInstance

	focusWindowInstance(newActiveInstance.id, newActiveInstance.application)
}

function closeApplicationInstance(id: WindowInstance["id"]) {
	const { openWindowInstances, setOpenWindowInstances } =
		useApplicationStore.getState()

	const newOpenWindowInstances = openWindowInstances.filter(
		instance => instance.id !== id,
	)

	setOpenWindowInstances(newOpenWindowInstances)
}
