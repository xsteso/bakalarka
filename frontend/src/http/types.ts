import axios from "axios";
import { Type } from "../api/api";

// helper functions for fetching, updating and deleting types

axios.defaults.withCredentials = true;

export const fetchTypes = async (): Promise<Array<Type>> =>
	axios.get("/api/types/").then((res) => res.data as Array<Type>);

export const deleteType = async (type_id): Promise<any> =>
	axios.delete("/api/types/" + type_id + "/");

export const postType = async (type): Promise<any> => axios.post("/api/types/", type);
