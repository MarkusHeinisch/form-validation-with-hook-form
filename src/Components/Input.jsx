import React, { Component } from "react";
import Label from "./Label";
import { buildClassName } from "./Util";

export default function Input({ register, name, label, error, additional, ...rest }) {

	const isCheckbox = rest.type == "checkbox" ? true : false;
	const defaultClass = isCheckbox
		? "form-check-input"
		: "form-control";

	const classNameWrapper = "mb-3" + (isCheckbox ? " form-check" : "");
	const classNameInput = buildClassName(defaultClass, rest.className, error ? "is-invalid" : "");

	const output = {
		label: <Label htmlFor={name} label={label} />,
		input: <input id={name} name={name} ref={register} {...rest} className={classNameInput} />
	};

	return(
		<div className={classNameWrapper}>
			{isCheckbox
				? <>{output.input}{output.label}</>
				: <>{output.label}{output.input}</>
			}
			{error && <div className="invalid-feedback">{error.message}</div>}
			{additional && <>{additional}</>}
		</div>
	);
}