import BarChartIcon from "@mui/icons-material/BarChart";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import PercentIcon from "@mui/icons-material/Percent";
import ReportIcon from "@mui/icons-material/Report";
import TimerIcon from "@mui/icons-material/Timer";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GamerunSummary } from "../api/models";
import avatar from "../assets/avatar.png";
import { fetchSigns } from "../http/signs";
import { EmailParser } from "./EmailParser";

const Chip = ({ children }) => (
	<Box
		display="flex"
		justifyContent="center"
		alignItems="center"
		sx={{
			p: 2,
			borderRadius: 7,
			mr: { xs: 0, md: 2 },
			mb: { xs: 2, md: 0 },
			width: { xs: "100%", md: "auto" },
			backgroundColor: "white",
		}}>
		{children}
	</Box>
);

const EmailBodyDialog = ({ email, signs, open, setOpen }) => {
	const { t } = useTranslation();

	return (
		<Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
			<DialogTitle>{email?.subject}</DialogTitle>
			<DialogContent
				sx={{
					display: "flex",
					justifyContent: "center",
					flexDirection: "column",
					overflowX: "hidden",
				}}>
				<EmailParser email={email} signs={signs} />
			</DialogContent>
			<DialogActions>
				<Button
					variant="contained"
					color="secondary"
					size="large"
					sx={{ m: 2 }}
					onClick={() => setOpen(false)}>
					{t("BUTTON.CLOSE")}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export const StatisticsSummary = ({ statistics }: { statistics: GamerunSummary }) => {
	const [open, setOpen] = useState(false);
	const [signs, setSigns] = useState([]);
	const { t } = useTranslation();
	const email = statistics.email;

	useEffect(() => {
		fetchSigns().then((fSigns) => setSigns(fSigns));
	}, []);

	return (
		<Box
			display="flex"
			flexDirection="column"
			sx={{
				p: 2,
				mb: 3,
				borderRadius: 7,
				backgroundColor: statistics.answer.correctness === true ? "#a5dfa7" : "#ff947c",
			}}>
			<Box
				sx={{
					display: "flex",
					width: "100%",
				}}>
				<img
					src={avatar}
					alt="Avatar"
					width={50}
					height={50}
					style={{
						borderRadius: "100%",
						border: "2px solid #cfcfcf",
						marginRight: "1rem",
					}}
				/>
				<Box
					sx={{
						display: "flex",
						flexDirection: { xs: "column", md: "row" },
						justifyContent: "space-between",
						alignItems: "center",
						width: "100%",
					}}>
					<Box>
						<Typography component={"h5"} variant="h5" sx={{ wordBreak: "break-word" }}>
							{email?.subject}
						</Typography>
						<Typography component={"div"} variant="body2" sx={{ wordBreak: "break-word" }}>
							{email?.sender}
						</Typography>
					</Box>
					<Button
						onClick={() => setOpen(!open)}
						startIcon={<InfoIcon />}
						variant="contained"
						color="secondary"
						sx={{ mt: { xs: 3, md: 0 }, width: { xs: "100%", sm: "auto" } }}>
						{t("BUTTON.DETAIL")}
					</Button>
				</Box>
			</Box>
			<Divider
				variant="fullWidth"
				sx={{
					marginBottom: 3,
					marginTop: 3,
				}}
			/>
			<Box
				sx={{
					display: "flex",
					flexDirection: { xs: "column", md: "row" },
					alignItems: "center",
					width: "100%",
				}}>
				{/* Players answer */}
				<Chip>
					<Typography component={"div"} variant="body2" sx={{ mr: 0.5 }}>
						{t("GAMERUNS.ANSWER")}:<br />
						<span style={{ whiteSpace: "nowrap", marginRight: 3 }}>
							{statistics.answer.player_answer === true ? t("PLAY.PHISHING") : t("PLAY.LEGITIMATE")}
						</span>
					</Typography>
					{statistics.answer.player_answer === false ? <CheckCircleIcon /> : <ReportIcon />}
				</Chip>

				{/* Players duration */}
				<Chip>
					<Typography component={"div"} variant="body2" sx={{ mr: 0.5 }}>
						{t("GAMERUNS.DURATION")}: {statistics.players_duration}
					</Typography>
					<TimerIcon />
				</Chip>

				{/* Average duration */}
				<Chip>
					<Typography component={"div"} variant="body2" sx={{ mr: 0.5 }}>
						{t("GAMERUNS.AVG_DURATION")}: {statistics.average_duration}
					</Typography>
					<BarChartIcon />
				</Chip>

				{/* Average correctness */}
				<Chip>
					<Typography component={"div"} variant="body2" sx={{ mr: 0.5 }}>
						{t("GAMERUNS.AVG_CORRECTNESS")}: {statistics.average_correctness}
					</Typography>
					<PercentIcon />
				</Chip>
			</Box>

			<Divider
				variant="fullWidth"
				sx={{
					marginBottom: 3,
					marginTop: 3,
				}}
			/>

			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					flexDirection: { xs: "column", md: "row" },
				}}>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						marginRight: "0.5rem",
					}}>
					{statistics.answer.correctness === true ? (
						<CheckIcon sx={{ color: "green" }} />
					) : (
						<CloseIcon sx={{ color: "red" }} />
					)}
				</Box>
				<Typography component={"h6"} variant="h6">
					{statistics.answer.correctness === true ? `${t("PLAY.CORRECT")}!` : `${t("PLAY.WRONG")}!`}
					&nbsp;
					{t("GAMERUNS.EMAIL_RESULT", {
						email_type: t(statistics.email?.type?.type).toLocaleLowerCase(),
					})}
					.
				</Typography>
			</Box>

			<EmailBodyDialog email={email} signs={signs} open={open} setOpen={setOpen} />
		</Box>
	);
};
