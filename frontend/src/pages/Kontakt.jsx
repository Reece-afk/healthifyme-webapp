import { useEffect } from "react";

function Kontakt() {
  useEffect(() => {
    document.title = "HealthifyMe – Kontakt";
  }, []);

  return <p>Kontakt Seite</p>;
}

export default Kontakt;
