import { useRouter } from 'next/router';
import React from 'react';
import EmployeeDashboard from '../../components/employee/EmployeeDashboard';
import BaseLayout from '../../layouts/base';

const Index = () => {
	const router = useRouter();
	const { id } = router.query;

	return <EmployeeDashboard id={id} />;
};

Index.getLayout = page => <BaseLayout>{page}</BaseLayout>;
export default Index;
