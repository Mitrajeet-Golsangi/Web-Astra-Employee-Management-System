import axios from 'axios';
import { useSession } from 'next-auth/react';
import React from 'react';
import { GiCloakDagger } from 'react-icons/gi';
import { notificationContext } from '../../context/notificationContext';
import BarChart from './BarChart';
import EmployeePieChart from './EmployeePieChart';

const EmployeeDashboard = props => {
	console.log(props);
	return (
		<div className="p-5 grid grid-cols-1 grid-rows-auto lg:grid-cols-2 place-items-center">
			<div className="lg:col-span-2 text-4xl font-light text-primary place-self-start">
				Tasks Done in Last 2 Days
			</div>
			<div className="relative w-1/2 lg:w-2/3 flex flex-col items-center gap-y-10 p-10">
				<EmployeePieChart
					labels={['Break', 'Work', 'Meeting']}
					data={props.pieData[1]}
				/>
				<div className="text-3xl font-thin text-secondary uppercase">
					Yesterday
				</div>
			</div>
			<div className="relative w-1/2 lg:w-2/3 flex flex-col items-center gap-y-10 p-10">
				<EmployeePieChart
					labels={['Break', 'Work', 'Meeting']}
					data={props.pieData[0]}
				/>
				<div className="text-3xl font-thin text-secondary uppercase">Today</div>
			</div>

			<BarChart
				labels={['Working', 'Not-Working', 'Meeting']}
				data={props.barData}
			/>
		</div>
	);
};

export default EmployeeDashboard;
