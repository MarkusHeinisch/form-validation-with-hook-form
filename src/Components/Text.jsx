import React from "react";
import { buildClassName } from "./Util";

export default function Text({ register, name, label, error, additional, ...rest }) {

	const defaultClass = "form-text";
	const className = buildClassName(defaultClass, rest.className, error ? "is-invalid" : "");

	return(
		<div className="mb-3">
			<label className="form-label" htmlFor={name}>{label}</label>
			<textarea id={name} name={name} ref={register} {...rest} className={className}></textarea>
			{error && <div className="invalid-feedback">{error.message}</div>}
			{additional && <>{additional}</>}
		</div>
	);
}