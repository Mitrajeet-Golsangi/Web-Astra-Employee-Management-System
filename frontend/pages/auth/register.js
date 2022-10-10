import { useRouter } from 'next/router';
import React from 'react';

import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { BsArrowLeft, BsBuilding } from 'react-icons/bs';
import CompanyRegistration from '../../components/auth/CompanyRegistration';
import EmployeeRegistration from '../../components/auth/EmployeeRegistration';

const Ask = ({ setUser }) => {
	return (
		<div className="p-4 mt-5 grid grid-cols-2 gap-4 place-items-center">
			<AiOutlineUsergroupAdd className="text-5xl" />
			<BsBuilding className="text-5xl" />
			<button
				className="btn btn-primary"
				onClick={() => setUser('Employee')}
			>
				Employee
			</button>
			<button
				className="btn btn-secondary"
				onClick={() => setUser('Company')}
			>
				Company
			</button>
		</div>
	);
};

const Register = () => {
	const [userType, setUserType] = React.useState(null);
	const router = useRouter();

	return (
		<div className="h-screen flex flex-col items-center justify-start pt-10 bg-employeeRegistration bg-cover bg-no-repeat">
			<div className="flex items-center justify-between text-4xl font-thin mb-4">
				<BsArrowLeft
					onClick={() => (userType == null ? router.back() : setUserType(null))}
					className="text-secondary mr-5 cursor-pointer"
				/>{' '}
				Register yourself as: {userType}
			</div>
			{userType == 'Company' ? (
				<CompanyRegistration />
			) : userType == 'Employee' ? (
				<EmployeeRegistration />
			) : (
				<Ask setUser={setUserType} />
			)}
		</div>
	);
};

export default Register;
