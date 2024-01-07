import axios from "axios";
import { Email } from "../api/api";

// helper functions for fetching, updating and deleting emails
axios.defaults.withCredentials = true;

/**
 * @deprecated Use fetchEmailsWithStatistics method instead to access all of the data
 */
export const fetchEmails = async (): Promise<Array<Email>> =>
	axios.get("/api/emails/").then((res) => res.data as Array<Email>);

/**
 * @deprecated Use fetchEmailWithStatisticsByID method instead to access all of the data
 */
export const fetchEmailByID = async (emailID): Promise<Email> =>
	axios.get("/api/emails/" + emailID + "/").then((res) => res.data);

export const fetchEmailsWithStatistics = async (): Promise<Array<Email>> =>
	axios.get("/api/emails_with_statistics/").then((res) => res.data as Array<Email>);

export const fetchEmailWithStatisticsByID = async (emailID): Promise<Email> =>
	axios.get("/api/emails_with_statistics/" + emailID + "/").then((res) => res.data);

// Fetches emails from gamerun with given gamerunID
export const fetchEmailsByGamerunID = async (gamerunID): Promise<Array<Email>> =>
	axios
		.get("/api/gameruns/" + gamerunID + "/emails/")
		.then((res) => res.data as Promise<Array<Email>>);

export const postEmail = async (email): Promise<any> => axios.post("/api/emails/", email);

export const deleteEmail = async (email_id): Promise<any> =>
	axios.delete("/api/emails/" + email_id + "/");

export const updateEmail = async (emailID, data): Promise<any> =>
	axios.put("/api/emails/" + emailID + "/", data);

export const updateEnabled = async (emailID, enabled): Promise<any> =>
	axios.put("/api/email-enabled/" + emailID + "/", { enabled });

export const importEmail = async (body): Promise<any> => axios.post("/api/emails/import/", body);
