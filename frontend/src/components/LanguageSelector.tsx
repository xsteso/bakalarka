import TranslateIcon from "@mui/icons-material/Translate";
import { Box, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import i18n from "i18next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AvailableLocale, languages, localStorageKey } from "../i18n/i18n";

export const FlagIcon = ({ lang, ...props }) => (
	<img
		style={{ border: "1px solid black", borderRadius: "5px" }}
		src={`https://flagcdn.com/w40/${lang.flag}.png`}
		width="30"
		height="20"
		alt={lang.nativeName}
		{...props}
	/>
);

const getCurrentLanguageName = () => {
	const language =
		([AvailableLocale.EN, AvailableLocale.SK, AvailableLocale.CZ].includes(
			i18n.language as AvailableLocale,
		) &&
			i18n.language) ||
		AvailableLocale.CZ;

	return languages.find((lang) => lang.code === language)?.nativeName;
};

export const LanguageSelector = () => {
	const { t } = useTranslation();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const storedLang = localStorage.getItem(localStorageKey);

		// If no stored language is present, use CZ locale
		if (!storedLang || storedLang === "en-US") {
			i18n.changeLanguage(AvailableLocale.CZ);
		}
	}, []);

	return (
		<>
			<Button size="large" variant="contained" onClick={() => setOpen(true)} color="secondary">
				<Box sx={{ display: "flex" }}>
					<TranslateIcon sx={{ mr: { xs: 0, sm: 1 } }} />
					<Box sx={{ display: { xs: "none", sm: "block" } }}>{getCurrentLanguageName()}</Box>
				</Box>
			</Button>

			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle>{t("LANGUAGE.SELECT")}</DialogTitle>
				<DialogContent>
					<Box display={"flex"} flexDirection={"column"}>
						{languages.map((lang) => (
							<Button
								key={lang.code}
								onClick={() => {
									i18n.changeLanguage(lang.code);
									setOpen(false);
								}}
								sx={{ width: "100%", mb: 1 }}>
								<Box
									sx={{
										display: "flex",
										width: "100%",
									}}>
									<FlagIcon
										lang={lang}
										style={{
											marginRight: "1rem",
											boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
										}}
									/>
									{lang.nativeName}
								</Box>
							</Button>
						))}
					</Box>
				</DialogContent>
				<DialogActions>
					<Button
						variant="contained"
						color="secondary"
						sx={{ m: 2 }}
						onClick={() => setOpen(false)}>
						{t("BUTTON.CLOSE")}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
