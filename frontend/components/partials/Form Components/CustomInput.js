import React from "react";
import Image from "next/image";

const CustomInput = (props) => {
	return (
		<div className="w-full">
			<label htmlFor={`${props.name}-input`} className="label">
				{props.label}
			</label>
			<div className="flex items-center p-2">
				{props.icon}
				{props.maxLength ? (
					<input
						maxLength={props.maxLength}
						onInput={props.onInput}
						type={props.type}
						placeholder={props.placeholder}
						value={props.value}
						onChange={props.onChange}
						id={`${props.name}-input`}
						className={
							props.bg
								? `border rounded-md w-full p-1 px-3 ml-3 text-gray-500 outline-none bg-${props.bg}`
								: `border rounded-md w-full p-1 px-3 ml-3 text-gray-500 outline-none bg-transparent`
						}
					/>
				) : (
					<input
						type={props.type}
						placeholder={props.placeholder}
						onInput={props.onInput}
						value={props.value}
						onChange={props.onChange}
						id={`${props.name}-input`}
						className={
							props.bg
								? `border rounded-md w-full p-1 px-3 ml-3 text-gray-500 outline-none bg-${props.bg}`
								: `border rounded-md w-full p-1 px-3 ml-3 text-gray-500 outline-none bg-transparent`
						}
					/>
				)}
			</div>
		</div>
	);
};

export default CustomInput;
