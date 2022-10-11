import axios from 'axios';
import React from 'react';
import { MdDescription } from 'react-icons/md';
import CustomInput from '../partials/Form Components/CustomInput';
import CustomRadio from '../partials/Form Components/CustomRadio';

import { notificationContext } from '../../context/notificationContext';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const TasksModal = () => {
	const router = useRouter();
	const { data: session } = useSession();

	const [maxVal, setMaxVal] = React.useState(null);
	const [taskInfo, setTaskInfo] = React.useState({
		description: '',
		start_time: '',
		duration: '',
		task_type: '',
		id: session?.user._id,
	});
	const { setMessage } = React.useContext(notificationContext);

	React.useEffect(() => {
		setMaxVal(new Date().toISOString().split('.')[0]),
			setTaskInfo({ ...taskInfo, id: session?.user._id });
	}, [session]);

	const submitHandler = () => {
		console.log(taskInfo);

		axios
			.post(`${process.env.BACKEND_URL}/task/create`, taskInfo)
			.then(_ => {
				setMessage('Task Added Successfully !');
				setTaskInfo({
					description: '',
					start_time: '',
					duration: '',
					task_type: '',
					id: session?.user._id,
				});
				router.push('/');
			})
			.catch(err => setMessage(err.message));
	};

	return (
		<>
			<input
				type="checkbox"
				id="tasks-modal"
				className="modal-toggle"
			/>
			<label
				htmlFor="tasks-modal"
				className="modal modal-bottom md:modal-middle"
			>
				<label
					className="modal-box relative"
					htmlFor=""
				>
					<label
						htmlFor="tasks-modal"
						className="btn btn-sm btn-circle bg-transparent absolute right-2 top-2 hover:bg-error text-black hover:text-white border-none"
					>
						✕
					</label>
					<h3 className="text-lg font-bold">Add your Tasks here !</h3>
					<div className="divider"></div>
					<form>
						<div className="w-full">
							<label
								htmlFor="description-input"
								className="label"
							>
								Task Description
							</label>
							<div className="flex items-center p-2">
								<MdDescription />
								<textarea
									className="border rounded-md w-full p-1 px-3 ml-3 text-gray-500 outline-none bg-white"
									value={taskInfo.description}
									onChange={({ target }) =>
										setTaskInfo({ ...taskInfo, description: target.value })
									}
								></textarea>
							</div>
						</div>
						<label
							htmlFor="description-input"
							className="label"
						>
							Task Type
						</label>
						<div className="flex items-center justify-around">
							<CustomRadio
								value="Work"
								name="task-type-radio"
								label="Work"
								onChange={({ target }) =>
									setTaskInfo({ ...taskInfo, task_type: target.value })
								}
							/>
							<CustomRadio
								value="Meeting"
								name="task-type-radio"
								label="Meeting"
								onChange={({ target }) =>
									setTaskInfo({ ...taskInfo, task_type: target.value })
								}
							/>
							<CustomRadio
								value="Break"
								name="task-type-radio"
								label="Break"
								onChange={({ target }) =>
									setTaskInfo({ ...taskInfo, task_type: target.value })
								}
							/>
						</div>
						<CustomInput
							value={taskInfo.start_time}
							type="datetime-local"
							label="Start Date & Time"
							onChange={({ target }) =>
								setTaskInfo({ ...taskInfo, start_time: target.value })
							}
							max={maxVal}
						/>
						<CustomInput
							value={taskInfo.duration}
							type="number"
							label="Duration (min)"
							onChange={({ target }) =>
								setTaskInfo({ ...taskInfo, duration: target.value })
							}
						/>
					</form>
					<div className="flex justify-center mt-5">
						<label
							htmlFor="tasks-modal"
							className="btn btn-outline btn-primary rounded-full w-1/2"
							onClick={submitHandler}
						>
							Submit
						</label>
					</div>
				</label>
			</label>
		</>
	);
};;;;;

export default TasksModal;
