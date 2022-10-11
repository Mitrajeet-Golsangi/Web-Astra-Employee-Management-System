import { getSession, useSession } from 'next-auth/react';
import React from 'react';
import AvatarComponent, {
	ChangeAvatarModal,
} from '../../components/profile/Avatar';
import BaseLayout from '../../layouts/base';

import CustomInput from '../../components/partials/Form Components/CustomInput';

import axios from 'axios';
import {
	MdEmail,
	MdLocalPhone,
	MdOutlineDriveFileRenameOutline,
} from 'react-icons/md';
import { SiLastdotfm } from 'react-icons/si';

import { notificationContext } from '../../context/notificationContext';
import { reloadSession } from '../../utils/helpers';
import CustomRadio from '../../components/partials/Form Components/CustomRadio';

const Profile = ({ user }) => {
	const { data: session } = useSession();
	const [img, setImg] = React.useState(session?.user.img_url);
	const [userInfo, setUserInfo] = React.useState(user);
	const { setMessage } = React.useContext(notificationContext);

	const submitHandler = () => {
		axios
			.put(`${process.env.BACKEND_URL}/user/${session?.user._id}`, {
				fname: userInfo?.fname,
				lname: userInfo?.lname,
				contact: userInfo?.contact,
				image: img,
			})
			.then(res => {
				setMessage(res.data.message);
				reloadSession();
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
		<div className="p-5 grid grid-cols-1 md:grid-cols-4 gap-5 items-start">
			<div className="mt-10">
				<AvatarComponent src={img} />
				<ChangeAvatarModal setSrc={setImg} />
				<div className="flex flex-col justify-center mt-5">
					<div className="text-secondary uppercase">Company</div>
					<div>{userInfo?.company.name}</div>
					<div className="divider"></div>
					<div className="text-secondary uppercase">Address</div>
					<div>{userInfo?.company.address}</div>
					<div className="divider"></div>
				</div>
			</div>

			<form className="w-full lg:col-span-3">
				<CustomInput
					bg="white"
					name="fname"
					type="text"
					placeholder="First Name"
					label="First Name"
					value={userInfo?.fname}
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
					value={userInfo?.lname}
					onChange={({ target }) =>
						setUserInfo({ ...userInfo, lname: target.value })
					}
					icon={<SiLastdotfm />}
				/>
				<CustomInput
					name="email"
					type="email"
					placeholder="Email"
					label="Email"
					value={userInfo?.email}
					onChange={({ target }) =>
						setUserInfo({ ...userInfo, email: target.value })
					}
					icon={<MdEmail />}
					disabled={true}
					className="bg-slate-100"
				/>
				<CustomInput
					bg="white"
					name="contact"
					type="number"
					maxLength="10"
					placeholder="Contact"
					label="Contact"
					value={userInfo?.contact}
					onChange={({ target }) =>
						setUserInfo({ ...userInfo, contact: target.value })
					}
					icon={<MdLocalPhone />}
				/>
			</form>
			<button
				className="btn btn-primary rounded-full lg:col-start-3 place-self-center lg:w-full w-1/2"
				onClick={submitHandler}
			>
				Update Profile
			</button>
		</div>
	);
};

Profile.getLayout = page => <BaseLayout>{page}</BaseLayout>;

export const getServerSideProps = async ctx => {
	const session = await getSession(ctx);

	return {
		props: {
			user: session?.user,
		},
	};
};

export default Profile;
