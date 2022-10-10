import Router from 'next/router';
import React from 'react';
import EmployeeDashboard from '../../components/employee/EmployeeDashboard';
import BaseLayout from '../../layouts/base';

const Index = () => {
	const { id } = Router.query();

	return <EmployeeDashboard id={id} />;
};

Index.getLayout = page => <BaseLayout>{page}</BaseLayout>;
export default Index;
