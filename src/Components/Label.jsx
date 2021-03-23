import React from "react";

export default function Label({ htmlFor, label }) {
	return <label className="form-label" htmlFor={htmlFor}>{label}</label>;
}