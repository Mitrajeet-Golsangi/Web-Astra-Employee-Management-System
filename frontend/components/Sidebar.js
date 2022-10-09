import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

import { MdOutlineDashboard } from 'react-icons/md';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { GrChapterAdd } from 'react-icons/gr';

const Sidebar = props => {
	const { data: session } = useSession();

	return (
		<div className="drawer drawer-end drawer-mobile">
			<input
				id="drawer"
				type="checkbox"
				className="drawer-toggle"
			/>
			<div className="drawer-content">{props.children}</div>
			<div className="drawer-side">
				<label
					htmlFor="drawer"
					className="drawer-overlay"
				></label>
				<ul className="menu p-4 overflow-y-auto w-80 border-t border-secondary text-base-content bg-blue-100">
					{session?.user.is_admin ? (
						<>
							<li>
								<span className="flex items-center">
									<MdOutlineDashboard />
									<Link href="/">Dashboard</Link>
								</span>
							</li>
							<li>
								<span className="flex items-center">
									<AiOutlineUserAdd />
									<Link href="/">Add Employee</Link>
								</span>
							</li>
						</>
					) : (
						<>
							<li>
								<span className="flex items-center">
									<MdOutlineDashboard />
									<Link href="/">Dashboard</Link>
								</span>
							</li>
							<li>
								<span className="flex items-center">
									<GrChapterAdd />
									<Link href="/">Add Tasks</Link>
								</span>
							</li>
						</>
					)}
				</ul>
			</div>
		</div>
	);
};

export default Sidebar;
