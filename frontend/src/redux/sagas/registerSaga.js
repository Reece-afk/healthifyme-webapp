import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../services/api";
import { loginSuccess, loginFailure } from "../authSlice";

function* registerSaga(action) {
  try {
    const response = yield call(api.post, "/users/register", action.payload);
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
  yield takeLatest("/auth/registerStart", registerSaga);
}
