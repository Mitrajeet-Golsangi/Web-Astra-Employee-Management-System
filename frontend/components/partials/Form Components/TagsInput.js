import React from 'react';
import { MdClose, MdOutlineCategory } from 'react-icons/md';
import { notificationContext } from '../../../context/notificationContext';
const TagsInput = ({ tags, setTags, name, validator }) => {
	const { setMessage } = React.useContext(notificationContext);

	const addTags = e => {
		if (e.key === 'Enter' && e.target.value !== '') {
			validator
				? validator(e)
					? setTags([...tags, e.target.value])
					: setMessage('Invalid Email ID !')
				: setTags([...tags, e.target.value]);
			e.target.value = '';
		}
	};

	return (
		<div className="w-full">
			<label
				htmlFor={`${name}-input`}
				className="label"
			>
				{name}
			</label>
			<div className="flex items-center p-2">
				<MdOutlineCategory />
				<div className="border rounded-md w-full p-1 px-3 ml-3 text-gray-500 outline-none bg-white">
					<ul>
						{tags.map((tag, index) => (
							<li
								key={index}
								className="badge badge-lg badge-secondary m-1"
							>
								<div className="flex items-center justify-between gap-2">
									<span>{tag}</span>
									<div className="bg-white text-secondary rounded-full">
										<MdClose
											onClick={() =>
												setTags([
													...tags.filter(tag => tags.indexOf(tag) !== index),
												])
											}
										/>
									</div>
								</div>
							</li>
						))}
					</ul>
					<input
						id={`${name}-input`}
						type="text"
						placeholder={`Press Enter to add ${name}`}
						onKeyUp={addTags}
						className="w-full h-full mt-2"
					/>
				</div>
			</div>
		</div>
	);
};
export default TagsInput;
