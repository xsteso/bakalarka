import axios from "axios";
import { Sign } from "../api/api";

// helper functions for fetching, updating and deleting signs

axios.defaults.withCredentials = true;

export const fetchSigns = async (): Promise<Array<Sign>> =>
	axios.get("/api/signs/").then((res) => res.data as Array<Sign>);

export const deleteSign = async (sign_id): Promise<any> =>
	axios.delete("/api/signs/" + sign_id + "/");

export const postSign = async (sign): Promise<any> => axios.post("/api/signs/", sign);
