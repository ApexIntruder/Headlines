import { GET_HEADLINES_FAILED, GET_HEADLINES_REQ, GET_HEADLINES_RES } from "./types";

export const getHeadlinesRequest = (country, category, q) => ({
    type: GET_HEADLINES_REQ,
    country,
    category,
    q
});

export const getHeadlinesSucess = data => ({
    type: GET_HEADLINES_RES,
    data,
});

export const getHeadlinesFailed = (data) => ({
    type: GET_HEADLINES_FAILED,
    data
});

