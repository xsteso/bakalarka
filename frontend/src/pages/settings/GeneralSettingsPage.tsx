import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
	Alert,
	Button,
	Divider,
	FormControlLabel,
	FormGroup,
	Grid,
	Snackbar,
	TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import * as React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ErrorBox } from "../../components/form/ErrorBox";
import { SignTable } from "../../components/tables/SignTable";
import { TypeTable } from "../../components/tables/TypeTable";
import { fetchSettings, updateSetting } from "../../http/settings";

// Setting Page contains TypeTable, SignTable and settings of game
export const GeneralSettingsPage = () => {
	const [settings, setSettings] = useState([]);
	const [error, setError] = useState("");

	// toast with information about save result
	const [isOpen, setIsOpen] = useState(false);

	const { t } = useTranslation();

	// on page mount fetch settings and signs
	useEffect(() => {
		fetchSettings().then((settingsData) =>
			setSettings(settingsData.sort((a, b) => (a.id > b.id ? 1 : -1))),
		);
	}, []);

	// setting textfields handler
	const handleChange = (value, index) => {
		// update changed setting
		const updatedSettings = [...settings];
		updatedSettings[index].value = value;

		setSettings(updatedSettings);
	};

	// handler for updating setting
	const updateSettingItem = (setting) => {
		setError("");
		// if target is '% of phishing emails in gamerun' check if value is between 0 and 100
		if (setting.key === "phishing_emails") {
			if (setting.value < 0 || setting.value > 100) {
				setError(`${t(setting.translated_text)} ${t("SETTINGS.RANGE")} 0 - 100`);
				return;
			}
		}

		updateSetting(setting.id, setting).then(() => setIsOpen(true));
	};

	return (
		<Box>
			<ErrorBox severity="error" error={error} />
			<Grid container>
				{
					// map settings into key: value
					settings.map((setting, index) => (
						// key of setting
						<Grid
							item
							xs={12}
							md={6}
							sx={{
								display: "flex",
								alignItems: "center",
								px: { xs: 0, md: 5 },
								my: 5,
							}}
							key={index}>
							{["number", "text", "password", "date"].includes(setting.type) && (
								<TextField
									label={t(setting.translated_text)}
									type={setting.type}
									sx={{ width: "100%" }}
									value={+setting.value}
									onChange={(e) => handleChange(e.target.value, index)}
								/>
							)}

							{setting.type === "checkbox" && (
								<FormGroup sx={{ width: "100%" }}>
									<FormControlLabel
										control={
											<Switch
												checked={setting.value === "true"}
												onChange={(e) => handleChange(e.target.checked ? "true" : "false", index)}
											/>
										}
										label={t(setting.translated_text)}
									/>
								</FormGroup>
							)}

							<Button
								variant="contained"
								size="large"
								onClick={() => updateSettingItem(setting)}
								color="primary"
								startIcon={<CheckCircleIcon />}
								sx={{ ml: "1em" }}>
								{t("BUTTON.SAVE")}
							</Button>
						</Grid>
					))
				}
			</Grid>
			<Divider sx={{ mt: 8, mb: 5 }} />
			{/* Grid contains TypeTable and SignTable */}
			<Box display="flex" sx={{ flexDirection: { xs: "column", md: "row" } }}>
				<TypeTable />
				<SignTable />
			</Box>

			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				open={isOpen}
				onClose={() => setIsOpen(false)}
				autoHideDuration={6000}>
				<Alert onClose={() => setIsOpen(false)} severity="success" sx={{ width: "100%" }}>
					{t("GENERAL.SAVE_SUCCESS")}
				</Alert>
			</Snackbar>
		</Box>
	);
};
