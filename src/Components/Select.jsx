import React from "react";
import { buildClassName } from "./Util";

export default function Select({ register, name, options, label, error, additional, ...rest }) {

	const defaultClass = "form-select";
	const className = buildClassName(defaultClass, rest.className, error ? "is-invalid" : "");

	return(
		<div className="mb-3">
			<label className="form-label" htmlFor={name}>{label}</label>
			<select name={name} ref={register} {...rest} className={className}>
				{options.map(option =>
					<option key={option.value} value={option.value}>{option.label}</option>
				)}
			</select>
			{error && <div className="invalid-feedback">{error.message}</div>}
			{additional && <>{additional}</>}
		</div>
	);
}