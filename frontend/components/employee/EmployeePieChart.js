import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.defaults.font = {
	family: 'Segoe UI',
};
 
ChartJS.register(ArcElement, Tooltip, Legend);

const EmployeePieChart = props => {
	const data = {
		labels: props.labels,
		datasets: [
			{
				label: 'Today',
				data: props.data,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
				],
				borderWidth: 1,
				offset: 15,
				borderRadius: 5,
				cutout: '70%',
			},
		],
	};
	return <Doughnut data={data} />;
};

export default EmployeePieChart;
