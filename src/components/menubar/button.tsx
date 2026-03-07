import { cn } from "@/lib/utils"

export default function MenubarButton({
	className,
	children,
	...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button className={cn("rounded-2xl px-4", className)} {...props}>
			{children}
		</button>
	)
}
