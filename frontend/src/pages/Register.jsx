import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerStart } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    document.title = "HealthifyMe – Registrierung";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      alert("Passwörter müssen übereinstimmen!");
      return;
    }
    dispatch(registerStart({ email, password }));
  };

  return (
    <div>
      <h2>Registrieren</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <br />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        <br />
        <input
          type="password"
          placeholder="Passwort wiederholen"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />{" "}
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Bitte warten..." : "Registrieren"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Register;
