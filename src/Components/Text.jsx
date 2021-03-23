import React from "react";

export default function Text({ register, name, label, error, ...rest }) {
	return(
		<div className="mb-3">
			<label className="form-label" htmlFor={name}>{label}</label>
			<textarea id={name} name={name} ref={register} {...rest}></textarea>
			{error && <p>{error.message}</p>}
		</div>
	);
}