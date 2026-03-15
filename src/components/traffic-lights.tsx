import { cn } from "@/lib/utils"
import MaximizeIcon from "@/components/icons/maximize"
import type { Application } from "@/types/application"
import { handleApplicationClose } from "@/utils/application-window"
import { Minus, X } from "lucide-react"

export default function TrafficLights({
	id,
	isWindowFocused,
	application: _,
}: {
	id: string
	isWindowFocused: boolean
	application: Application
}) {
	return (
		<div className="group inline-flex items-center justify-start gap-2 px-3 py-2.75">
			<TrafficLightButton
				onClick={() => handleApplicationClose(id)}
				className={cn(
					"bg-[rgb(236_101_103)] group-hover:bg-[rgb(236_101_103)]",
					!isWindowFocused && "bg-secondary-button-active",
				)}
			>
				<X
					className="size-2.5 text-[rgb(117,45,42)] opacity-0 duration-15 group-hover:opacity-100"
					strokeWidth={4.5}
				/>
			</TrafficLightButton>

			<TrafficLightButton
				className={cn(
					"bg-[rgb(240,198,60)] group-hover:bg-[rgb(240,198,60)]",
					!isWindowFocused && "bg-secondary-button-active",
				)}
			>
				<Minus
					className="size-2.5 text-[rgb(117,45,42)] opacity-0 duration-15 group-hover:opacity-100"
					strokeWidth={4.5}
				/>
			</TrafficLightButton>

			<TrafficLightButton
				className={cn(
					"bg-[rgb(80,193,82)] group-hover:bg-[rgb(80,193,82)]",
					!isWindowFocused && "bg-secondary-button-active",
				)}
			>
				<MaximizeIcon className="size-2.5 rotate-90 text-[rgb(117,45,42)] opacity-0 duration-15 group-hover:opacity-100" />
			</TrafficLightButton>
		</div>
	)
}

function TrafficLightButton({
	className,
	children,
	onMouseDown,
	onClick,
	...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			tabIndex={-1}
			onMouseDown={event => {
				event.stopPropagation()
				onMouseDown?.(event)
			}}
			onClick={event => {
				event.stopPropagation()
				onClick?.(event)
			}}
			className={cn(
				"flex size-3.25 shrink-0 items-center justify-center rounded-full",
				className,
			)}
			{...props}
		>
			{children}
		</button>
	)
}
