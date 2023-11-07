import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  getListActionError,
  getListActionRequest,
  getListActionSuccess,
  removeItemAction,
  removeItemRequestType
} from "./reducer";
import {WaitersApi} from "../api/server";
import {DELETE} from "../../../api/FetchClient";
import {WaiterI} from "../type";
import {PayloadAction} from "@reduxjs/toolkit";

function* getWaiterListWorker() {
  try {
    const waiterList: WaiterI[] = yield call([WaitersApi, 'getList']) // { type: 'CALL', payload: [WaitersApi, 'getList'] }

    yield put(getListActionSuccess(waiterList)) // { type: 'PUT', payload: getListActionSuccess(waiterList) }
  } catch (error: any) {
    yield put(getListActionError(error.message))
  }
}

interface RemoveWaiterPayload {
  id: number
  resolve: () => any
  reject: () => any
}

function* removeWaiterWorker(action: PayloadAction<RemoveWaiterPayload>) {
  try {
    yield call([WaitersApi, DELETE], action.payload.id)
    yield put(removeItemAction(action.payload.id))

    action.payload.resolve()
  } catch (error: any) {
    action.payload.reject()
  }
}

export function* waiterWatch() {
  yield all([
    takeEvery(getListActionRequest, getWaiterListWorker),
    takeEvery(removeItemRequestType, removeWaiterWorker),
  ]);
}
