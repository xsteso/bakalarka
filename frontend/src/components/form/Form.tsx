import { makeStyles } from "@mui/styles";

// style for form wrapper
const useStyles = makeStyles(() => ({
	root: {
		"& .MuiFormControl-root": {
			width: "100%",
			margin: "10 0",
		},
	},
}));

export const Form = (props) => {
	const classes = useStyles();
	const { children, ...other } = props;

	return (
		<form className={classes.root} autoComplete="off" {...other}>
			{children}
		</form>
	);
};
