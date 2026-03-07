import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router"
import { ArrowLeft, Dumbbell } from "lucide-react"

export default function NotFoundPage() {
	const navigate = useNavigate()

	return (
		<main className="grid h-[calc(100vh-69px)] place-items-center">
			<div className="flex max-w-[300px] flex-col gap-4 p-6 text-center">
				<hgroup>
					<h1 className="text-6xl font-bold">404</h1>
					<p className="text-muted-foreground">Page not found</p>
				</hgroup>

				<p>
					The page you're looking for doesn't exist or has been moved.
				</p>

				<div className="mt-6 flex flex-col gap-3 sm:flex-row">
					<Button
						variant="outline"
						className="grow gap-1.5"
						onClick={() =>
							history.length > 1 ? history.back() : navigate("/")
						}
					>
						<ArrowLeft /> Go back
					</Button>

					<Button
						className="grow gap-1.5"
						render={
							<Link to="/">
								<Dumbbell /> Return GYM
							</Link>
						}
					></Button>
				</div>
			</div>
		</main>
	)
}
