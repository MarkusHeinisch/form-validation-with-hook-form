/*
	TODO
	Add git

	BUG
	Backlink is wrong, after the form completion
*/

import React, { useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";

export default function Form({ setCompleted }) {

	const defaultValues = {
		tickets: 1,
		name: "Peter",
		email: "peter.parker@dot.net",
		message: "Maybe i will arrive a little later",
		optin: true
	}

	const [ submitting, setSubmitting ] = React.useState(false);
	const [ serverError, setServerError ] = React.useState([]);
	const { register, handleSubmit, errors, reset, setError } = useForm({ defaultValues });

	// backend form validation
	const onSubmit = async (formData) => {

		setSubmitting(true);
		setServerError();

		try {
			// api call
			const response = await fetch("http://localhost/form/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(formData)
			});

			// error occured by backend api
			if (!response.ok) {
				throw Error(response.statusText);
			}

			const responseData = await response.json();
			if(responseData.status == 'error' && responseData.errors) {

				//set field error manually by server response
				Object.keys(responseData.errors).map(key => {
					setError(key, { message: responseData.errors[key] });
				});

			} else {

				//set default values
				reset(defaultValues);

				//set form as completed
				setCompleted(true);

			}

		} catch(error) {

			//set error message by server response: api does no answer
			setServerError(error);
			console.error(error);

		}

		setSubmitting(false);

	}

	useEffect(() => {
        // Anything in here is fired on component mount.
        return () => {
            // Anything in here is fired on component unmount.
        }
    }, [])

	return(
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<label class="form-label" htmlFor="tickets">
					Tickets *
				</label>
				<select
					id="tickets"
					name="tickets"
					className="form-control"
					ref={register({ required: true })}
				>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</select>
				{errors.tickets && "This field is required"}
			</div>
			<div>
				<label class="form-label" htmlFor="name">
					Name *
				</label>
				<input
					type="text"
					id="name"
					name="name"
					className="form-control"
					placeholder="Enter name"
					ref={register({ required: "This field is required" })}
				/>
				{errors.name && <p>{errors.name.message}</p>}
			</div>
			<div>
				<label class="form-label" htmlFor="email">
					Email *
				</label>
				<input
					id="email"
					name="email"
					className="form-control"
					placeholder="Enter email"
					ref={register({
						required: "This field is required",
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: "Enter a valid e-mail address",
						}
					})}
				/>
				{errors.email && <div>{errors.email.message}</div>}
			</div>
			<div>
				<label class="form-label" htmlFor="message">
					Message (optional)
				</label>
				<textarea
					id="message"
					name="message"
					className="form-control"
					placeholder="You can leave a optional message if you want"
					ref={register}
				></textarea>
			</div>
			<div>
				<input
					type="checkbox"
					id="optin"
					name="optin"
					ref={register({required:true})}
				/>
				<label class="form-label" htmlFor="optin">
					Agree to terms and conditions *
				</label>
				{errors.optin && "This field is required"}
			</div>
			<div>
				<button type="submit" className="btn btn-primary" disabled={submitting}>
					Submit
				</button>
				{serverError && (
					<div>{serverError.message}</div>
				)}
			</div>
		</form>
	)
}