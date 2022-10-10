import React from 'react';
import BaseLayout from '../../layouts/base';

import TagsInput from '../../components/partials/Form Components/TagsInput';
import { isEmail } from '../../utils/helpers';
import { MdAdd } from 'react-icons/md';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { notificationContext } from '../../context/notificationContext';

const AddEmployee = () => {
	const [emails, setEmails] = React.useState([]);
	const { data: session } = useSession();
	const { setMessage } = React.useContext(notificationContext);

	const submitHandler = () => {
		axios
			.post(`${process.env.BACKEND_URL}/comp/emplist`, {
				elist: emails,
				admin_email: session?.user.email,
			})
			.then(res => {
				setMessage('Employees Added Successfully !');
				setEmails([]);
			})
			.catch(err => setMessage(err.message));
	};

	return (
		<div className="p-5 flex flex-col items-center justify-center w-full">
			<TagsInput
				tags={emails}
				setTags={setEmails}
				type="email"
				name="Employee Emails"
				validator={e => isEmail(e.target.value)}
			/>
			<button
				className="btn rounded-full btn-secondary flex items-center text-md gap-3 mt-4"
				onClick={submitHandler}
			>
				<MdAdd className="text-2xl" /> Add Employees
			</button>
		</div>
	);
};

AddEmployee.getLayout = page => <BaseLayout>{page}</BaseLayout>;
export default AddEmployee;
