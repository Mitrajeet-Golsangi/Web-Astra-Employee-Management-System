import axios from 'axios';
import { useSession } from 'next-auth/react';
import React from 'react';
import { notificationContext } from '../../context/notificationContext';
import BarChart from './BarChart';
import EmployeePieChart from './EmployeePieChart';

const EmployeeDashboard = ({ id }) => {
	const { data: session } = useSession();
	const [barData, setBarData] = React.useState([]);
	const { setMessage } = React.useContext(notificationContext);

	const getBarData = () => {
		const colors = [
			'rgb(201, 68, 44)',
			'rgb(201, 170, 44)',
			'rgb(133, 201, 44)',
			'rgb(44, 201, 149)',
			'rgb(44, 104, 201)',
			'rgb(133, 44, 201)',
			'rgb(201, 44, 183)',
		];

		if (session) {
			axios
				.post(`${process.env.BACKEND_URL}/emp/tasksdata`, {
					id: id ? id : session?.user._id,
				})
				.then(res => {
					res.data.data.forEach((t, i) => {
						let date = new Date();
						date.setDate(date.getDate() - 1);

						setBarData(bd => [
							...bd,
							{
								label: date.toISOString().split('T')[0],
								data: [t.work, t.leisure, t.meeting],
								backgroundColor: colors[i],
							},
						]);
					});
				})
				.catch(err => setMessage(`${err.message} : Error Fetching Data !`));
		}
	};

	return (
		<div className="p-5 grid grid-cols-1 grid-rows-auto lg:grid-cols-2 place-items-center">
			<div className="lg:col-span-2 text-4xl font-light text-primary place-self-start">
				Tasks Done in Last 2 Days
			</div>
			<div className="relative w-1/2 lg:w-2/3 flex flex-col items-center gap-y-10 p-10">
				<EmployeePieChart
					labels={['Break', 'Work', 'Meeting']}
					data={[400, 400, 200]}
				/>
				<div className="text-3xl font-thin text-secondary uppercase">
					Yesterday
				</div>
			</div>
			<div className="relative w-1/2 lg:w-2/3 flex flex-col items-center gap-y-10 p-10">
				<EmployeePieChart
					labels={['Break', 'Work', 'Meeting']}
					data={[200, 400, 400]}
				/>
				<div className="text-3xl font-thin text-secondary uppercase">Today</div>
			</div>
			<button
				className="btn btn-outline btn-secondary"
				onClick={() => getBarData()}
			>
				Get Data
			</button>
			<BarChart
				labels={['Working', 'Not-Working', 'Meeting']}
				data={barData}
			/>
		</div>
	);
};

export default EmployeeDashboard;
