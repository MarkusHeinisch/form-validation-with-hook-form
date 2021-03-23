import React from "react";

export default function Input({ register, name, label, error, ...rest }) {
	const className = rest.type == "checkbox"
		? "form-check-input"
		: "form-control"
	return(
		<div className="mb-3">
			<label className="form-label" htmlFor={name}>{label}</label>
			<input id={name} name={name} ref={register} className={className} {...rest} />
			{error && <div>{error.message}</div>}
		</div>
	);
}