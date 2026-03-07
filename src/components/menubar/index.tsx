import AppleIcon from "../apple-icon"
import {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarGroup,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger
} from "@/components/ui/menubar"

export default function MenubarNative() {
	return (
		<header className="flex items-center justify-between border-b py-1 text-white">
			<div className="flex items-center">
				<Menubar>
					<MenubarMenu>
						<MenubarTrigger className="ml-1 py-0.5 text-[15px]">
							<AppleIcon />
						</MenubarTrigger>

						<MenubarContent>
							<MenubarGroup>
								<MenubarItem>
									New Tab{" "}
									<MenubarShortcut>⌘T</MenubarShortcut>
								</MenubarItem>

								<MenubarItem>
									New Window{" "}
									<MenubarShortcut>⌘N</MenubarShortcut>
								</MenubarItem>

								<MenubarItem disabled>
									New Incognito Window
								</MenubarItem>
							</MenubarGroup>
							<MenubarSeparator />
							<MenubarGroup>
								<MenubarSub>
									<MenubarSubTrigger>Share</MenubarSubTrigger>
									<MenubarSubContent>
										<MenubarGroup>
											<MenubarItem>
												Email link
											</MenubarItem>
											<MenubarItem>Messages</MenubarItem>
											<MenubarItem>Notes</MenubarItem>
										</MenubarGroup>
									</MenubarSubContent>
								</MenubarSub>
							</MenubarGroup>
							<MenubarSeparator />
							<MenubarGroup>
								<MenubarItem>
									Print...{" "}
									<MenubarShortcut>⌘P</MenubarShortcut>
								</MenubarItem>
							</MenubarGroup>
						</MenubarContent>
					</MenubarMenu>

					<MenubarMenu>
						<MenubarTrigger>File</MenubarTrigger>

						<MenubarContent>
							<MenubarGroup>
								<MenubarItem>
									New Tab{" "}
									<MenubarShortcut>⌘T</MenubarShortcut>
								</MenubarItem>

								<MenubarItem>
									New Window{" "}
									<MenubarShortcut>⌘N</MenubarShortcut>
								</MenubarItem>

								<MenubarItem disabled>
									New Incognito Window
								</MenubarItem>
							</MenubarGroup>
							<MenubarSeparator />
							<MenubarGroup>
								<MenubarSub>
									<MenubarSubTrigger>Share</MenubarSubTrigger>
									<MenubarSubContent>
										<MenubarGroup>
											<MenubarItem>
												Email link
											</MenubarItem>
											<MenubarItem>Messages</MenubarItem>
											<MenubarItem>Notes</MenubarItem>
										</MenubarGroup>
									</MenubarSubContent>
								</MenubarSub>
							</MenubarGroup>
							<MenubarSeparator />
							<MenubarGroup>
								<MenubarItem>
									Print...{" "}
									<MenubarShortcut>⌘P</MenubarShortcut>
								</MenubarItem>
							</MenubarGroup>
						</MenubarContent>
					</MenubarMenu>

					<MenubarMenu>
						<MenubarTrigger>Edit</MenubarTrigger>
						<MenubarContent>
							<MenubarGroup>
								<MenubarItem>
									Undo <MenubarShortcut>⌘Z</MenubarShortcut>
								</MenubarItem>

								<MenubarItem>
									Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
								</MenubarItem>
							</MenubarGroup>
							<MenubarSeparator />
							<MenubarGroup>
								<MenubarSub>
									<MenubarSubTrigger>Find</MenubarSubTrigger>
									<MenubarSubContent>
										<MenubarGroup>
											<MenubarItem>
												Search the web
											</MenubarItem>
										</MenubarGroup>
										<MenubarSeparator />
										<MenubarGroup>
											<MenubarItem>Find...</MenubarItem>
											<MenubarItem>Find Next</MenubarItem>
											<MenubarItem>
												Find Previous
											</MenubarItem>
										</MenubarGroup>
									</MenubarSubContent>
								</MenubarSub>
							</MenubarGroup>
							<MenubarSeparator />
							<MenubarGroup>
								<MenubarItem>Cut</MenubarItem>

								<MenubarItem>Copy</MenubarItem>

								<MenubarItem>Paste</MenubarItem>
							</MenubarGroup>
						</MenubarContent>
					</MenubarMenu>

					<MenubarMenu>
						<MenubarTrigger>View</MenubarTrigger>
						<MenubarContent className="w-44">
							<MenubarGroup>
								<MenubarCheckboxItem>
									Bookmarks Bar
								</MenubarCheckboxItem>
								<MenubarCheckboxItem checked>
									Full URLs
								</MenubarCheckboxItem>
							</MenubarGroup>
							<MenubarSeparator />
							<MenubarGroup>
								<MenubarItem inset>
									Reload <MenubarShortcut>⌘R</MenubarShortcut>
								</MenubarItem>

								<MenubarItem disabled inset>
									Force Reload{" "}
									<MenubarShortcut>⇧⌘R</MenubarShortcut>
								</MenubarItem>
							</MenubarGroup>
							<MenubarSeparator />
							<MenubarGroup>
								<MenubarItem inset>
									Toggle Fullscreen
								</MenubarItem>
							</MenubarGroup>
							<MenubarSeparator />
							<MenubarGroup>
								<MenubarItem inset>Hide Sidebar</MenubarItem>
							</MenubarGroup>
						</MenubarContent>
					</MenubarMenu>
				</Menubar>
			</div>

			<div></div>
		</header>
	)
}
