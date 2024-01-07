import { Alert, Snackbar } from "@mui/material";
import PropTypes from "prop-types";
import * as React from "react";
import { useEffect, useState } from "react";

// Error box shows on top of screen for 3 seconds, if error msg is not empty
export const ErrorBox = ({
	severity,
	error,
}: {
	severity: "success" | "info" | "warning" | "error";
	error: string;
}) => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		if (!error) {
			setShow(false);
			return;
		}

		setShow(true);
	}, [error]);

	return (
		<Snackbar
			anchorOrigin={{ vertical: "top", horizontal: "center" }}
			open={show}
			message="error"
			sx={{ marginTop: 12 }}>
			<Alert onClose={() => setShow(false)} severity={severity}>
				{error}
			</Alert>
		</Snackbar>
	);
};

ErrorBox.propTypes = {
	severity: PropTypes.string.isRequired,
	// error message
	error: PropTypes.string.isRequired,
};
