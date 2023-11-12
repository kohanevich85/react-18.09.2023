import { all } from 'redux-saga/effects';
import {waiterWatch} from "../features/Waiters/store/sagas";

export function* rootSaga() {
  yield all([
    waiterWatch(),
  ]);
}
