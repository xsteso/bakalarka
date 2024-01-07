import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import HelpIcon from "@mui/icons-material/Help";
import RemoveIcon from "@mui/icons-material/Remove";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Button, Grid, IconButton, Paper, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Children, cloneElement, isValidElement, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Editor from "react-simple-code-editor";
import { Sign, Type } from "../api/api";
import step1 from "../assets/editor/step1.png";
import step2 from "../assets/editor/step2.png";
import step3 from "../assets/editor/step3.png";
import step4 from "../assets/editor/step4.png";
import step5 from "../assets/editor/step5.png";
import { EmailParser, SIGN_CLASS } from "../components/EmailParser";
import { Form } from "../components/form/Form";
import { InputField } from "../components/form/InputField";
import { SelectField } from "../components/form/SelectField";
import { useForm } from "../hooks/useForm";
import { fetchSigns } from "../http/signs";
import { fetchTypes } from "../http/types";
import { ImageCarousel } from "./ImageCarousel";

const syntaxHighlight = (str: string): any => {
	const prism = window["Prism"];
	const prismLanguage = prism?.languages["html"];

	if (!prism || !prismLanguage || !str) return <>{str}</>;

	const highlighted = prism.highlight(str, prismLanguage);
	return highlighted;
};

// Page where email info is displayed,
export const EmailForm = ({ email, handleSubmit, ...props }) => {
	// all types
	const [allSigns, setAllSigns] = useState([]);
	const [types, setTypes] = useState([]);
	const [currentEditorSign, setCurrentEditorSign] = useState(null);
	const theme = useTheme();
	const [openTutorial, setOpenTutorial] = useState(false);
	const { t } = useTranslation();

	// validation of inserted data
	const validate = (fieldValues = values) => {
		const temp: any = { ...errors };

		const type = fieldValues.type;

		// subject field cannot be empty
		temp.subject = fieldValues.subject ? "" : t("VALIDATION.SUBJECT_REQUIRED");
		// recipient field cannot be empty
		temp.recipient = fieldValues.recipient ? "" : t("VALIDATION.RECIPIENT_REQUIRED");
		// sender field cannot be empty
		temp.sender = fieldValues.sender ? "" : t("VALIDATION.SENDER_REQUIRED");
		// body field cannot be empty
		temp.body = fieldValues.body ? "" : t("VALIDATION.BODY_REQUIRED");

		if (type === 1 && fieldValues.sign.length !== 0) {
			// legitimate email cannot have signs
			temp.sign = t("VALIDATION.LEGITIMATE_SIGNS");
		} else if (type !== 1) {
			// phishing email should have at least one sigh
			temp.sign = fieldValues.sign.length !== 0 ? "" : t("VALIDATION.PHISHING_SIGNS");
		} else {
			temp.sign = "";
		}

		if (!Date.parse(fieldValues.date)) {
			// if date is in bad format set error
			temp.date = t("VALIDATION.DATE_FORMAT");
		} else {
			temp.date = "";
		}

		setErrors({
			...temp,
		});

		// return true if no errors has been set, otherwise false
		return Object.values(temp).every((x) => x === "");
	};

	const { values, setValues, errors, setErrors, handleInputChange } = useForm(email); // function handling values changing and changing errors

	useEffect(() => {
		setValues({
			...email,
			sign: email?.sign?.map((s) => s.id),
			type: email?.type?.id,
		});
	}, [email, setValues]);

	// on page mount fetch email and
	// statistics of the current email and also all types and signs
	useEffect(() => {
		fetchTypes().then((res) =>
			setTypes(
				res?.map(
					(res: Type) =>
						({
							id: res.id,
							type: t(res.type),
						} as Type),
				),
			),
		);
		fetchSigns().then((res) => {
			setAllSigns(
				res?.map(
					(res: Sign) =>
						({
							id: res.id,
							text: t(res.text),
						} as Sign),
				),
			);
			setCurrentEditorSign(res[0]?.id);
		});
	}, [setTypes, setAllSigns, setCurrentEditorSign, t]);

	// handler for submitting email
	const formSubmitted = (e) => {
		e.preventDefault();

		if (validate()) {
			handleSubmit(values);
		} else {
			const form = document.getElementById("form");

			const offset = 100;
			const elementPosition = form.getBoundingClientRect().top;
			const offsetPosition = elementPosition + window.pageYOffset - offset;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
			});
		}
	};

	const editHighlight = (operation: "add" | "remove") => {
		if (!currentEditorSign) {
			return;
		}

		let selectedText = "";
		const selectedSignClass = SIGN_CLASS(currentEditorSign);

		// window.getSelection
		if (window.getSelection()) {
			selectedText = window.getSelection().toString();
		}

		// document.getSelection
		if (document.getSelection()) {
			selectedText = document.getSelection().toString();
		}

		if (selectedText.length) {
			let bodyText = values.body;

			// Remove any currently applied signs
			allSigns.forEach((sign) => {
				const stringToReplace = `<span class="${SIGN_CLASS(sign.id)}">${selectedText}</span>`;

				bodyText = bodyText.replace(stringToReplace, selectedText);
			});

			if (operation === "add") {
				bodyText = bodyText.replace(
					selectedText,
					`<span class="${selectedSignClass}">${selectedText}</span>`,
				);
			}

			handleInputChange({ target: { name: "body", value: bodyText } });
		} else return;
	};

	return (
		<Box>
			{email && (
				<Form onSubmit={formSubmitted} id="form">
					<Typography variant="h4" mb={3}>
						{t("EMAILS.DATA")}
					</Typography>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							{/* InputField field for subject of email */}
							<InputField
								name="subject"
								label={t("EMAILS.SUBJECT")}
								value={values.subject}
								onChange={handleInputChange}
								error={errors.subject}
							/>
						</Grid>

						<Grid item xs={12} md={6}>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DateTimePicker
									ampm={false}
									label={t("EMAILS.SENT_AT")}
									inputFormat="dd.MM.yyyy HH:mm"
									value={values.date}
									onChange={(value) => setValues({ ...values, date: value })}
									renderInput={(params) => <TextField {...params} />}
								/>
							</LocalizationProvider>
						</Grid>

						<Grid item xs={12} md={6}>
							{/* InputField field for sender of email */}
							<InputField
								label={t("EMAILS.SENDER")}
								name="sender"
								value={values.sender}
								onChange={handleInputChange}
								error={errors.sender}
							/>
						</Grid>

						<Grid item xs={12} md={6}>
							{/* InputField field for recipient of email */}
							<InputField
								label={t("EMAILS.RECIPIENT")}
								name="recipient"
								value={values.recipient}
								onChange={handleInputChange}
								error={errors.recipient}
							/>
						</Grid>

						<Grid item xs={12} md={6}>
							{/* InputField field for Cc of email */}
							<InputField
								label={t("EMAILS.CC")}
								name="cc"
								value={values.cc}
								onChange={handleInputChange}
								error={errors.cc}
							/>
						</Grid>

						<Grid item xs={12} md={6}>
							<InputField
								label={t("EMAILS.REPLY_TO")}
								name="reply_to"
								value={values.reply_to}
								onChange={handleInputChange}
								error={errors.reply_to}
							/>
						</Grid>

						<Grid item xs={12} md={6}>
							{/* SelectField field for selecting type of email */}
							<SelectField
								name="type"
								label={t("TYPES.ONE")}
								value={values.type}
								onChange={handleInputChange}
								options={types}
								error={errors.type}
							/>
						</Grid>

						<Grid item xs={12} md={6}>
							{/* SelectField field for multi selecting signs of emails */}
							<SelectField
								name="sign"
								label={t("SIGNS.TITLE")}
								value={values.sign}
								onChange={handleInputChange}
								options={allSigns}
								multiple={true}
								error={errors.sign}
							/>
						</Grid>
					</Grid>

					<Typography variant="h4" my={3}>
						{t("EMAILS.EDITOR")}
					</Typography>
					<Paper
						elevation={4}
						sx={{
							display: "flex",
							flexDirection: { xs: "column", md: "row" },
							p: 2,
							mb: 2,
							width: "100%",
							alignItems: "center",
							color: "white",
							background: theme.palette.secondary.main,
						}}>
						<Box
							sx={{
								width: { xs: "100%", md: "20%" },
								m: 1,
							}}>
							{allSigns?.length && currentEditorSign && (
								<SelectField
									name="sign"
									label={t("SIGNS.TITLE")}
									value={currentEditorSign}
									onChange={(e) => setCurrentEditorSign(e.target.value)}
									options={allSigns}
								/>
							)}
						</Box>
						<Button
							type="button"
							size="large"
							variant="contained"
							color="success"
							sx={{
								width: { xs: "100%", md: "auto" },
								m: 1,
								py: 2,
								userSelect: "none",
							}}
							endIcon={<AddIcon />}
							onMouseDown={() => editHighlight("add")}>
							{t("EMAILS.ADD_SIGN_HINT")}
						</Button>
						<Button
							type="button"
							size="large"
							variant="contained"
							color="error"
							sx={{
								width: { xs: "100%", md: "auto" },
								m: 1,
								py: 2,
								userSelect: "none",
							}}
							endIcon={<RemoveIcon />}
							onMouseDown={() => editHighlight("remove")}>
							{t("EMAILS.REMOVE_SIGN_HINT")}
						</Button>
						<IconButton
							onClick={() => setOpenTutorial(true)}
							sx={{ width: { xs: "100%", md: "auto" }, ml: "auto" }}>
							<HelpIcon />
						</IconButton>
					</Paper>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<Box display="flex" flexDirection="column" height="100%">
								<Typography variant="h6" my={1}>
									{t("EMAILS.BODY")}
								</Typography>
								<Editor
									id="email-editor"
									name="body"
									value={values.body}
									onValueChange={(value) => handleInputChange({ target: { name: "body", value } })}
									highlight={(code) => syntaxHighlight(code)}
									padding={20}
									style={{
										fontFamily: '"Fira code", "Fira Mono", monospace',
										fontSize: 12,
										border: "1px solid gray",
										borderRadius: "4px",
										height: "100%",
									}}
								/>
							</Box>
						</Grid>
						<Grid item xs={12} md={6}>
							<Box display="flex" flexDirection="column" height="100%">
								<Typography variant="h6" my={1}>
									{t("EMAILS.PREVIEW")}
								</Typography>
								<Box p={2} border="1px solid gray" borderRadius="4px" height="100%" overflow="auto">
									<EmailParser
										signs={allSigns}
										email={{
											...email,
											body: values.body,
										}}
									/>
								</Box>
							</Box>
						</Grid>
					</Grid>

					{Children.map(
						props.children,
						(child) => isValidElement(child) && cloneElement(child, props),
					)}

					<Box
						sx={{
							display: "flex",
							width: "100%",
							justifyContent: { xs: "center", md: "end" },
							mt: 2,
						}}>
						<Button
							type="submit"
							size="large"
							variant="contained"
							sx={{ width: { xs: "100%", md: "auto" } }}>
							{t("BUTTON.SAVE")}
						</Button>
					</Box>
				</Form>
			)}

			<Dialog
				open={openTutorial}
				onClose={() => {
					setOpenTutorial(false);
				}}>
				<DialogTitle>
					<Box display="flex" justifyContent="space-between" alignItems="center">
						<>{t("EDITOR.TUTORIAL.TITLE")}</>
						<IconButton
							onClick={() => {
								setOpenTutorial(false);
							}}>
							<CloseIcon />
						</IconButton>
					</Box>
				</DialogTitle>
				<DialogContent>
					<ImageCarousel
						images={[
							{
								label: t("EDITOR.TUTORIAL.STEP_1"),
								image: step1,
							},
							{
								label: t("EDITOR.TUTORIAL.STEP_2"),
								image: step2,
							},
							{
								label: t("EDITOR.TUTORIAL.STEP_3"),
								image: step3,
							},
							{
								label: t("EDITOR.TUTORIAL.STEP_4"),
								image: step4,
							},
							{
								label: t("EDITOR.TUTORIAL.STEP_5"),
								image: step5,
							},
						]}
					/>
				</DialogContent>
			</Dialog>
		</Box>
	);
};
