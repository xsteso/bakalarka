import Box from "@mui/material/Box";
import React from "react";
import { useHistory } from "react-router-dom";
import { Email } from "../../api/api";
import { EmailForm } from "../../components/EmailForm";
import { postEmail } from "../../http/emails";

// initial email values
const initialFValues: Email = {
	subject: "",
	sender: "",
	reply_to: "",
	recipient: "",
	date: new Date().toISOString(),
	cc: "",
	body: "This is <strong>email body</strong>.",
	type: {
		id: 1,
	},
	sign: [],
};

// Form is used for adding new emails
export const EmailCreate = () => {
	const history = useHistory();

	// handler for submitting email
	const handleSubmit = (email: Email) => {
		postEmail(email).then(() => history.goBack());
	};

	return (
		<Box p={2}>
			<EmailForm email={initialFValues} handleSubmit={handleSubmit} />
		</Box>
	);
};
