import {
    GET_HEADLINES_REQ,
    GET_HEADLINES_RES,
    GET_HEADLINES_FAILED
} from './types';

const INITIAL_STATE = {
    headlines: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_HEADLINES_REQ:
            return {
                ...state,
            };
        case GET_HEADLINES_RES:
            return {
                ...state,
                headlines: action.data,
            };
        case GET_HEADLINES_FAILED:
            return {
                ...state,
                error: action.data
            };
        default:
            return state;
    }
};
