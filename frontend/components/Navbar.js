import React from 'react';
import { GiSettingsKnobs, GiHamburgerMenu } from 'react-icons/gi';
import { ImProfile } from 'react-icons/im';
import { MdOutlineLogout } from 'react-icons/md';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { logout } from '../utils/authentication';

const Navbar = () => {
	const { data: session } = useSession();

	return (
		<div className="px-5 p-3 flex w-full bg-blue-100 justify-between items-center">
			{/* Control Button for Sidebar drawer */}
			<label
				htmlFor="drawer"
				className="link navbar-link p-5 drawer-button"
			>
				<GiHamburgerMenu size={25} />
			</label>

			<div className="flex items-center">
				<div className="flex justify-end avatar mr-4">
					<div className="w-1/3 rounded-full">
						<img src="https://placeimg.com/192/192/people" />
					</div>
				</div>
				<div className="dropdown dropdown-left">
					<label
						tabIndex={0}
						className="flex items-center gap-2 text-secondary m-1"
					>
						{session?.user.fname} {session?.user.lname}{' '}
						<GiSettingsKnobs className="text-black" />
					</label>
					<ul
						tabIndex={0}
						className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
					>
						<li>
							<span className="flex items-center gap-4">
								<Link href="/profile">
									<>
										<ImProfile /> Profile
									</>
								</Link>
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
			</div>
		</div>
	);
};

export default Navbar;
