import React from "react";

export default function Select({ register, name, options, label, error, additional, ...rest }) {
	return(
		<div className="mb-3">
			<label className="form-label" htmlFor={name}>{label}</label>
			<select name={name} ref={register} className="form-select" {...rest}>
				{options.map(option =>
					<option key={option.value} value={option.value}>{option.label}</option>
				)}
			</select>
			{error && <div>{error.message}</div>}
			{additional && <>{additional}</>}
		</div>
	);
}