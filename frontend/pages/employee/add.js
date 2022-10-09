import React from 'react';
import BaseLayout from '../../layouts/base';

import TagsInput from '../../components/partials/Form Components/TagsInput';
import { isEmail } from '../../utils/helpers';
import { MdAdd } from 'react-icons/md';

const AddEmployee = () => {
	const [emails, setEmails] = React.useState([]);

	const submitHandler = () => {};

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
