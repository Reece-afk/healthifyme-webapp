function Login() {
  return (
    <div>
      <h2>Login</h2>
      <form>
        <input type="email" placeholder="E-Mail" /> <br />
        <input type="password" placeholder="Passwort" /> <br />
        <button type="submit">Einloggen</button>
      </form>
      <p>
        Noch kein Konto? <a href="/register">Hier registrieren!</a>
      </p>
    </div>
  );
}

export default Login;
