import axios from "axios";
import { GameRun } from "../api/api";
import { GameRunSummary, GameRunWithStatistics, NextEmail, Player } from "../api/models";

// helper functions for fetching, deleting and initializing gameruns
axios.defaults.withCredentials = true;

/**
 * @deprecated Use fetchGamerunsWithStatistics method instead to access all of the data
 */
export const fetchGameruns = async (): Promise<Array<GameRun>> =>
	axios.get("/api/gameruns/").then((res) => res.data as Array<GameRun>);

/**
 * @deprecated Use fetchGamerunWithStatisticsById method instead to access all of the data
 */
export const fetchGamerunById = async (gamerunID): Promise<GameRun> =>
	axios.get("/api/gameruns/" + gamerunID + "/").then((res) => res.data);

export const fetchGamerunsWithStatistics = async (): Promise<Array<GameRunWithStatistics>> =>
	axios
		.get("/api/gameruns_with_statistics/")
		.then((res) => res.data as Array<GameRunWithStatistics>);

export const fetchGamerunWithStatisticsByEmail = async (
	emailID,
): Promise<Array<GameRunWithStatistics>> =>
	axios
		.get("/api/gameruns_with_statistics_by_email/" + emailID + "/")
		.then((res) => res.data as Array<GameRunWithStatistics>);

export const fetchGamerunWithStatisticsById = async (gamerunID): Promise<GameRunWithStatistics> =>
	axios
		.get("/api/gameruns_with_statistics/" + gamerunID + "/")
		.then((res) => res.data as GameRunWithStatistics);

export const deleteGamerun = async (gamerunID): Promise<any> =>
	axios.delete("/api/gameruns/" + gamerunID + "/");

export const initGamerun = async (player: Player): Promise<any> =>
	axios.post("/api/gamerun/init/", player);

/** fetches emails of gamerun with statistics by id: <br/>
 *
 *    * average_correctness,
 *    * average_duration,
 *    * players_duration - answer duration of current player,
 *    * answer - answer contains player answer (true = phishing, false = legitimate) and correctness (true = player's answer is correct, otherwise false)
 */
export const fetchGamerunSummary = async (gamerunID): Promise<GameRunSummary> =>
	axios
		.get("/api/gamerun/summary/" + gamerunID + "/")
		.then((summary) => summary.data as GameRunSummary);

export const postAnswer = async (answer): Promise<any> =>
	axios.post("/api/gamerun/setAnswer/", {
		answer: answer,
	});

export const getNextEmail = async (): Promise<NextEmail> =>
	axios.get("/api/gamerun/nextEmail/").then((data) => data.data as NextEmail);
