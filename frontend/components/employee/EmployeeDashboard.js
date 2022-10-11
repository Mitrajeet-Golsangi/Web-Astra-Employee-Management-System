import axios from 'axios';
import { useSession } from 'next-auth/react';
import React from 'react';
import BarChart from './BarChart';
import PieChart from './Piechart';

const getBarData = () => {
	let barChartData = [];
	let date = new Date();

	for (let i = 0; i < 7; i++) {
		var dateOffset = 24 * 60 * 60 * 1000 * i;
		date.setTime(date.getTime() - dateOffset);
		console.log(date.toISOString());
	}
};

const EmployeeDashboard = ({ id }) => {
	const { data: session } = useSession();
	const [work, setWork] = React.useState([]);
	const [meeting, setMeeting] = React.useState([]);
	const [leisure, setLeisure] = React.useState([]);
	const [barData, setBarData] = React.useState([]);

	React.useEffect(() => {
		if (session) {
			console.log(id ? id : session.user._id);
			try {
				axios
					.post(`${process.env.BACKEND_URL}/emp/tasksdata`, {
						id: id ? id : session.user._id,
					})
					.then(res => {
						console.log(res.data);
						res.data.forEach(t => {
							setWork([...work, t.work]);
							setLeisure([...leisure, t.break]);
							setMeeting([...meeting, t.meeting]);
							setBarData(getBarData());
						});
						console.log(work);
					});
			} catch (_) {}
		}
	}, [session]);

	return (
		<div className="p-5 grid grid-cols-1 grid-rows-auto lg:grid-cols-2 place-items-center">
			<div className="lg:col-span-2 text-4xl font-light text-primary place-self-start">
				Tasks Done in Last 2 Days
			</div>
			<div className="relative w-1/2 lg:w-2/3 flex flex-col items-center gap-y-10 p-10">
				<PieChart
					labels={['Break', 'Work', 'Meeting']}
					data={[400, 400, 200]}
				/>
				<div className="text-3xl font-thin text-secondary uppercase">
					Yesterday
				</div>
			</div>
			<div className="relative w-1/2 lg:w-2/3 flex flex-col items-center gap-y-10 p-10">
				<PieChart
					labels={['Break', 'Work', 'Meeting']}
					data={[200, 400, 400]}
				/>
				<div className="text-3xl font-thin text-secondary uppercase">Today</div>
			</div>
			<BarChart
				labels={['Working', 'Not-Working', 'Meeting']}
				data={barData}
			/>
		</div>
	);
};

export default EmployeeDashboard;
