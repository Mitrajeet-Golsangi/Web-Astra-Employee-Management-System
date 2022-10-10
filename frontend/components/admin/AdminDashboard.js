import React from 'react';

const AdminDashboard = props => {
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
						<th>Meeting</th>
						<th>Break</th>
						<th>Work</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{props.employees?.map(emp => (
						<tr
							key={emp._id}
							id={emp._id}
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
									{emp.image ? (
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
													{emp.fname[0].toUpperCase()}
												</span>
											</div>
										</div>
									)}
									<div>
										<div className="font-bold">
											{emp.fname} {emp.lname}
										</div>
										<div className="text-sm opacity-50">{emp.email}</div>
									</div>
								</div>
							</td>
							<td>
								Zemlak, Daniel and Leannon
								<br />
								<span className="badge badge-ghost badge-sm">
									Desktop Support Technician
								</span>
							</td>
							<td>Purple</td>
							<th>
								<button className="btn btn-ghost btn-xs">details</button>
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
