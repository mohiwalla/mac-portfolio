export default function LoadingPage() {
	return (
		<div className="grid h-screen w-screen place-items-center">
			<div className="flex justify-center gap-2">
				<span className="bg-foreground animate-caret-blink size-3 rounded-full"></span>
				<span className="bg-foreground animate-caret-blink size-3 rounded-full delay-150"></span>
				<span className="bg-foreground animate-caret-blink size-3 rounded-full delay-300"></span>
			</div>
		</div>
	)
}
