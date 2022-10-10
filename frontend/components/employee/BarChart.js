import React from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export const options = {
	plugins: {
		title: {
			display: true,
			text: 'Chart.js Bar Chart - Stacked',
		},
	},
	responsive: true,
	scales: {
		x: {
			stacked: true,
		},
		y: {
			stacked: true,
		},
	},
};

const BarChart = props => {
	const labels = props.labels;
	const data = {
		labels,
		datasets: props.data,
	};
	return (
		<div className="p-5 relative lg:col-span-2 w-full">
			<Bar
				options={options}
				data={data}
			/>
		</div>
	);
};

export default BarChart;
