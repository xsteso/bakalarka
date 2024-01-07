import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";

export type Result = "success" | "failure";
// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Result = {
	SUCCESS: "success" as Result,
	FAILURE: "failure" as Result,
};

export const ResultDialog = ({
	message,
	type,
	result,
	onClick,
}: {
	message: string;
	type: string;
	result: Result;
	onClick: () => void;
}) => {
	const { t } = useTranslation();

	return (
		<Dialog open={!!message}>
			<DialogTitle>
				{result === Result.SUCCESS && `${t("PLAY.CORRECT")}!`}
				{result === Result.FAILURE && `${t("PLAY.WRONG")}!`}
			</DialogTitle>
			<DialogContent>
				<Box
					sx={{
						width: "100%",
						display: "flex",
						justifyContent: "center",
						mb: 3,
					}}>
					{result === Result.SUCCESS && (
						<CheckCircleIcon color="success" sx={{ width: "4rem", height: "4rem" }} />
					)}

					{result === Result.FAILURE && (
						<CancelIcon color="error" sx={{ width: "4rem", height: "4rem" }} />
					)}
				</Box>
				<DialogContentText>
					{message}
					{type && (
						<>
							&nbsp;-&nbsp;<strong>{type}</strong>
						</>
					)}
					.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button color="secondary" variant="contained" size="large" sx={{ m: 2 }} onClick={onClick}>
					{t("BUTTON.CONTINUE")}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
