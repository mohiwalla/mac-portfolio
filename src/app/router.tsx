import { useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router"

import { useGlobalStore } from "@/stores/global"
import HomeScreen from "@/app/screens/home"

export default function Router() {
	const { setMacFocused } = useGlobalStore()

	useEffect(() => {
		window.onfocus = () => setMacFocused(true)
		window.onblur = () => setMacFocused(false)
	}, [setMacFocused])

	return (
		<BrowserRouter>
			<Routes>
				<Route index path="/" element={<HomeScreen />} />
			</Routes>
		</BrowserRouter>
	)
}
