import React from 'react';
import BaseLayout from '../layouts/base';

import { getSession, useSession } from 'next-auth/react';
import AdminDashboard from '../components/admin/AdminDashboard';
import EmployeeDashboard from '../components/employee/EmployeeDashboard';
import axios from 'axios';

const Home = props => {
	const { data: session } = useSession();
	const [employees, setEmployees] = React.useState();

	React.useEffect(() => {
		if (session) {
			session?.user.is_admin
				? axios
						.get(
							`${process.env.BACKEND_URL}/comp/compemplist/${session.user.company}`
						)
						.then(res => setEmployees(res.data))
						.catch(err => console.log(err))
				: null;
		}
	}, [session]);
	return session?.user.is_admin ? (
		<AdminDashboard employees={employees} />
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
	let barData = [];
	let pieData = [];

	if (!session.user.is_admin) {
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

	return { props: { barData: barData, pieData: pieData } };
};

export default Home;
