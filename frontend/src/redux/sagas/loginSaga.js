import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../services/api";
import { loginSuccess, loginFailure, loginStart } from "../authSlice";
import Cookies from "js-cookie";

function* loginSaga(action) {
  try {
    const response = yield call(api.post, "/users/login", action.payload);
    Cookies.set("token", response.data.token, { expires: 1 });
    yield put(loginSuccess(response.data));
  } catch (error) {
    yield put(
      loginFailure(error.response?.data?.message || "Login fehlgeschlagen")
    );
  }
}

export default function* watchLoginSaga() {
  yield takeLatest(loginStart, loginSaga);
}
