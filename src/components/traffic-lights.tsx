import MaximizeIcon from "@/components/icons/maximize"
import { cn } from "@/lib/utils"
import { Minus, X } from "lucide-react"

export default function TrafficLights({
	isWindowFocused,
}: {
	isWindowFocused: boolean
}) {
	return (
		<div className="group flex items-center justify-start gap-2 px-3 py-2.75">
			<TrafficLightButton
				className={cn(
					"bg-[rgb(233_92_90)] group-hover:bg-[rgb(233_92_90)]",
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
	...props
}: React.HTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			tabIndex={-1}
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
