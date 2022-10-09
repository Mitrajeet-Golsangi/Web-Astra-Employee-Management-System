import React from 'react';
import { useSelector } from 'react-redux';
import BaseLayout from '../layouts/base';
import { isEmpty } from '../utils/helpers';

import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import AdminDashboard from '../components/admin/AdminDashboard';

const Home = () => {
	const { data: session } = useSession();

	return session?.user.is_admin ? <AdminDashboard /> : <div>Index</div>;
};

Home.getLayout = page => <BaseLayout>{page}</BaseLayout>;

export default Home;
