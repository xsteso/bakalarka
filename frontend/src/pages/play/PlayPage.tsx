import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HelpIcon from "@mui/icons-material/Help";
import ReportIcon from "@mui/icons-material/Report";
import { Button, Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { subMinutes } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import { Email } from "../../api/api";
import { EmailEndResponse, NextEmail } from "../../api/models";
import avatar from "../../assets/avatar.png";
import { CustomizedPaper } from "../../components/CustomizedPaper";
import { EmailWindow } from "../../components/EmailWindow";
import { HintsDialog } from "../../components/HintsDialog";
import { PageWrapper } from "../../components/PageWrapper";
import { Result, ResultDialog } from "../../components/ResultDialog";
import { WarningDialog } from "../../components/WarningDialog";
import { GAMERUN_ID } from "../../helpers/consts";
import { getDate, getEllapsedTime } from "../../helpers/utils";
import { getNextEmail, postAnswer } from "../../http/gameruns";
import { fetchSettings } from "../../http/settings";
import { fetchSigns } from "../../http/signs";
import { routes } from "../../routes/routes";

// Play page handles rendering gamerun email  and posting answers
export const PlayPage = () => {
	// msg containing if answer was correct
	const [msg, setMsg] = useState(null);
	const [result, setResult] = useState(null);
	const [type, setType] = useState(null);
	const [currentEmail, setCurrentEmail] = useState<Email>(null);
	const [settings, setSettings] = useState(null);
	const [signs, setSigns] = useState([]);
	const [step, setStep] = useState(null);
	// true if help window is opened, otherwise false
	const [helpWindowOpened, setHelpWindowOpened] = useState(false);
	// answered - true if player has answered to current email, otherwise false,
	// answer - player's answer ( true = phishing email, false - legitimate email )
	const [answer, setAnswer] = useState({ answered: false, answer: false });
	const history = useHistory();
	const location = useLocation();
	// order of the current email in gamerun

	// dialog with alert when clicking url in email
	const [urlAlertOpen, setUrlAlertOpen] = useState(false);

	const { t } = useTranslation();

	// restore scroll position on navigation
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);

	// on page mount fetch next email
	useEffect(() => {
		handleNextEmail();
		fetchSettings().then((settingsData) => setSettings(settingsData));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// get next unanswered email
	const handleNextEmail = () => {
		setMsg(null);
		setResult(null);
		setType(null);

		setAnswer({ answered: false, answer: false });

		getNextEmail()
			.then((email: NextEmail) => {
				if ((email as EmailEndResponse).end) {
					const gamerun_id = sessionStorage.getItem(GAMERUN_ID);
					history.push(`${routes.summary}?${GAMERUN_ID}=${gamerun_id}`);
				} else {
					setCurrentEmail(email as Email);
					sessionStorage.setItem(GAMERUN_ID, email.gamerun_id);
					setStep(email.step);
					window.scrollTo(0, 0);
				}
			})
			.catch(() => history.push(routes.start));
		fetchSigns().then((fSigns) => setSigns(fSigns));
	};

	// handler for parsing and posting answer
	const handleAnswer = (answer) => {
		// get type of current email
		const emailTypeId = currentEmail["type"].id;
		const emailTypeName = currentEmail["type"].type;
		// true if email is phishing (other type than legitimate), otherwise false
		const emailIsPhishing = emailTypeId !== 1;

		setAnswer({ answered: true, answer });

		// post answer, backend is handling current gamerun and email
		postAnswer(answer);

		// if answer was correct and email is legitimate
		if (answer === false && emailIsPhishing === false) {
			setResult(Result.SUCCESS);
			setType(null);
			setMsg(t("PLAY.LEGITIMATE_EMAIL"));
		}
		// else if and was correct and email is phishing
		else if (answer === true && emailIsPhishing === true) {
			setResult(Result.SUCCESS);
			setType(t(emailTypeName));
			setMsg(t("PLAY.PHISHING_EMAIL"));
		}
		// else if answer was incorrect and email is phishing
		else if (answer === false && emailIsPhishing === true) {
			setResult(Result.FAILURE);
			setType(t(emailTypeName));
			setMsg(t("PLAY.PHISHING_EMAIL"));
		}
		// else if answer was incorrect and email is legitimate
		else {
			setResult(Result.FAILURE);
			setType(null);
			setMsg(t("PLAY.LEGITIMATE_EMAIL"));
		}
	};

	const DateInfo = useCallback(() => {
		const useRealDate = settings?.find((setting) => setting.key === "email_date").value === "true";

		const date =
			currentEmail?.date && useRealDate
				? new Date(currentEmail?.date)
				: subMinutes(new Date(), Math.floor(Math.random() * (240 - 5 + 1) + 5));

		return (
			<>
				<Typography component={"div"} variant="body2">
					{getDate(date)}
				</Typography>
				<Typography component={"div"} variant="body2">
					{`(${getEllapsedTime(new Date(), new Date(date))})`}
				</Typography>
			</>
		);
	}, [currentEmail?.date, settings]);

	return (
		<PageWrapper fullWidth={false} fullHeight={false}>
			<Box
				sx={{
					width: "100%",
					display: "flex",
					justifyContent: "center",
					flexDirection: "column",
				}}>
				{settings && step !== null && (
					<>
						<Stepper
							activeStep={step}
							alternativeLabel
							sx={{
								width: "100%",
								mb: 3,
								display: { xs: "none", md: "flex" },
							}}>
							{[
								...Array(+settings.find((setting) => setting.key === "number_of_emails")?.value),
							].map((val) => (
								<Step key={val}>
									<StepLabel></StepLabel>
								</Step>
							))}
						</Stepper>
						<MobileStepper
							variant="dots"
							steps={+settings.find((setting) => setting.key === "number_of_emails")?.value}
							position="static"
							activeStep={step}
							sx={{
								display: { xs: "flex", md: "none" },
								width: "100%",
								justifyContent: "center",
								mb: 3,
							}}
							nextButton={null}
							backButton={null}
						/>
					</>
				)}

				{currentEmail && settings && (
					<CustomizedPaper>
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
							<Box display="flex" justifyContent="space-between" width="100%">
								<Box>
									<Typography component={"h5"} variant="h5">
										{currentEmail?.subject}
									</Typography>
									<Typography component={"div"} variant="body2" sx={{ overflowWrap: "anywhere" }}>
										{currentEmail?.sender}
									</Typography>
								</Box>
								<Box
									sx={{ display: { xs: "none", sm: "flex" } }}
									flexDirection="column"
									whiteSpace="nowrap">
									<DateInfo />
								</Box>
							</Box>
						</Box>
						<Divider
							variant="fullWidth"
							sx={{
								marginBottom: 3,
								marginTop: 3,
							}}
						/>
						<EmailWindow email={currentEmail} />
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
								justifyContent: "space-between",
								flexDirection: { xs: "column", md: "row" },
							}}>
							<Button
								variant="contained"
								color="secondary"
								startIcon={<HelpIcon />}
								onClick={() => setHelpWindowOpened(!helpWindowOpened)}>
								{t("BUTTON.HINTS")}
							</Button>

							<Box
								sx={{
									display: "flex",
									flexDirection: { xs: "column", md: "row" },
								}}>
								<Button
									variant="contained"
									color="error"
									disabled={answer?.answered}
									sx={{ mt: { xs: 3, md: 0 } }}
									onClick={() => handleAnswer(true)}
									startIcon={<ReportIcon />}>
									{t("PLAY.PHISHING")}
								</Button>

								<Button
									variant="contained"
									disabled={answer?.answered}
									color="success"
									onClick={() => handleAnswer(false)}
									sx={{ ml: { xs: 0, md: 3 }, mt: { xs: 3, md: 0 } }}
									startIcon={<CheckCircleIcon />}>
									{t("PLAY.LEGITIMATE")}
								</Button>
							</Box>
						</Box>
					</CustomizedPaper>
				)}
			</Box>
			<HintsDialog signs={signs} open={helpWindowOpened} setOpen={setHelpWindowOpened} />
			<ResultDialog result={result} type={type} message={msg} onClick={handleNextEmail} />
			<WarningDialog open={urlAlertOpen} setOpen={setUrlAlertOpen} />
		</PageWrapper>
	);
};
