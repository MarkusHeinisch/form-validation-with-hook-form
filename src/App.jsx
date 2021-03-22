import React from "react";
import Form from "./Form";

export default function App() {
	const [completed, setCompleted] = React.useState(false);
	return completed
		? <h1>danke</h1>
		: <Form setCompleted={ setCompleted } />;
}