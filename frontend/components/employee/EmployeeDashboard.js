import React from 'react';
import PieChart from './Piechart';
import BarChart from './BarChart';

const EmployeeDashboard = () => {
	const barChartData = [
		{
			label: new Date().toISOString(),
			data: [200, 400, 500],
			backgroundColor: 'rgb(255, 99, 132)',
		},
		{
			label: 'Dataset 2',
			data: [200, 400, 500],
			backgroundColor: 'rgb(75, 192, 192)',
		},
		{
			label: 'Dataset 3',
			data: [200, 400, 500],
			backgroundColor: 'rgb(53, 162, 235)',
		},
	];

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
				data={barChartData}
			/>
		</div>
	);
};

export default EmployeeDashboard;
