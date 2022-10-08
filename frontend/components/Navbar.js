import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
	return (
		<div className="px-5 p-3 flex w-full bg-blue-100 justify-between items-center">
			{/* Control Button for Sidebar drawer */}
			<label htmlFor="drawer" className="link navbar-link p-5 drawer-button">
				<GiHamburgerMenu size={25} />
			</label>

			<div className="flex">
				<div className="avatar">
					<div className="w-1/3 rounded-full">
						<img src="https://placeimg.com/192/192/people" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
