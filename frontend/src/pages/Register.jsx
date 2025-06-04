function Register() {
  return (
    <div>
      <h2>Registrieren</h2>
      <form>
        <input type="email" placeholder="E-Mail" /> <br />
        <input type="password" placeholder="Passwort" /> <br />
        <input type="password" placeholder="Passwort wiederholen" /> <br />
        <button type="submit">Registrieren</button>
      </form>
    </div>
  );
}

export default Register;
