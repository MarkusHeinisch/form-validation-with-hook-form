import React from "react";
import { buildClassName } from "./Util";

export default function Input({ register, name, label, error, additional, ...rest }) {

	const defaultClass = rest.type == "checkbox"
		? "form-check-input"
		: "form-control";

	const className = buildClassName(defaultClass, rest.className, error ? "is-invalid" : "");

	return(
		<div className="mb-3">
			<label className="form-label" htmlFor={name}>{label}</label>
			<input id={name} name={name} ref={register} {...rest} className={className} />
			{error && <div className="invalid-feedback">{error.message}</div>}
			{additional && <>{additional}</>}
		</div>
	);
}