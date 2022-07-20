import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { applyMiddleware, createStore } from "redux";
import axiosMiddleware from "redux-axios-middleware";
import { createLogger } from 'redux-logger';
import { persistReducer, persistStore } from "redux-persist";
import createSagaMiddleware from 'redux-saga';
import { BASE_URL } from "../config";
import reducers from "./reducers";
import rootSaga from './sagas';

const axiosClient = axios.create({
    baseURL: BASE_URL,
    responseType: "json",
});

let store = null;
let persistor = null;

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    blacklist: [],
    timeout: null,
};

const createLog = createLogger({
    collapsed: true,
    duration: false,
    timestamp: false,
    predicate: () => __DEV__,
    stateTransformer: state => state,
    actionTransformer: action => action && action.payload ? { ...action, payload: action.payload } : action,
});

const persistedReducer = persistReducer(persistConfig, reducers);
const sagaMiddleware = createSagaMiddleware();

export const configureStore = () => {
    store = createStore(
        persistedReducer,
        applyMiddleware(
            sagaMiddleware,
            createLog,
            axiosMiddleware(axiosClient)
        )
    );
    sagaMiddleware.run(rootSaga);
    persistor = persistStore(store);
    return { store, persistor };
};

export const getStore = () => store;

export const getPersistor = () => persistor;

export const dispatch = (...args) => store.dispatch(...args);

export default { dispatch, getStore, configureStore };
