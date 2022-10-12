import React from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import Image from 'next/image';
import axios from 'axios';
import uploadImage from '../../utils/imageUploader';
import Router from 'next/router';
import { useSession } from 'next-auth/react';

const AvatarComponent = props => {
	const { data: session } = useSession();

	return (
		<div className="relative flex items-center justify-center bg-transparent">
			<div
				className={`avatar ${props.src ? 'bg-transparent' : 'placeholder'}`}
				onMouseEnter={
					props.static
						? null
						: () =>
								document
									.getElementById('add-profile-pic')
									.classList.remove('opacity-0')
				}
				onMouseLeave={
					props.static
						? null
						: () =>
								document
									.getElementById('add-profile-pic')
									.classList.add('opacity-0')
				}
			>
				{props.src ? (
					<div className="w-1/2 md:w-full rounded-full">
						<Image
							src={props.src}
							width="200"
							height="200"
							objectFit="contain"
							alt="profile picture"
							style={{ backgroundColor: 'transparent' }}
						/>
					</div>
				) : (
					<div className="bg-secondary-focus text-base-100 rounded-full w-24">
						<span className="text-3xl">
							{session?.user.fname[0].toUpperCase()}
						</span>
					</div>
				)}
			</div>
			{props.static ? null : (
				<label
					id="add-profile-pic"
					className="p-0 cursor-pointer absolute self-center glass w-1/2 h-[100%] rounded-full duration-500 transition ease-in-out opacity-0 items-center justify-center flex"
					htmlFor="change-avatar-modal"
					onMouseEnter={() =>
						document
							.getElementById('add-profile-pic')
							.classList.remove('opacity-0')
					}
					onMouseLeave={() =>
						document
							.getElementById('add-profile-pic')
							.classList.add('opacity-0')
					}
				>
					<AiOutlineUserAdd className="text-4xl md:text-7xl" />
				</label>
			)}
		</div>
	);
};

export const ChangeAvatarModal = props => {
	const [user, setUser] = React.useState(null);
	const [loading, setLoading] = React.useState(false);

	const { data: session } = useSession();

	React.useEffect(() => {
		if (session) setUser(session?.user._id);
	});

	const submitHandler = e => {
		e.preventDefault();
		setLoading(true);

		const file = document.getElementById('image-input').files[0];

		uploadImage(
			file,
			link => {
				axios
					.put(`${process.env.BACKEND_URL}/user/${session?.user._id}`, {
						image: link,
					})
					.then(() => {
						props.setSrc(link);
						setLoading(false);
						Router.push(`/profile/${session?.user._id}`);
					})
					.catch(() => setLoading(false));
			},
			() => setLoading(false)
		);
	};
	return (
		<>
			<input
				type="checkbox"
				id="change-avatar-modal"
				className="modal-toggle"
			/>
			<label
				htmlFor="change-avatar-modal"
				className="modal cursor-pointer"
			>
				<label
					className="modal-box relative"
					htmlFor=""
				>
					<label
						htmlFor="change-avatar-modal"
						className="link-primary cursor-pointer absolute right-4 top-4"
					>
						✕
					</label>
					<h3 className="text-lg font-bold text-primary">Change your Avatar</h3>
					<form className="flex items-center justify-between">
						<div className="form-control col-span-6 w-full mt-3">
							<label className="label">
								<span className="label-text">Profile Image</span>
							</label>
							<input
								id="image-input"
								accept="image/png, image/gif, image/jpeg"
								type="file"
								placeholder="Upload Image"
								className="file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-primary
                            hover:file:bg-blue-100"
							/>
						</div>
						<button
							className={`btn btn-primary rounded-full self-end ${
								loading ? 'loading btn-disabled' : null
							}`}
							onClick={submitHandler}
						>
							Change Icon
						</button>
					</form>
				</label>
			</label>
		</>
	);
};

export default AvatarComponent;
