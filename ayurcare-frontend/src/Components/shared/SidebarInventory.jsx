import React from 'react';
import classNames from 'classnames';
import { Link, useLocation, useNavigate } from 'react-router-dom';  // Import useNavigate
import Image from '../../Assets/logo.png';
import {logout} from "../api/AyurcareApiService"

import {
	HiOutlineViewGrid,
	HiOutlineCube,
	HiOutlineDocumentText,
	HiOutlineAnnotation,
} from 'react-icons/hi';

const linkClass =
	'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base';

const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/inventory',  // Updated to include inventory
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'products',
		label: 'Products',
		path: '/inventory/products',  // Updated to include inventory
		icon: <HiOutlineCube />
	},
	{
		key: 'transactions',
		label: 'New Product',
		path: '/inventory/newProduct',  // Updated to include inventory
		icon: <HiOutlineDocumentText />
	},
];

export default function SidebarInventory() {
	const navigate = useNavigate();  // Initialize useNavigate

	const handleLogout = () => {
		// Your logout logic
		logout(); // Ensure this function is defined
		localStorage.removeItem('username');
		localStorage.removeItem('patientId');
		localStorage.removeItem('userid');
		localStorage.removeItem('role');
		navigate('/login'); // Redirect to login page after logout
	};

	return (
		<div className="bg-teal-950 w-60 p-3 flex flex-col">
			<div className="flex items-center gap-2 px-1 py-3">
				<img src={Image} alt="imgLogo" />
			</div>
			<div className="py-8 flex flex-1 flex-col gap-0.5">
				{DASHBOARD_SIDEBAR_LINKS.map((link) => (
					<SidebarLink key={link.key} link={link} />
				))}
				{/* Logout Button */}
				<button
					onClick={handleLogout}
					className={classNames('flex items-center gap-2 font-light px-3 py-2 hover:bg-red-700 hover:no-underline active:bg-red-600 rounded-sm text-base text-red-400')}
				>
					<span className="text-xl"><HiOutlineAnnotation /></span> {/* Optional: Add an icon for the logout button */}
					Logout
				</button>
			</div>
		</div>
	);
}

function SidebarLink({ link }) {
	const { pathname } = useLocation();

	return (
		<Link
			to={link.path}
			className={classNames(pathname === link.path ? 'bg-neutral-700 text-white' : 'text-neutral-400', linkClass)}
		>
			<span className="text-xl">{link.icon}</span>
			{link.label}
		</Link>
	);
}
