import SettingsIcon from "@mui/icons-material/Settings";
import { Button, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { routes } from "../routes/routes";
import { LanguageSelector } from "./LanguageSelector";

// Header with settings button - if user is logged in, it redirects to
// settings page, otherwise login page
export const LoginHeader = () => {
	const { t } = useTranslation();

	return (
		<AppBar>
			<Toolbar
				sx={{
					display: "flex",
					justifyContent: "space-between",
					p: 2,
				}}>
				<Box
					display="flex"
					alignItems="center"
					component={Link}
					to={routes.home}
					sx={{ textDecoration: "none", color: "inherit" }}>
					<img src={logo} alt="Logo" height={50} />
					<Typography
						sx={{
							display: { xs: "none", md: "flex" },
							fontSize: 30,
							marginLeft: 3,
						}}>
						{t("APP_TITLE")}
					</Typography>
				</Box>
				<Box display={"flex"} flexWrap={"nowrap"}>
					<LanguageSelector />
					<Button
						size="large"
						variant="contained"
						component={Link}
						to={routes.settings}
						color="secondary"
						sx={{ ml: 2 }}>
						<Box sx={{ display: "flex" }}>
							<SettingsIcon sx={{ mr: { xs: 0, sm: 1 } }} />
							<Box sx={{ display: { xs: "none", sm: "block" } }}>{t("BUTTON.SETTINGS")}</Box>
						</Box>
					</Button>
				</Box>
			</Toolbar>
		</AppBar>
	);
};
