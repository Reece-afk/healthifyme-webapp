import { all } from "redux-saga/effects";
import watchLoginSaga from "./loginSaga";
import watchRegisterSaga from "./registerSaga";

export default function* rootSaga() {
  yield all([watchLoginSaga(), watchRegisterSaga()]);
}
