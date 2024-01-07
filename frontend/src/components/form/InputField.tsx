import { TextField } from "@mui/material";
import PropTypes from "prop-types";

/**
 * InputField field with error msg handling
 */
export const InputField = ({ name, label, error = null, ...rest }) => (
	<TextField
		variant="outlined"
		label={label}
		name={name}
		{...rest}
		// if error (msg) is in props,
		// set textfield error = true and set helperText
		{...(error && { error: true, helperText: error })}
	/>
);

InputField.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
};
