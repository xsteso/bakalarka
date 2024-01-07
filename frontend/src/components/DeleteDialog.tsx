import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "react-i18next";

export const DeleteDialog = ({ open, setOpen, confirm }) => {
	const { t } = useTranslation();

	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<DialogTitle>{t("DIALOG.DELETE")}</DialogTitle>
			<DialogActions sx={{ m: 2 }}>
				<Button variant="contained" color="secondary" onClick={() => setOpen(false)}>
					{t("BUTTON.CANCEL")}
				</Button>
				<Button variant="contained" color="error" onClick={() => confirm()}>
					{t("BUTTON.DELETE")}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
