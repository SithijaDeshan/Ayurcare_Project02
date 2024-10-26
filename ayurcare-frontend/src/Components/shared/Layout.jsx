import React from 'react'
import { Outlet } from 'react-router-dom'
import SidebarInventory from './SidebarInventory'

export default function Layout() {
	return (
		<div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
			<SidebarInventory />
			<div className="flex flex-col flex-1">

				<div className="flex-1 p-4 min-h-0 overflow-auto">
					<Outlet />
				</div>
			</div>
		</div>
	)
}
