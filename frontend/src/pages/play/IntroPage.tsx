import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CustomizedPaper } from "../../components/CustomizedPaper";
import { PageWrapper } from "../../components/PageWrapper";
import { routes } from "../../routes/routes";
import { InstructionsDialog } from "./InstructionsDialog";

// Intro Page containing play button and how to play button
export const IntroPage = () => {
	const { t } = useTranslation();
	const [openTutorial, setOpenTutorial] = useState(false);

	return (
		<PageWrapper>
			<Box
				sx={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}>
				<CustomizedPaper narrow={true}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}>
						<Typography
							component={"h4"}
							variant="h4"
							style={{ marginBottom: 5, textAlign: "center" }}>
							{t("INTRO.TITLE")}
						</Typography>

						{/* Play button, redirects to page where user has to enter username */}
						<Button
							size="large"
							style={{
								width: "160px",
								marginTop: 30,
								marginBottom: 30,
							}}
							variant="contained"
							color="primary"
							component={Link}
							to={routes.start}>
							{t("INTRO.PLAY")}
						</Button>
						{/* How to play button, redirects to page containing instructions for playing */}
						<Button
							size="large"
							style={{
								width: "160px",
							}}
							variant="contained"
							color="secondary"
							onClick={() => setOpenTutorial(true)}>
							{t("INTRO.HOW_TO")}
						</Button>
					</Box>
				</CustomizedPaper>
			</Box>
			<InstructionsDialog open={openTutorial} close={() => setOpenTutorial(false)} />
		</PageWrapper>
	);
};
