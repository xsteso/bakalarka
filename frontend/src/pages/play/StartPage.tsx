import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CircularProgress, IconButton, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { Player } from "../../api/models";
import { CustomizedPaper } from "../../components/CustomizedPaper";
import { ErrorBox } from "../../components/form/ErrorBox";
import { SelectField } from "../../components/form/SelectField";
import { PageWrapper } from "../../components/PageWrapper";
import { initGamerun } from "../../http/gameruns";
import { routes } from "../../routes/routes";

// Page used for entering username and initializing gamerun
export const StartPage = () => {
	const [player, setPlayer] = useState<Player>({
		username: null,
		age: null,
		gender: "Man",
	});

	const history = useHistory();

	const error = useRef("");
	const [isLoading, setIsLoading] = useState(false);

	const [usernameError, setUsernameError] = useState("");
	const [ageError, setAgeError] = useState("");

	const { t } = useTranslation();

	const formError = t("VALIDATION.FORM_ERROR");
	const usernameBlank = t("VALIDATION.USERNAME_BLANK");
	const ageBlank = t("VALIDATION.AGE_BLANK");
	const ageFormat = t("VALIDATION.AGE_FORMAT");
	const ageInterval = t("VALIDATION.AGE_INTERVAL");

	const handleStart = () => {
		clearErrors();

		// if username is blank set error
		if (!player.username || player.username.trim().length === 0) {
			setUsernameError(usernameBlank);
			error.current = formError;
		}

		if (!player.age) {
			setAgeError(ageBlank);
			error.current = formError;
		} else {
			const age = Number.parseInt(player.age);

			if (!age) {
				setAgeError(ageFormat);
				error.current = formError;
			}

			if (age < 10 || age > 100) {
				setAgeError(ageInterval);
				error.current = formError;
			}
		}

		if (error.current) {
			return;
		}

		localStorage.setItem("player", JSON.stringify(player));
		setIsLoading(true);

		initGamerun(player)
			.then(() => {
				history.push(routes.play);
			})
			.catch(() => {
				error.current = t("ERRORS.GAMERUN_INIT_ERROR");
			})
			.finally(() => setIsLoading(false));
	};

	const clearErrors = () => {
		error.current = "";
		setUsernameError("");
		setAgeError("");
	};

	return (
		<PageWrapper>
			<ErrorBox severity="error" error={error.current} />

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
						<IconButton color="primary" onClick={() => history.push(routes.home)}>
							<ArrowBackIcon />
						</IconButton>
					</Box>
					<Typography
						component={"h4"}
						variant="h4"
						sx={{
							mb: 5,
							width: "100%",
							display: "flex",
							justifyContent: "center",
						}}>
						{t("PLAY.PLAYER")}
					</Typography>

					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							mb: 3,
							px: { xs: "10%", sm: "20%" },
						}}>
						<TextField
							id="username"
							label={t("PLAY.USERNAME")}
							onChange={(event) => {
								setPlayer({
									...player,
									username: event.target.value,
								});

								setUsernameError("");
							}}
							required={true}
							error={!!usernameError}
							helperText={usernameError}
							value={player.username}
							fullWidth
						/>
					</Box>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							mb: 3,
							px: { xs: "10%", sm: "20%" },
						}}>
						<TextField
							id="age"
							label={t("PLAY.AGE")}
							onChange={(event) => {
								setPlayer({
									...player,
									age: event.target.value,
								});

								setAgeError("");
							}}
							required={true}
							error={!!ageError}
							helperText={ageError}
							value={player.age}
							placeholder={"[10-100]"}
							fullWidth
						/>
					</Box>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							mb: 3,
							px: { xs: "10%", sm: "20%" },
						}}>
						<SelectField
							label={t("PLAY.GENDER")}
							name="gender"
							options={[
								{ id: "Man", text: t("GENDER.MAN") },
								{ id: "Woman", text: t("GENDER.WOMAN") },
								{ id: "Other", text: t("GENDER.OTHER") },
							]}
							value={player.gender}
							onChange={(event) =>
								setPlayer({
									...player,
									gender: event.target.value,
								})
							}
						/>
					</Box>
					<Box sx={{ display: "flex", justifyContent: "center" }}>
						<Button disabled={isLoading} variant="contained" size="large" onClick={handleStart}>
							{isLoading ? <CircularProgress size={30} /> : t("PLAY.START")}
						</Button>
					</Box>
				</CustomizedPaper>
			</Box>
		</PageWrapper>
	);
};
