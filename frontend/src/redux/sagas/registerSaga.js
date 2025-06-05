import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../services/api";
import { loginSuccess, loginFailure, registerStart } from "../authSlice";
import Cookie from "js-cookie";

function* registerSaga(action) {
  try {
    const response = yield call(api.post, "/users/register", action.payload);
    Cookie.set("token", response.data.token, { expires: 1 });
    yield put(loginSuccess(response.data));
  } catch (error) {
    yield put(
      loginFailure(
        error.response?.data?.message || "Registrierung fehlgeschlagen"
      )
    );
  }
}

export default function* watchRegisterSaga() {
  yield takeLatest(registerStart, registerSaga);
}
