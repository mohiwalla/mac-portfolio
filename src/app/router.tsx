import { BrowserRouter, Route, Routes } from "react-router"

import HomePage from "@/app/home"
import NotFoundPage from "@/app/not-found"
import Menubar from "@/components/menubar"
import Dock from "@/components/dock"

export default function Router() {
	return (
		<div className="flex h-screen max-h-screen min-h-screen w-screen min-w-screen flex-col bg-[url('/images/wallpapers/sequioa.jpeg')] bg-cover bg-no-repeat">
			<BrowserRouter>
				<Menubar />

				<Routes>
					<Route path="*" element={<NotFoundPage />} />
					<Route index path="/" element={<HomePage />} />
				</Routes>

				<Dock />
			</BrowserRouter>
		</div>
	)
}
