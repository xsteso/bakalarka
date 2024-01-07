import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import BarChartIcon from "@mui/icons-material/BarChart";
import EmailIcon from "@mui/icons-material/Email";
import EventIcon from "@mui/icons-material/Event";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import PersonIcon from "@mui/icons-material/Person";
import TransgenderIcon from "@mui/icons-material/Transgender";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { parse } from "date-fns";
import * as React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GameRunWithStatistics } from "../../api/models";
import { StatisticsPaper } from "../../components/StatisticsPaper";
import { EmailTable } from "../../components/tables/EmailTable";
import { fullDateFormat, getEllapsedTime, getSuccessRate } from "../../helpers/utils";
import { fetchGamerunWithStatisticsById } from "../../http/gameruns";

// Page where gamerun info is displayed,
// admin can also remove emails
export const GamerunInfoPage = ({ match }) => {
	// gamerun info
	const [gamerun, setGamerun] = useState<GameRunWithStatistics>({
		id: 0,
		player_name: "",
		emails: null,
		start_time: "",
		end_time: "",
	});
	const { t } = useTranslation();

	const gamerunId = match.params.id;

	// on page mount fetch gamerun info
	useEffect(() => {
		fetchGamerunWithStatisticsById(gamerunId).then((gamerun) => {
			setGamerun(gamerun);
		});
	}, [gamerunId]);

	const getGenderIcon = (gender: string) => {
		switch (gender) {
			case "MAN":
				return MaleIcon;
			case "WOMAN":
				return FemaleIcon;
			case "OTHER":
				return TransgenderIcon;
		}
	};

	return (
		<Box p={2}>
			<Typography variant="h4" mb={3}>
				{t("GAMERUNS.INFO")}
			</Typography>
			<Grid container spacing={2} mb={3}>
				<Grid item xs={12} md={6}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Box width="100%" display="flex" justifyContent="center">
								<StatisticsPaper
									Icon={PersonIcon}
									identifier={t("GAMERUNS.PLAYER_NAME")}
									value={gamerun.player_name || "-"}
								/>
							</Box>
						</Grid>
						<Grid item xs={12}>
							<Box width="100%" display="flex" justifyContent="center">
								<StatisticsPaper
									Icon={EventIcon}
									identifier={t("GAMERUNS.PLAYER_AGE")}
									value={gamerun.player_age || "-"}
								/>
							</Box>
						</Grid>
						<Grid item xs={12}>
							<Box width="100%" display="flex" justifyContent="center">
								<StatisticsPaper
									Icon={getGenderIcon(gamerun.player_gender?.toLocaleUpperCase())}
									identifier={t("GAMERUNS.PLAYER_GENDER")}
									value={t(`GENDER.${gamerun.player_gender?.toLocaleUpperCase()}`) || "-"}
								/>
							</Box>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} md={6} spacing={2}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Box width="100%" display="flex" justifyContent="center">
								<StatisticsPaper
									Icon={BarChartIcon}
									identifier={t("GAMERUNS.CORRECTLY_ANSWERED")}
									value={`${getSuccessRate(gamerun.statistics, gamerun.emails?.length)} %` || "-"}
								/>
							</Box>
						</Grid>
						<Grid item xs={12}>
							<Box width="100%" display="flex" justifyContent="center">
								<StatisticsPaper
									Icon={EmailIcon}
									identifier={t("GAMERUNS.NUMBER_OF_EMAILS")}
									value={gamerun.emails?.length || "-"}
								/>
							</Box>
						</Grid>
						<Grid item xs={12}>
							<Box width="100%" display="flex" justifyContent="center">
								<StatisticsPaper
									Icon={AccessTimeFilledIcon}
									identifier={t("GAMERUNS.DURATION")}
									value={
										getEllapsedTime(
											parse(gamerun.start_time, fullDateFormat, new Date()),
											parse(gamerun.end_time, fullDateFormat, new Date()),
											false,
											true,
										) || "-"
									}
								/>
							</Box>
						</Grid>
					</Grid>
				</Grid>
			</Grid>

			<Typography variant="h4" mb={3}>
				{t("EMAILS.TITLE")}
			</Typography>
			{/* EmailTable of gamerun */}
			<EmailTable
				gamerunID={gamerunId}
				hideCheckbox={true}
				toolbarHidden={true}
				pagination={false}
				statistics={gamerun.statistics}
			/>
		</Box>
	);
};
