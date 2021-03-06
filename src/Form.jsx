import React, { useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";
import Input from "./Components/Input";
import Select from "./Components/Select";
import Text from "./Components/Text";

export default function Form({ setCompleted, post_id }) {

	const defaultValues = {
		tickets: 1,
		name: "Peter",
		email: "peter.parker@dot.net",
		message: "Maybe i will arrive a little later",
		password: "myPassword22!",
		optin: true
	}

	const [ submitting, setSubmitting ] = React.useState(false);
	const [ serverError, setServerError ] = React.useState(null);
	const { register, handleSubmit, errors, reset, setError } = useForm({ defaultValues });

	// backend form validation
	const onSubmit = async (formData) => {

		setSubmitting(true);
		setServerError(null);

		//append post_id to form data
		formData.post_id = post_id;

		try {
			// api call
			const response = await fetch("http://localhost/wordpress/api/workshop/registration", {
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
			if(responseData.status == 'error') {

				if(responseData.errors) {

					//set field error manually by server response
					Object.keys(responseData.errors).map(key => {
						setError(key, { message: responseData.errors[key] });
					});

				} else {

					//set error message by server response: an error has occurred
					setServerError(responseData);
					console.error(responseData.message);

				}

			} else {

				//set default values
				reset(defaultValues);

				//set form as completed
				setCompleted(true);

			}

		} catch(error) {

			//set error message by server response: api does not answer
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
			<Select
				name="tickets"
				error={errors.tickets}
				label={"Tickets"}
				options= {[
					{ value: "", label: "Please choose the number of tickets" },
					{ value: "1", label: "1" },
					{ value: "2", label: "2" },
					{ value: "3", label: "3" }
				]}
				register={register({
					required: "This field is required"
				})}
			/>
			<Input
				name="name"
				error={errors.name}
				label={"Name"}
				placeholder={"Please enter your name"}
				register={register({
					required: "This field is required"
				})}
				className={"foo,form-control,bar,form-control,form-control"}
			/>
			<Input
				name="email"
				error={errors.email}
				label={"Email"}
				placeholder={"Please enter your email"}
				register={register({
					required: "This field is required",
					pattern: {
						value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
						message: "Enter a valid e-mail address",
					}
				})}
			/>
			<Input
				name="password"
				error={errors.password}
				label={"Password"}
				type={"password"}
				register={register({
					required: "This field is required",
					minLength: {
						value: 8,
						message: "must be 8 chars at minimum",
					},
					maxLength: {
						value: 20,
						message: "must be 20 chars at maximum",
					},
					validate: (value) => {
						return (
							[/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) =>
							pattern.test(value)
							) || "must include lower, upper, number, and special chars"
						);
					}
				})}
				additional={
					<div id="passwordHelpBlock" className="form-text">
						Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
					</div>
				}
			/>
			<Text
				id="message"
				name="message"
				label="Your message (optional)"
				className="form-control"
				placeholder="You can leave a optional message if you want"
			/>
			<Input
				name="optin"
				error={errors.optin}
				type="checkbox"
				label={"Agree to terms and conditions *"}
				register={register({
					required: "This field is required"
				})}
			/>
			{serverError && (
				<div className="alert alert-danger">{serverError.message}</div>
			)}
			<button type="submit" className="btn btn-primary" disabled={submitting}>
				Submit
			</button>

		</form>
	)
}