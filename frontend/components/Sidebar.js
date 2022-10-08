import React from "react";

const Sidebar = (props) => {
	return (
		<div className="drawer">
			<input id="drawer" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content">{props.children}</div>
			<div className="drawer-side">
				<label htmlFor="drawer" className="drawer-overlay"></label>
				<ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
					<li>
						<a>Sidebar Item 1</a>
					</li>
					<li>
						<a>Sidebar Item 2</a>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Sidebar;
