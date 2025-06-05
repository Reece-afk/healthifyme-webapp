import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../services/api";
import { loginSuccess, loginFailure } from "../authSlice";

function* loginSaga(action) {
  try {
    const response = yield call(api.post, "/users/login", action.payload);
    yield put(loginSuccess(response.data));
  } catch (error) {
    yield put(
      loginFailure(error.response?.data?.message || "Login fehlgeschlagen")
    );
  }
}

export default function* watchLoginSaga() {
  yield takeLatest("auth/loginStart", loginSaga);
}
