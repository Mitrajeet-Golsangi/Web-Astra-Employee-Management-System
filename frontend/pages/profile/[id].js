import { useSession } from 'next-auth/react';
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

const Profile = () => {
	const { data: session } = useSession();
	const [userInfo, setUserInfo] = React.useState(null);
	const [img, setImg] = React.useState(session?.user.img_url);
	const { setMessage } = React.useContext(notificationContext);

	React.useEffect(() => setUserInfo(session?.user), []);

	const submitHandler = () => {
		axios
			.put(`${process.env.BACKEND_URL}/user/${session?.user._id}`, {
				fname: userInfo.fname,
				lname: userInfo.lname,
				contact: userInfo.contact,
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
					className="bg-slate-200"
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
export default Profile;
