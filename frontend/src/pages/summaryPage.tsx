import DataUsageIcon from "@mui/icons-material/DataUsage";
import PersonIcon from "@mui/icons-material/Person";
import TodayIcon from "@mui/icons-material/Today";
import UpdateIcon from "@mui/icons-material/Update";
import { Button, Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { format, parse } from "date-fns";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { GameRunSummary } from "../api/models";
import { CustomizedPaper } from "../components/CustomizedPaper";
import { LoadingNoItemsHandler } from "../components/LoadingNoItemsHandler";
import { PageWrapper } from "../components/PageWrapper";
import { StatisticsPaper } from "../components/StatisticsPaper";
import { StatisticsSummary } from "../components/StatisticsSummary";
import { GAMERUN_ID } from "../helpers/consts";
import { fullDateFormat, getEllapsedTime } from "../helpers/utils";
import { fetchGamerunSummary } from "../http/gameruns";
import { routes } from "../routes/routes";

// Page with summary of current player's gamerun
export default function SummaryPage({ ...props }) {
	// emails of current gamerun also containing statistics
	const [gamerunSummary, setGamerunSummary] = useState(null);
	const [error, setError] = useState(false);
	const history = useHistory();
	const query_id = new URLSearchParams(props.location.search).get(GAMERUN_ID);
	const { t } = useTranslation();

	const countCorrectAnswers = (gamerunSummary: GameRunSummary) => {
		return gamerunSummary?.statistics?.filter((statistic) => statistic.answer.correctness === true)
			.length;
	};

	const countDuration = (gamerunSummary: GameRunSummary) => {
		if (!gamerunSummary.gamerun.start_time || !gamerunSummary.gamerun.end_time) {
			return "-";
		}

		return (
			getEllapsedTime(
				parse(gamerunSummary.gamerun.start_time, fullDateFormat, new Date()),
				parse(gamerunSummary.gamerun.end_time, fullDateFormat, new Date()),
				false,
				true,
			) || "-"
		);
	};

	useEffect(() => {
		const gamerun_id = sessionStorage.getItem(GAMERUN_ID);

		if (!query_id && !gamerun_id) {
			history.push(routes.home);
			return;
		}

		if (!query_id && gamerun_id) {
			history.push(`${routes.summary}?${GAMERUN_ID}=${gamerun_id}`);
			return;
		}

		fetchGamerunSummary(query_id)
			.then((data: GameRunSummary) => {
				setGamerunSummary(data);
			})
			.catch((error: Error) => {
				console.warn(error.message);
				setError(true);
			});
	}, [history, query_id, t]);

	// Play again button, located on top and bottom of page, redirects to username page
	// const PlayAgainButton = () => (
	//   <Box
	//     sx={{
	//       display: "flex",
	//       width: "100%",
	//       justifyContent: "center",
	//       mt: 4,
	//     }}
	//   >
	//     <Button
	//       sx={{ marginX: "auto" }}
	//       variant="contained"
	//       component={Link}
	//       to={routes.start}
	//     >
	//       {t("BUTTON.PLAY_AGAIN")}
	//     </Button>
	//   </Box>
	// );

	// Play again button, located on top and bottom of page, redirects to username page
	const FillFormInfo = () => (
		<>
			<Box
				sx={{
					display: "flex",
					width: "100%",
					justifyContent: "center",
					mt: 4,
				}}>
				{t("PLAY.RESULT_DESC")}&nbsp;
			</Box>
			<Box
				sx={{
					display: "flex",
					width: "100%",
					justifyContent: "center",
					mt: 2,
				}}>
				<Button variant="contained" href="https://muni.cz/go/phishingform" target="_blank">
					{t("BUTTON.QUESTIONNAIRE")}
				</Button>
			</Box>
		</>
	);

	return (
		<PageWrapper fullWidth={false} fullHeight={false}>
			<Box
				sx={{
					width: "100%",
					display: "flex",
					justifyContent: "center",
					flexDirection: "column",
				}}>
				<CustomizedPaper>
					{gamerunSummary ? (
						<>
							<Box width="100%">
								<Typography
									textAlign="center"
									component={"h5"}
									variant="h5"
									style={{ width: "100%" }}
									sx={{ mb: 3 }}>
									{t("PLAY.RESULT")}
								</Typography>
								<Box
									sx={{
										display: "flex",
										flexDirection: { xs: "column", md: "row" },
										width: "100%",
									}}>
									<Box sx={{ width: "50%" }}>
										<StatisticsPaper
											Icon={DataUsageIcon}
											identifier={t("PLAY.RESULT_CORRECT")}
											value={`${countCorrectAnswers(gamerunSummary)} / ${
												gamerunSummary?.statistics.length
											}`}
										/>
									</Box>
									<Box sx={{ width: "50%" }}>
										<StatisticsPaper
											Icon={UpdateIcon}
											identifier={t("PLAY.RESULT_DURATION")}
											value={countDuration(gamerunSummary)}
										/>
									</Box>
								</Box>
								<Box
									sx={{
										display: "flex",
										flexDirection: { xs: "column", md: "row" },
										width: "100%",
									}}>
									<Box sx={{ width: "50%" }}>
										<StatisticsPaper
											Icon={PersonIcon}
											identifier={t("GAMERUNS.PLAYER_NAME")}
											value={gamerunSummary.gamerun?.player_name || "-"}
										/>
									</Box>
									<Box sx={{ width: "50%" }}>
										<StatisticsPaper
											Icon={TodayIcon}
											identifier={t("GAMERUNS.DATE")}
											value={format(
												parse(gamerunSummary.gamerun.end_time, fullDateFormat, new Date()),
												"dd.MM.yyyy kk:mm",
											)}
										/>
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

							{
								// map emails into email window and statistics
								gamerunSummary?.statistics?.map((statistics, index) => (
									<StatisticsSummary key={index} statistics={statistics} />
								))
							}

							<Divider
								variant="fullWidth"
								sx={{
									marginBottom: 3,
									marginTop: 3,
								}}
							/>

							{/* Play again button currently disabled */}
							{/* <PlayAgainButton /> */}
							<FillFormInfo />
						</>
					) : (
						<LoadingNoItemsHandler loading={!gamerunSummary && !error} error={error} />
					)}
				</CustomizedPaper>
			</Box>
		</PageWrapper>
	);
}
