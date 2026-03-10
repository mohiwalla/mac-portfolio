import { BrowserRouter, Route, Routes } from "react-router"

import Menubar from "@/components/menubar"
import Dock from "@/components/dock"

import HomeScreen from "@/app/screens/home"
import { useGlobalStore } from "@/stores/global"
import { useEffect } from "react"

export default function Router() {
	const { setMacFocused } = useGlobalStore()

	useEffect(() => {
		window.onfocus = () => setMacFocused(true)
		window.onblur = () => setMacFocused(false)
	}, [])

	return (
		<div className="flex h-screen max-h-screen min-h-screen w-screen min-w-screen flex-col bg-[url('/images/wallpapers/sequioa.jpeg')] bg-cover bg-no-repeat">
			<BrowserRouter>
				<Menubar />

				<Routes>
					<Route index path="/" element={<HomeScreen />} />
				</Routes>

				<Dock />
			</BrowserRouter>
		</div>
	)
}
