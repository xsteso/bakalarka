import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "react-i18next";

export const WarningDialog = ({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: (value: boolean) => void;
}) => {
	const { t } = useTranslation();

	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<DialogTitle>{t("EMAILS.HINT.TITLE")}</DialogTitle>
			<DialogContent>
				<DialogContentText>{t("EMAILS.HINT.DESC")}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button variant="contained" size="large" sx={{ m: 2 }} onClick={() => setOpen(false)}>
					{t("BUTTON.UNDRESTAND")}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
