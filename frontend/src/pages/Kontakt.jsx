import { useEffect } from "react";

function Kontakt() {
  useEffect(() => {
    document.title = "HealthifyMe – Kontakt";
  }, []);

  return (
    <main>
      <h1>Kontakt:</h1>
      <form aria-label="Kontaktformular">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            aria-required="true"
            placeholder="Dein Name"
          />
        </div>

        <div>
          <label htmlFor="email">E-Mail:</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            aria-required="true"
            placeholder="deine@email.de"
          />
        </div>

        <div>
          <label htmlFor="message">Nachricht:</label>
          <textarea
            id="message"
            name="message"
            required
            aria-required="true"
            placeholder="Deine Nachricht..."
            rows="5"
          />
        </div>

        <button type="submit">Absenden</button>
      </form>
    </main>
  );
}

export default Kontakt;
