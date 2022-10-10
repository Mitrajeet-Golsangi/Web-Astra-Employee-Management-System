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
		<EmployeeDashboard />
	);
};

Home.getLayout = page => <BaseLayout>{page}</BaseLayout>;

export const getServerSideProps = async () => {
	const session = await getSession();
	if (session?.user.is_admin) {
		const res = await fetch(`${process.env.BACKEND_URL}/user`);
		const data = await res.json();

		return {
			props: {
				employees: data,
			},
		};
	} else {
		return {
			props: {},
		};
	}
};

export default Home;
