import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { EmailTable } from "../../components/tables/EmailTable";
import { emailRoutes, settingsRoutes } from "../../routes/routes";

// Page contains table with emails and buttons for creating and importing new email
export const EmailsPage = () => {
	const history = useHistory();
	const { t } = useTranslation();

	return (
		<Box>
			<EmailTable />

			<Box
				sx={{
					display: "flex",
					flexDirection: { xs: "column", md: "row" },
					width: "100%",
					justifyContent: "end",
					mt: "1em",
				}}>
				<Button
					variant="contained"
					onClick={() => history.push("." + settingsRoutes.emails + emailRoutes.create)}>
					{t("BUTTON.ADD")}
				</Button>
				<Button
					variant="contained"
					onClick={() => history.push("." + settingsRoutes.emails + emailRoutes.import)}
					sx={{ ml: { xs: "0", md: "1em" }, mt: { xs: "1em", md: "0" } }}>
					{t("BUTTON.IMPORT")}
				</Button>
			</Box>
		</Box>
	);
};
