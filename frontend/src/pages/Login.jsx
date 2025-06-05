import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart } from "../redux/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    document.title = "HealthifyMe – Login";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginStart({ email, password }));
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-Mail:</label>
        <input
          type="email"
          id="email"
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <br />
        <label htmlFor="password">Passwort:</label>
        <input
          type="password"
          id="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Bitte warten..." : "Einloggen"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <p>
        Noch kein Konto? <a href="/register">Hier registrieren!</a>
      </p>
    </div>
  );
}

export default Login;
