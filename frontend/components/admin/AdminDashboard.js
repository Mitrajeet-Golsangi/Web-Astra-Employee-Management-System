import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { notificationContext } from '../../context/notificationContext';

const AdminDashboard = props => {
	const { setMessage } = React.useContext(notificationContext);
	const router = useRouter();

	const disableUser = id => {
		console.log(id);
		axios
			.put(`${process.env.BACKEND_URL}/emp/${id}`, { disabled: true })
			.then(res => setMessage('User Disabled Successfully !'))
			.catch(err => setMessage(err.message));
	};
	return (
		<div className="overflow-x-auto w-full p-5">
			<table className="table table-compact w-full">
				{/* <!-- head --> */}
				<thead>
					<tr>
						<th>
							<label>
								<input
									type="checkbox"
									className="checkbox"
								/>
							</label>
						</th>
						<th>Name</th>
						<th>Email</th>
						<th>Disable</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{props.employees?.map(emp => (
						<tr
							key={emp.user._id}
							id={emp.user._id}
						>
							<th>
								<label>
									<input
										type="checkbox"
										className="checkbox"
									/>
								</label>
							</th>
							<td>
								<div className="flex items-center space-x-3">
									{emp.user.image ? (
										<div className="avatar">
											<div className="mask mask-squircle w-12 h-12">
												<img
													src="/tailwind-css-component-profile-2@56w.png"
													alt="Avatar Tailwind CSS Component"
												/>
											</div>
										</div>
									) : (
										<div className="flex justify-end avatar placeholder mr-4">
											<div className="mask mask-squircle w-12 h-12 bg-secondary-focus text-base-100 w-16">
												<span className="text-xl">
													{emp.user.fname[0].toUpperCase()}
												</span>
											</div>
										</div>
									)}
									<div>
										<div className="font-bold">
											{emp.user.fname} {emp.user.lname}
										</div>
									</div>
								</div>
							</td>
							<td>{emp.user.email}</td>
							<td>
								<button
									className="btn btn-ghost btn-xs"
									onClick={() => disableUser(emp.user._id)}
								>
									Disabled
								</button>
							</td>
							<th>
								<button
									className="btn btn-ghost btn-xs"
									onClick={() => router.push(`employee/${emp.user._id}`)}
								>
									details
								</button>
							</th>
						</tr>
					))}
				</tbody>
				{/* <!-- foot --> */}
				<tfoot>
					<tr>
						<th></th>
						<th>Name</th>
						<th>Job</th>
						<th>Favorite Color</th>
						<th></th>
					</tr>
				</tfoot>
			</table>
		</div>
	);
};

export default AdminDashboard;
