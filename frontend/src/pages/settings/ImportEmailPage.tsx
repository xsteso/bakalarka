import DeleteIcon from "@mui/icons-material/Delete";
import { Grid, IconButton, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Sign, Type } from "../../api/api";
import { ErrorBox } from "../../components/form/ErrorBox";
import { SelectField } from "../../components/form/SelectField";
import { importEmail } from "../../http/emails";
import { fetchSigns } from "../../http/signs";
import { fetchTypes } from "../../http/types";

// Page for importing new emails
export const ImportEmailPage = () => {
	const [chosenFiles, setChosenFiles] = useState([]);
	const [selectedType, setSelectedType] = useState(1);
	const [selectedSigns, setSelectedSigns] = useState([]);
	// all existing signs
	const [signs, setSigns] = useState([]);
	// all existing types
	const [types, setTypes] = useState([]);
	// error msg
	const [error, setError] = useState("");

	const { t } = useTranslation();

	useEffect(() => {
		fetchTypes().then((data) =>
			setTypes(
				data?.map(
					(data: Type) =>
						({
							id: data.id,
							type: t(data.type),
						} as Type),
				),
			),
		);
		fetchSigns().then((data) =>
			setSigns(
				data?.map(
					(data: Sign) =>
						({
							id: data.id,
							text: t(data.text),
						} as Sign),
				),
			),
		);
	}, [t]);

	// validate type and signs
	const validate = () => {
		if (selectedType === 1 && selectedSigns.length > 0) {
			setError("Legitimate type cannot have signs!");
			return false;
		} else if (selectedType > 1 && selectedSigns.length === 0) {
			setError("Phishing e-mail has to own at least one sign!");
			return false;
		}
		return true;
	};

	const handleImport = () => {
		if (!validate()) return;

		// open each file and call API with content of file
		chosenFiles.forEach((chFile) => {
			const reader = new FileReader();
			reader.onload = async (e) => {
				const text = e.target.result;

				await importEmail({
					text: text,
					type: selectedType,
					sign: selectedSigns,
				});
			};
			reader.readAsText(chFile);
		});
		setChosenFiles([]);
	};

	// handler for file choosing
	const chooseFiles = (e) => {
		e.preventDefault();
		const selectedFiles = Array.from(e.target.files);

		// filter duplicated files
		const nonDuplicated = selectedFiles.filter((file) => chosenFiles.indexOf(file) === -1);
		setChosenFiles([...chosenFiles, ...nonDuplicated]);
	};

	// handler for removing selected file from list
	const handleCancelFile = (file) => {
		const nonRemovedFiles = chosenFiles.filter((filename) => filename !== file);

		setChosenFiles(nonRemovedFiles);
	};

	const handleTypeChange = (e) => {
		const type_id = e.target.value;

		setSelectedType(type_id);
	};

	const handleSignChange = (e) => {
		const signs_ids = e.target.value;

		setSelectedSigns(signs_ids);
	};

	return (
		<>
			<Box sx={{ position: "relative" }}>
				<ErrorBox severity="error" error={error} />
			</Box>
			<Box
				sx={{
					display: "flex",
					p: 5,
					flexDirection: "column",
					width: "100%",
				}}>
				<Box
					sx={{
						display: "flex",
						width: "100%",
						"& .MuiFormControl-root": {
							margin: "10px",
						},
					}}>
					<SelectField
						name="type"
						label={t("TYPES.ONE")}
						value={selectedType}
						onChange={handleTypeChange}
						options={types}
					/>
					<SelectField
						name="sign"
						label={t("SIGNS.TITLE")}
						value={selectedSigns}
						onChange={handleSignChange}
						options={signs}
						multiple={true}
					/>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "flex-end",
						width: "100%",
						mt: 3,
						"& .MuiButton-root": {
							margin: "10px",
						},
					}}>
					<Button variant="contained" component="label" sx={{ alignSelf: "center" }}>
						{t("BUTTON.ADD_FILES")}
						<input type="file" hidden multiple accept=".txt" onChange={chooseFiles} />
					</Button>
					<Button
						variant="contained"
						component="label"
						onClick={handleImport}
						sx={{ alignSelf: "center" }}
						disabled={chosenFiles.length < 1}>
						{`${t("BUTTON.IMPORT")} ${chosenFiles?.length || ""}`}
					</Button>
				</Box>
				{chosenFiles.length > 0 && (
					<Grid container spacing={2} mt={5}>
						{chosenFiles.map((file, index) => (
							<Grid key={index} item xs={12} md={6} lg={4}>
								<Paper sx={{ p: 2 }} elevation={4}>
									<Box
										sx={{
											width: "100%",
											display: "flex",
											justifyContent: "space-between",
										}}>
										<Typography textAlign="center" variant="h6" component="p">
											{file.name}
										</Typography>
										<IconButton
											onClick={() => handleCancelFile(file)}
											color="primary"
											aria-label="upload email"
											component="span">
											<DeleteIcon />
										</IconButton>
									</Box>
								</Paper>
							</Grid>
						))}
					</Grid>
				)}
			</Box>
		</>
	);
};
