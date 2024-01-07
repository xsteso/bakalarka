import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import { useTranslation } from "react-i18next";
import step1 from "../../assets/tutorial/step1.png";
import step2 from "../../assets/tutorial/step2.png";
import step3 from "../../assets/tutorial/step3.png";
import step4 from "../../assets/tutorial/step4.png";
import step5 from "../../assets/tutorial/step5.png";
import step6 from "../../assets/tutorial/step6.png";
import { ImageCarousel } from "../../components/ImageCarousel";

// Page with instructions how to play the game
export const InstructionsDialog = ({ open, close }: { open: boolean; close: () => void }) => {
	const { t } = useTranslation();

	return (
		<Dialog open={open} onClose={close}>
			<DialogTitle>
				<Box display="flex" justifyContent="space-between" alignItems="center">
					<>{t("INTRO.HOW_TO")}</>
					<IconButton onClick={close}>
						<CloseIcon />
					</IconButton>
				</Box>
			</DialogTitle>
			<DialogContent>
				<ImageCarousel
					images={[
						{
							label: t("INTRO.TUTORIAL.STEP_1"),
							image: step1,
							htmlFormatting: true,
						},
						{
							label: t("INTRO.TUTORIAL.STEP_2"),
							image: step2,
							htmlFormatting: true,
						},
						{
							label: t("INTRO.TUTORIAL.STEP_3"),
							image: step3,
							htmlFormatting: true,
						},
						{
							label: t("INTRO.TUTORIAL.STEP_4"),
							image: step4,
							htmlFormatting: true,
						},
						{
							label: t("INTRO.TUTORIAL.STEP_5"),
							image: step5,
							htmlFormatting: true,
						},
						{
							label: t("INTRO.TUTORIAL.STEP_6"),
							image: step6,
							htmlFormatting: true,
						},
					]}
				/>
			</DialogContent>
		</Dialog>
	);
};
