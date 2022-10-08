import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import CustomInput from '../../components/partials/Form Components/CustomInput';

import BG from '../../assets/loginbg.jpg';
import { HiOutlineMail } from 'react-icons/hi';
import { MdOutlinePassword } from 'react-icons/md';

import axios from 'axios';

const Login = () => {
	const [userInfo, setUserInfo] = React.useState({ email: '', password: '' });
	const [loading, setLoading] = React.useState(false);

	const submitHandler = e => {
		e.preventDefault();
		setLoading(true);
		console.log(process.env.BACKEND_URL);
		axios
			.post(`${process.env.BACKEND_URL}/user/login`, userInfo)
			.then(res => console.log(res.data))
			.catch(err => console.log(err))
			.finally(setLoading(false));
	};

	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-auto">
				<div className="h-screen sm:hidden hidden lg:block md:hidden relative">
					<Image
						src={BG}
						alt="Image"
						objectFit="fill"
						layout="fill"
						objectPosition="left"
					/>
				</div>

				<div className="flex-col p-10 w-full md:w-1/2 justify-self-center	">
					<h1 className="text-2xl text-center mb-16">
						Enter your Login Credentials
					</h1>
					<div className="mt-6">
						<form>
							<CustomInput
								name="email"
								type="text"
								placeholder="example@gmail.com"
								label="Email"
								value={userInfo.email}
								onChange={({ target }) =>
									setUserInfo({ ...userInfo, email: target.value })
								}
								icon={<HiOutlineMail />}
							/>
							<CustomInput
								name="password"
								type="password"
								placeholder="Your Password"
								label="Password"
								value={userInfo.password}
								onChange={({ target }) =>
									setUserInfo({ ...userInfo, password: target.value })
								}
								icon={<MdOutlinePassword />}
							/>
							<div className="flex justify-center">
								<button
									className={`btn-block btn-primary rounded-full p-2 mt-4 w-1/2 flex justify-center ${
										loading ? 'btn-disabled' : null
									}`}
									onClick={submitHandler}
								>
									{loading ? (
										<AiOutlineLoading className="animate-spin text-primary" />
									) : (
										<>Submit</>
									)}
								</button>
							</div>
							{/* //TODO: Implement the password reset functionality */}
							{/* <span className="link link-primary link-hover flex justify-center text-xs mt-4">
								<Link href="/auth/forgot_password/ask">Forgot Password ?</Link>
							</span> */}
						</form>
					</div>

					<p className="mt-10 md:mt-16 lg:mt-20 text-center">
						New Here ?{' '}
						<span className="link link-primary link-hover">
							<Link href="/auth/register">Register Now !</Link>
						</span>
					</p>
				</div>
			</div>
		</>
	);
};

export default Login;
