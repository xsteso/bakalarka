import { Box, Button, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "react-i18next";
import { Sign } from "../api/api";

// Indicators windows is shown when email is answered, contains signs of actual email
export const HintsDialog = ({
	signs,
	open,
	setOpen,
}: {
	signs: Array<Sign>;
	open: boolean;
	setOpen: (value: boolean) => void;
}) => {
	const { t } = useTranslation();

	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<DialogTitle>{t("SIGNS.HINT.TITLE")}</DialogTitle>
			<DialogContent>
				<DialogContentText>{t("SIGNS.HINT.DESC")}:</DialogContentText>
				<Box
					sx={{
						height: "70%",
						px: 2,
						mt: 1,
						justifyContent: "center",
						overflowY: "auto",
					}}>
					{signs.map((sign, index) => (
						<Typography component={"div"} key={index} style={{ wordWrap: "break-word" }}>
							{index + 1}: {t(sign.text)}
						</Typography>
					))}
				</Box>
			</DialogContent>
			<DialogActions>
				<Button
					variant="contained"
					color="secondary"
					sx={{ width: "110px", m: 2 }}
					onClick={() => setOpen(false)}>
					{t("BUTTON.CLOSE")}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
