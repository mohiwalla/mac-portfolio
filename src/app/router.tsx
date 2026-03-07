import { BrowserRouter, Route, Routes } from "react-router"

import HomePage from "@/app/home"
import NotFoundPage from "@/app/not-found"
import MenubarNative from "@/components/menubar"

export default function Router() {
	return (
		<BrowserRouter>
			<MenubarNative />

			<Routes>
				<Route path="*" element={<NotFoundPage />} />
				<Route index path="/" element={<HomePage />} />
			</Routes>
		</BrowserRouter>
	)
}
