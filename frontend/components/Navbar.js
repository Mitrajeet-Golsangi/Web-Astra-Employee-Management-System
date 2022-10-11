import React from 'react';
import { GiHamburgerMenu, GiSettingsKnobs } from 'react-icons/gi';
import { ImProfile } from 'react-icons/im';
import { MdOutlineLogout } from 'react-icons/md';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { logout } from '../utils/authentication';

import Image from 'next/image';
import logo from '../assets/logo.gif';

const Navbar = () => {
	const { data: session } = useSession();
	const router = useRouter();

	return (
		<div className="px-5 p-3 flex w-full bg-blue-100 justify-between items-center">
			<div className="relative flex items-center gap-2">
				<Image
					src={logo}
					width={80}
					height={50}
				/>
				<a className="text-xl">Web Astra Developers</a>
			</div>
			<div className="flex items-center">
				{session?.user.image ? (
					<div className="flex justify-end avatar mr-4">
						<div className="w-16 rounded-full">
							<img src={session?.user.image} />
						</div>
					</div>
				) : (
					<div className="flex justify-end avatar placeholder mr-4">
						<div className="bg-secondary-focus text-base-100 rounded-full w-16">
							<span className="text-xl">
								{session?.user.fname[0].toUpperCase()}
							</span>
						</div>
					</div>
				)}
				<div className="dropdown dropdown-left">
					<label
						tabIndex={0}
						className="flex items-center gap-2 text-secondary m-1 cursor-pointer"
					>
						{session?.user.fname} {session?.user.lname}{' '}
						<GiSettingsKnobs className="text-black" />
					</label>
					<ul
						tabIndex={0}
						className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
					>
						<li>
							<span
								className="flex items-center gap-4"
								onClick={() => router.push(`/profile/${session?.user._id}`)}
							>
								<ImProfile /> Profile
							</span>
						</li>
						<li>
							<span
								className="flex items-center gap-4 cursor-pointer"
								onClick={() => logout()}
							>
								<MdOutlineLogout /> Logout
							</span>
						</li>
					</ul>
				</div>
				<label
					htmlFor="drawer"
					className="block lg:hidden cursor-pointer"
				>
					<GiHamburgerMenu
						size={30}
						className="mx-4"
					/>
				</label>
			</div>
		</div>
	);
};

export default Navbar;
