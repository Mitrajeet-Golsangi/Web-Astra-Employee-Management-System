import React from 'react';
import CustomInput from '../partials/Form Components/CustomInput';

import { FaAddressCard } from 'react-icons/fa';
import {
	MdEmail,
	MdLocalPhone,
	MdOutlineDriveFileRenameOutline,
	MdOutlinePassword,
} from 'react-icons/md';
import { SiLastdotfm } from 'react-icons/si';
import TagsInput from '../partials/Form Components/TagsInput';
import { notificationContext } from '../../context/notificationContext';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { login } from '../../utils/authentication';

const CompanyRegistration = () => {
	const { setMessage } = React.useContext(notificationContext);

	const [userInfo, setUserInfo] = React.useState({
		fname: null,
		lname: null,
		email: null,
		password: null,
		contact: null,
		is_admin: true,
		email_verified: false,
	});
	const [companyInfo, setCompanyInfo] = React.useState({
		name: null,
		address: null,
	});
	const [departments, setDepartments] = React.useState([
		'Accounts',
		'HR',
		'IT',
	]);

	const submitHandler = async e => {
		e.preventDefault();

		axios
			.post(`${process.env.BACKEND_URL}/user/signup`, userInfo)
			.then(res => {
				const user = res.data.user;
				console.log(res.data);
				axios
					.post(`${process.env.BACKEND_URL}/comp/signup`, {
						name: companyInfo.name,
						address: companyInfo.address,
						departments: departments,
						poc: user._id,
					})
					.then(_ => {
						login(user.email, user.password, setMessage);
					})
					.catch(err => {
						try {
							setMessage(err.response.data.message);
						} catch (_) {
							console.log(err);
							setMessage(err.message);
						}
					});
			})
			.catch(err => {
				try {
					setMessage(err.response.data.message);
				} catch (_) {
					setMessage(err.message);
				}
			});
	};

	return (
		<div className="card w-1/2 shadow-xl p-5 glass">
			<div className="card-title grid grid-cols-2 place-items-center font-light text-secondary">
				<div className="text-2xl">Admin Information</div>
				<div className="text-2xl">Company Information</div>
			</div>
			<form className="grid grid-cols-2 gap-x-4">
				<div className="border-r border-secondary pr-4">
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
				</div>
				<div>
					<CustomInput
						bg="white"
						name="name"
						type="text"
						placeholder="Company Name"
						label="Company Name"
						value={companyInfo.name}
						onChange={({ target }) =>
							setCompanyInfo({ ...companyInfo, name: target.value })
						}
						icon={<MdOutlineDriveFileRenameOutline />}
					/>
					<div className="w-full">
						<label
							htmlFor="address-input"
							className="label"
						>
							Company Address
						</label>
						<div className="flex items-center p-2">
							<FaAddressCard />
							<textarea
								className="border rounded-md w-full p-1 px-3 ml-3 text-gray-500 outline-none bg-white"
								value={companyInfo.address}
								onChange={({ target }) =>
									setCompanyInfo({ ...companyInfo, address: target.value })
								}
							></textarea>
						</div>
					</div>
					<TagsInput
						tags={departments}
						setTags={setDepartments}
						name="Departments"
					/>
				</div>
			</form>
			<button
				className="btn btn-secondary mt-5 rounded-full w-1/3 self-center"
				onClick={submitHandler}
			>
				Register
			</button>
		</div>
	);
};

export default CompanyRegistration;
