import React from 'react';
import BaseLayout from '../layouts/base';

import { getSession, useSession } from 'next-auth/react';
import AdminDashboard from '../components/admin/AdminDashboard';
import EmployeeDashboard from '../components/employee/EmployeeDashboard';

const Home = props => {
	const { data: session } = useSession();

	return session?.user.is_admin ? (
		<AdminDashboard employees={props.employees} />
	) : (
		<EmployeeDashboard
			barData={props.barData}
			pieData={props.pieData}
		/>
	);
};

Home.getLayout = page => <BaseLayout>{page}</BaseLayout>;

export const getServerSideProps = async context => {
	const session = await getSession(context);
	if (session.user.is_admin === false) {
		const emp = await fetch(
			`${process.env.BACKEND_URL}/emp/${session?.user._id}`
		);
		const emp_data = await emp.json();
		if (emp_data !== null) {
			if (emp_data?.disabled)
				return {
					redirect: {
						permanent: false,
						destination: '/auth/login?message=Access%20Denied%20!',
					},
					props: {},
				};
		} else
			return {
				redirect: {
					permanent: false,
					destination:
						'/auth/login?message=You%20are%20not%20an%20employee%20!',
				},
				props: {},
			};
	}
	let barData = [];
	let pieData = [];
	let employees = [];

	if (session?.user.is_admin) {
		try {
			const res = await fetch(
				`${process.env.BACKEND_URL}/comp/compemplist/${session.user.company._id}`
			);
			const data = await res.json();

			employees = data;
		} catch (err) {
			console.log('--------------------------------------\n', err);
		}
	} else {
		try {
			const res = await fetch(`${process.env.BACKEND_URL}/emp/tasksdata`, {
				method: 'post',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id: session?.user._id,
				}),
			});

			const data = await res.json();

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
	}

	return {
		props: { barData: barData, pieData: pieData, employees: employees },
	};
};

export default Home;
