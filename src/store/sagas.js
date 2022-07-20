import { all } from 'redux-saga/effects';
import HeadlineSaga from './modules/headlines/saga';

export default function* rootSaga() {
    yield all([
        HeadlineSaga(),
    ]);
}
