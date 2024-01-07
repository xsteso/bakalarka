import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { CustomizedPaper } from "../../components/CustomizedPaper";
import { ErrorBox } from "../../components/form/ErrorBox";
import { PageWrapper } from "../../components/PageWrapper";
import { routes } from "../../routes/routes";
import { login } from "../../store/auth/actions";

// Login page for logging into admin section (settings)
const _LoginPage = (props) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const history = useHistory();
	const { t } = useTranslation();

	// if error fails, show error box with error message
	useEffect(() => {
		if (props.loginError) setError(t("ERRORS.BAD_CREDENTIALS"));
	}, [props.loginError, t]);

	// handler for login
	const handleLogin = () => {
		setError(null);
		// call login from props, if login was successful, user is redirected to settings Page
		props.login(username, password);
	};

	return (
		<PageWrapper>
			<ErrorBox severity="error" error={error} />
			{
				// if user is not logged in, show login form, otherwise redirect to settings page
				!props.isAuthenticated ? (
					<Box
						sx={{
							width: "100%",
							height: "100%",
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}>
						<CustomizedPaper narrow={true}>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									position: { xs: "relative", sm: "absolute" },
								}}>
								<IconButton color="primary" onClick={() => history.goBack()}>
									<ArrowBackIcon />
								</IconButton>
							</Box>

							<Typography component={"h4"} variant="h4" align="center">
								{t("LOGIN.TITLE")}
							</Typography>

							{/* Box with textfield for username */}
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									mt: 5,
									mb: 3,
									px: { xs: "10%", sm: "20%" },
								}}>
								<TextField
									id="username"
									label={t("LOGIN.USERNAME")}
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									fullWidth
								/>
							</Box>
							{/* Box with textfield for password */}
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									mb: 4,
									px: { xs: "10%", sm: "20%" },
								}}>
								<TextField
									id="password"
									type="password"
									label={t("LOGIN.PASSWORD")}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									fullWidth
								/>
							</Box>
							{/* Box with Login button */}
							<Box sx={{ display: "flex", justifyContent: "center" }}>
								<Button color="primary" variant="contained" size="large" onClick={handleLogin}>
									{t("LOGIN.SUBMIT")}
								</Button>
							</Box>
						</CustomizedPaper>
					</Box>
				) : (
					<Redirect to={routes.settings} />
				)
			}
		</PageWrapper>
	);
};

_LoginPage.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
	loginError: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	loginError: state.auth.loginError,
});

export const LoginPage = connect(mapStateToProps, { login })(_LoginPage);
