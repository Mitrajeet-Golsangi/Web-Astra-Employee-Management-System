import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import EmployeeDashboard from '../../components/employee/EmployeeDashboard';
import BaseLayout from '../../layouts/base';

const Index = props => {
	return (
		<EmployeeDashboard
			barData={props.barData}
			pieData={props.pieData}
		/>
	);
};

export const getServerSideProps = async context => {
	const session = await getSession(context);
	const { id } = context.query;

	let barData = [];
	let pieData = [];

	try {
		const res = await fetch(`${process.env.BACKEND_URL}/emp/tasksdata`, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: id,
			}),
		});

		const data = await res.json();
		console.log(data);
		const colors = [
			'rgb(201, 68, 44)',
			'rgb(201, 170, 44)',
			'rgb(133, 201, 44)',
			'rgb(44, 201, 149)',
			'rgb(44, 104, 201)',
			'rgb(133, 44, 201)',
			'rgb(201, 44, 183)',
		];

		let date = new Date();
		date.setDate(date.getDate() + 1);

		data.data.forEach((t, i) => {
			date.setDate(date.getDate() - 1);

			barData.push({
				label: date.toISOString().split('T')[0],
				data: [t.work, t.break, t.meeting],
				backgroundColor: colors[i],
			});

			pieData.push([t.break, t.work, t.meeting]);
		});
	} catch (err) {
		console.log('--------------------------------------\n', err);
	}

	return { props: { barData: barData, pieData: pieData } };
};

Index.getLayout = page => <BaseLayout>{page}</BaseLayout>;

export default Index;
