import { put, takeEvery } from "redux-saga/effects";
import { GET_HEADLINES_REQ } from "./types";
import { Request } from '../../../services'
import ApiConstant from '../../../utils/apiContant'
import { getHeadlinesFailed, getHeadlinesSucess } from "./actions";
import { API_KEY } from "../../../config";

function* onHeadlinesRequested({ country, category, q }) {
    try {
        console.log('category', category);
        const response = yield Request.get(`${ApiConstant.TopHeadlines}?country=${country}&category=${category}&q=${q}&apiKey=${API_KEY}`);
        if (response.status == 'ok') {
            yield put(getHeadlinesSucess(response.articles));
        } else {
            yield put(getHeadlinesFailed(response.message));
        }
    } catch (error) {
        yield put(profileFailed(error.message));
    }
}

function* sagaHeadlines() {
    yield takeEvery(GET_HEADLINES_REQ, onHeadlinesRequested);
}

export default sagaHeadlines;
