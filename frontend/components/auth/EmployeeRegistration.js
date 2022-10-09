import React from 'react';
import CustomInput from '../partials/Form Components/CustomInput';

import {
	MdEmail,
	MdLocalPhone,
	MdOutlineDriveFileRenameOutline,
	MdOutlinePassword,
} from 'react-icons/md';
import { SiLastdotfm } from 'react-icons/si';

import axios from 'axios';
import { notificationContext } from '../../context/notificationContext';
import { login } from '../../utils/authentication';

const EmployeeRegistration = () => {
	const { setMessage } = React.useContext(notificationContext);
	const [loading, setLoading] = React.useState(false);

	const [userInfo, setUserInfo] = React.useState({
		fname: null,
		lname: null,
		email: null,
		password: null,
		contact: null,
		is_admin: false,
		email_verified: false,
	});

	const submitHandler = e => {
		setLoading(true);
		e.preventDefault();
		axios
			.post(`${process.env.BACKEND_URL}/user/signup`, userInfo)
			.then(res =>
				login(res.data.user.email, res.data.user.password, setMessage)
			)
			.catch(err =>
				setMessage(err.response.data.message || 'Something went wrong !')
			)
			.finally(setLoading(false));
	};

	return (
		<form className="card w-1/2 shadow-xl p-5 glass">
			<CustomInput
				bg="white"
				name="fname"
				type="text"
				placeholder="First Name"
				label="First Name"
				value={userInfo.fname}
				onChange={({ target }) =>
					setUserInfo({ ...userInfo, fname: target.value })
				}
				icon={<MdOutlineDriveFileRenameOutline />}
			/>
			<CustomInput
				bg="white"
				name="lname"
				type="text"
				placeholder="Last Name"
				label="Last Name"
				value={userInfo.lname}
				onChange={({ target }) =>
					setUserInfo({ ...userInfo, lname: target.value })
				}
				icon={<SiLastdotfm />}
			/>
			<CustomInput
				bg="white"
				name="email"
				type="email"
				placeholder="Email"
				label="Email"
				value={userInfo.email}
				onChange={({ target }) =>
					setUserInfo({ ...userInfo, email: target.value })
				}
				icon={<MdEmail />}
			/>
			<CustomInput
				bg="white"
				name="password"
				type="password"
				placeholder="Password"
				label="Password"
				value={userInfo.password}
				onChange={({ target }) =>
					setUserInfo({ ...userInfo, password: target.value })
				}
				icon={<MdOutlinePassword />}
			/>
			<CustomInput
				bg="white"
				name="contact"
				type="number"
				maxLength="10"
				placeholder="Contact"
				label="Contact"
				value={userInfo.contact}
				onChange={({ target }) =>
					setUserInfo({ ...userInfo, contact: target.value })
				}
				icon={<MdLocalPhone />}
			/>
			<button
				className={`btn btn-secondary ${
					loading ? 'btn-disabled loading' : null
				} mt-5 rounded-full w-1/3 self-center`}
				onClick={submitHandler}
			>
				Register
			</button>
		</form>
	);
};

export default EmployeeRegistration;
