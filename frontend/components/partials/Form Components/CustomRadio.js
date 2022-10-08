import React from "react";

const CustomRadio = (props) => {
	return (
		<div className={`form-control ${props.width} my-4 ${props.className}`}>
			<label className="label cursor-pointer text-xl">
				<span className="label-text mr-3">{props.label}</span>
				<input
					id={props.id}
					type="radio"
					className="radio radio-primary"
					value={props.value}
					checked={props.checked}
					defaultChecked={props.defaultChecked}
					onChange={props.onChange}
					disabled={props.disabled}
					name={props.name}
				/>
			</label>
		</div>
	);
};

export default CustomRadio;
