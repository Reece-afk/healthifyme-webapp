import { useEffect } from "react";

function AboutUs() {
  useEffect(() => {
    document.title = "HealthifyMe – Über Uns";
  }, []);

  return <p>About Us Seite</p>;
}

export default AboutUs;
