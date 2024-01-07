import {
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select as MuiSelect,
} from "@mui/material";
import PropTypes from "prop-types";

// Custom SelectField field used for selecting types and signs of the email
export const SelectField = ({ name, label, error = null, multiple = false, options, ...rest }) => (
	<FormControl fullWidth variant="outlined" {...(error && { error: true })}>
		<InputLabel>{label}</InputLabel>
		<MuiSelect label={label} name={name} multiple={multiple} {...rest}>
			{options.map((item) => {
				// map types/signs into items of select field
				const id = item.id;
				const text = item[Object.keys(item)[1]]; // get key of second value and load its value
				return (
					<MenuItem key={id} value={id}>
						{text}
					</MenuItem>
				);
			})}
		</MuiSelect>
		{error && <FormHelperText>{error}</FormHelperText>}
	</FormControl>
);

SelectField.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	multiple: PropTypes.bool,
	options: PropTypes.arrayOf(PropTypes.object).isRequired,
};
