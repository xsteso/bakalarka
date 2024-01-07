import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import UpdateIcon from "@mui/icons-material/Update";
import { Alert, Button, Grid, Snackbar } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { EmailWithStatistics } from "../../api/models";
import { EmailForm } from "../../components/EmailForm";
import { StatisticsPaper } from "../../components/StatisticsPaper";
import { GamerunsTable } from "../../components/tables/GamerunTable";
import { fetchEmailWithStatisticsByID, updateEmail, updateEnabled } from "../../http/emails";

const emailInit: EmailWithStatistics = {
	id: -1,
	subject: "",
	sender: "",
	recipient: "",
	date: "",
	cc: "",
	body: "",
	type: { id: -1, type: "" },
	sign: [],
};

// Page where email info is displayed,
export const EmailInfoPage = ({ match }) => {
	// email with id from match
	const [email, setEmail] = useState<EmailWithStatistics>(emailInit);
	const emailId = match.params.id;

	// toast with information about save result
	const [isOpen, setIsOpen] = useState(false);

	const { t } = useTranslation();
	// on page mount fetch email and
	// statistics of the current email and also all types and signs
	useEffect(() => {
		fetchEmailWithStatisticsByID(emailId).then((res) => {
			setEmail(res);
		});
	}, [emailId]);

	// handler for submitting email
	const handleSubmit = (email: EmailWithStatistics) => {
		updateEmail(email.id, email).then(() => setIsOpen(true));
	};

	const handleEnable = (enabled: boolean) => {
		updateEnabled(emailId, enabled).then(() =>
			fetchEmailWithStatisticsByID(emailId).then((res) => {
				setEmail(res);
			}),
		);
	};

	return (
		<Box p={2}>
			{/* Box for all email statistics, statistics are mapped inside into Paper */}
			{email && (
				<>
					<Alert
						severity={email.enabled ? "success" : "error"}
						sx={{
							mr: 3,
							mb: 3,
							display: "flex",
							alignItems: "center",
							"& .MuiAlert-message": {
								width: "100%",
							},
						}}>
						<Box
							display="flex"
							alignItems="center"
							width="100%"
							flexDirection={{ xs: "column", md: "row" }}>
							<Typography
								variant="h6"
								sx={{
									width: "100%",
									mb: { xs: 5, md: 0 },
								}}>
								{email.enabled ? t("EMAILS.ENABLED_TRUE") : t("EMAILS.ENABLED_FALSE")}
							</Typography>

							<Button
								type="submit"
								size="large"
								color="secondary"
								variant="contained"
								sx={{ width: { xs: "100%", md: "auto" } }}
								onClick={() => handleEnable(!email.enabled)}
								startIcon={email.enabled ? <CancelIcon /> : <CheckCircleIcon />}>
								{email.enabled ? t("BUTTON.DISABLE") : t("BUTTON.ENABLE")}
							</Button>
						</Box>
					</Alert>

					<Typography variant="h4" mb={3}>
						{t("EMAILS.STATISTICS")}
					</Typography>
					<Grid container spacing={2} mb={3}>
						<Grid item xs={12} md={4}>
							<Box width="100%" display="flex" justifyContent="center">
								<StatisticsPaper
									Icon={TrendingUpIcon}
									identifier={t("EMAILS.OCCURRENCE")}
									value={email.occurrence ? `${email.occurrence}x` : "-"}
								/>
							</Box>
						</Grid>
						<Grid item xs={12} md={4}>
							<Box width="100%" display="flex" justifyContent="center">
								<StatisticsPaper
									Icon={CheckIcon}
									identifier={t("EMAILS.AVG_CORRECTNESS")}
									value={email.average_correctness ? `${email.average_correctness} %` : "-"}
								/>
							</Box>
						</Grid>
						<Grid item xs={12} md={4}>
							<Box width="100%" display="flex" justifyContent="center">
								<StatisticsPaper
									Icon={UpdateIcon}
									identifier={t("EMAILS.AVG_DURATION")}
									value={email.average_duration || "-"}
								/>
							</Box>
						</Grid>
					</Grid>

					<EmailForm email={email} handleSubmit={handleSubmit}>
						<>
							<Typography variant="h4" my={3}>
								{t("GAMERUNS.TITLE")}
							</Typography>
							<GamerunsTable emailID={emailId} deleteAllowed={false} />
						</>
					</EmailForm>
				</>
			)}

			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				open={isOpen}
				onClose={() => setIsOpen(false)}
				autoHideDuration={6000}>
				<Alert onClose={() => setIsOpen(false)} severity="success" sx={{ width: "100%" }}>
					{t("EMAILS.SAVE_SUCCESS")}
				</Alert>
			</Snackbar>
		</Box>
	);
};
