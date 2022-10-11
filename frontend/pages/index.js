import React from 'react';
import BaseLayout from '../layouts/base';

import { getSession, useSession } from 'next-auth/react';
import AdminDashboard from '../components/admin/AdminDashboard';
import EmployeeDashboard from '../components/employee/EmployeeDashboard';
import axios from 'axios';

const Home = props => {
	const { data: session } = useSession();
	const [employees, setEmployees] = React.useState();
	const [taskData, setTaskData] = React.useState();

	React.useEffect(() => {
		if (session) {
			try {
				axios
					.get(
						`${process.env.BACKEND_URL}/comp/compemplist/${session.user.company}`
					)
					.then(res => setEmployees(res.data));
			} catch (_) {}
		}
	}, [session]);
	return session?.user.is_admin ? (
		<AdminDashboard employees={employees} />
	) : (
		<EmployeeDashboard />
	);
};

Home.getLayout = page => <BaseLayout>{page}</BaseLayout>;

export default Home;
