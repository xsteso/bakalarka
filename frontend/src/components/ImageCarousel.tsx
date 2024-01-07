import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import dompurify from "dompurify";
import * as React from "react";
import { useTranslation } from "react-i18next";
import SwipeableViews from "react-swipeable-views";
import { ImageCarouselObj } from "../api/models";

export const ImageCarousel = ({ images }: { images: Array<ImageCarouselObj> }) => {
	const theme = useTheme();
	const [activeStep, setActiveStep] = React.useState(0);
	const maxSteps = images.length;
	const { t } = useTranslation();

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleStepChange = (step: number) => {
		setActiveStep(step);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<Paper
				elevation={0}
				sx={{
					display: "flex",
					minHeight: "3rem",
				}}>
				{images[activeStep].htmlFormatting ? (
					<div
						dangerouslySetInnerHTML={{
							__html: dompurify.sanitize(images[activeStep].label, {
								FORCE_BODY: true,
							}),
						}}></div>
				) : (
					<Typography>{images[activeStep].label} </Typography>
				)}
			</Paper>
			<SwipeableViews
				axis={theme.direction === "rtl" ? "x-reverse" : "x"}
				index={activeStep}
				onChangeIndex={handleStepChange}
				enableMouseEvents>
				{images.map((step, index) => (
					<div key={step.label}>
						{Math.abs(activeStep - index) <= 2 ? (
							<Box
								component="img"
								sx={{ width: "100%", border: "2px solid #cfcfcf", my: 2 }}
								src={step.image}
								alt={step.label}
							/>
						) : null}
					</div>
				))}
			</SwipeableViews>
			<MobileStepper
				steps={maxSteps}
				position="static"
				activeStep={activeStep}
				sx={{ background: "white" }}
				nextButton={
					<Button
						size="small"
						variant="contained"
						onClick={handleNext}
						disabled={activeStep === maxSteps - 1}>
						<Box display={{ xs: "none", md: "flex" }}>{t("BUTTON.NEXT")}</Box>

						{theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
					</Button>
				}
				backButton={
					<Button size="small" variant="contained" onClick={handleBack} disabled={activeStep === 0}>
						{theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}

						<Box display={{ xs: "none", md: "flex" }}>{t("BUTTON.BACK")}</Box>
					</Button>
				}
			/>
		</Box>
	);
};
