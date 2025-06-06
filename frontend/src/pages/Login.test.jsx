import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Login from "./Login";
import { loginStart } from "../redux/authSlice";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

const mockStore = configureStore([]);

jest.mock("../redux/authSlice", () => ({
  ...jest.requireActual("../redux/authSlice"),
  loginStart: jest.fn((credentials) => ({
    type: "auth/loginStart",
    payload: credentials,
  })),
}));

describe("Login-Komponente", () => {
  it("dispatcht loginStart mit E-Mail und Passwort", () => {
    const store = mockStore({
      auth: { user: null, loading: false, error: null },
    });
    store.dispatch = jest.fn();

    const { getByLabelText, getByRole } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    fireEvent.change(getByLabelText(/e-mail/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByLabelText(/passwort/i), {
      target: { value: "geheim" },
    });

    fireEvent.click(getByRole("button", { name: /einloggen/i }));

    expect(store.dispatch).toHaveBeenCalledWith(
      loginStart({ email: "test@example.com", password: "geheim" })
    );
  });
});
