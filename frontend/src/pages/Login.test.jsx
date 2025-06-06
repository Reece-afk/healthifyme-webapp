// src/pages/Login.test.jsx
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Login from "./Login";

jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

const mockStore = configureStore([]);

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

    expect(store.dispatch).toHaveBeenCalledWith({
      type: "auth/loginStart",
      payload: { email: "test@example.com", password: "geheim" },
    });
  });
});
