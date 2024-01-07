import axios from "axios";
import { Setting } from "../api/api";

// helper functions for fetching and updating settings

axios.defaults.withCredentials = true;

export const fetchSettings = async (): Promise<Array<Setting>> =>
	axios.get("/api/settings/").then((res) => res.data as Array<Setting>);

export const updateSetting = (settingID, data): Promise<any> =>
	axios.patch("/api/settings/" + settingID + "/", data);
