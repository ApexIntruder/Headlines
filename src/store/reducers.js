import { combineReducers } from 'redux';
import HeadlineReducer from './modules/headlines/reducer';

import storage from '@react-native-async-storage/async-storage';

const appReducer = combineReducers({
    HeadlineReducer,
});

const rootReducer = (state, action) => {
    if (action.type === 'RESET') {
        Object.keys(state).forEach(key => {
            storage.removeItem(`persist:${key}`);
        });
        state = undefined
    }
    return appReducer(state, action);
};

export default rootReducer;
