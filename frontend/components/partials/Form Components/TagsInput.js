import React from 'react';
import { MdClose, MdOutlineCategory } from 'react-icons/md';
const TagsInput = ({ tags, setTags }) => {
	const addTags = e => {
		if (e.key === 'Enter' && e.target.value !== '') {
			setTags([...tags, e.target.value]);
			e.target.value = '';
		}
	};

	return (
		<div>
			<label
				htmlFor={`departments-input`}
				className="label"
			>
				Departments
			</label>
			<div className="flex items-center p-2">
				<MdOutlineCategory />
				<div className="border rounded-md w-full p-1 px-3 ml-3 text-gray-500 outline-none bg-white">
					<ul>
						{tags.map((tag, index) => (
							<li
								key={index}
								className="badge badge-lg badge-secondary mx-1"
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
						id="departments-input"
						type="text"
						placeholder="Press Enter to add Department"
						onKeyUp={addTags}
						className="w-full h-full mt-2"
					/>
				</div>
			</div>
		</div>
	);
};
export default TagsInput;
