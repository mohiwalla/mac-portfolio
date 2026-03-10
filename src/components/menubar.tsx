import { Icons } from "@/lib/icons"
import {
	Menubar as MenubarPrimitive,
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
	MenubarTrigger,
} from "@/components/ui/menubar"
import { useApplicationStore } from "@/stores/application"

export default function Menubar() {
	const { activeApplication } = useApplicationStore()

	return (
		<header className="flex h-9 items-center justify-between py-0.75 text-white">
			<div className="flex items-center">
				<MenubarPrimitive>
					<MenubarMenu>
						<MenubarTrigger className="ml-1 px-3 py-0.5 text-xl">
							{Icons.Apple}
						</MenubarTrigger>

						<MenubarContent>
							<MenubarGroup>
								<MenubarItem>About This Mac</MenubarItem>
							</MenubarGroup>

							<MenubarSeparator />

							<MenubarGroup>
								<MenubarItem>System Settings...</MenubarItem>
								<MenubarItem>App Store</MenubarItem>
							</MenubarGroup>

							<MenubarSeparator />

							<MenubarGroup>
								<MenubarSub>
									<MenubarSubTrigger>
										Recent Items
									</MenubarSubTrigger>

									<MenubarSubContent>
										<MenubarGroup>
											<MenubarItem>Safari</MenubarItem>
											<MenubarItem>Chrome</MenubarItem>
											<MenubarItem>Firefox</MenubarItem>
										</MenubarGroup>
									</MenubarSubContent>
								</MenubarSub>
							</MenubarGroup>

							<MenubarSeparator />

							<MenubarGroup>
								<MenubarItem>
									Force Quit
									<MenubarShortcut>
										{Icons.Option}
										{Icons.Command}Q
									</MenubarShortcut>
								</MenubarItem>
							</MenubarGroup>

							<MenubarSeparator />

							<MenubarGroup>
								<MenubarItem>Sleep</MenubarItem>
								<MenubarItem>Restart...</MenubarItem>
								<MenubarItem>Shut Down...</MenubarItem>
							</MenubarGroup>

							<MenubarSeparator />

							<MenubarGroup>
								<MenubarItem>
									Lock Screen
									<MenubarShortcut>
										{Icons.Control}
										{Icons.Command}Q
									</MenubarShortcut>
								</MenubarItem>

								<MenubarItem>
									Log Out mohiwalla...
									<MenubarShortcut>
										{Icons.Shift}
										{Icons.Command}Q
									</MenubarShortcut>
								</MenubarItem>
							</MenubarGroup>
						</MenubarContent>
					</MenubarMenu>

					<MenubarMenu>
						<MenubarTrigger className="text-sm font-bold">
							{activeApplication.shortName ||
								activeApplication.name}
						</MenubarTrigger>

						<MenubarContent>
							<MenubarGroup>
								<MenubarItem>
									About {activeApplication.name}
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
						<MenubarContent>
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
				</MenubarPrimitive>
			</div>

			<div></div>
		</header>
	)
}
