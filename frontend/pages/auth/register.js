import React from 'react';

import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { BsBuilding } from 'react-icons/bs';
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

	return (
		<div className="flex flex-col items-center justify-center mt-20">
			<div className="text-4xl font-thin mb-4">
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
