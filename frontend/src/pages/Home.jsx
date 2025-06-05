import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../services/api";
import { useSelector } from "react-redux";

function Home() {
  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await api.get("/articles");
      setArticles(response.data);
    } catch (error) {
      setError("Fehler beim Laden der Artikel");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "HealthifyMe – Startseite";
    fetchArticles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/articles", { title, content });
      setTitle("");
      setContent("");
      fetchArticles();
    } catch (error) {
      alert("Fehler beim Erstellen des Artikels!");
    }
  };

  return (
    <main>
      <h1>Home</h1>

      <section aria-labelledby="article-section-heading">
        <h2 id="article-section-heading">Aktuelle Artikel</h2>

        {loading && <p>Lade Artikel...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {articles.slice(0, visibleCount).map((article) => (
          <article
            key={article._id}
            style={{
              border: "1px solid #ccc",
              margin: "1rem 0",
              padding: "1rem",
            }}
          >
            <h3>{article.title}</h3>
            <p>{article.content}</p>
          </article>
        ))}
        {visibleCount < articles.length && (
          <Button
            variant="contained"
            onClick={() => setVisibleCount((prev) => prev + 3)}
          >
            Mehr anzeigen
          </Button>
        )}
      </section>

      {user && (
        <section aria-labelledby="new-article-form-heading">
          <h2 id="new-article-form-heading">Neuen Artikel erstellen:</h2>
          <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
            <div>
              <label htmlFor="title">Titel:</label> <br />
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Titel"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="content">Kommentar:</label> <br />
              <textarea
                name="content"
                id="content"
                placeholder="Inhalt"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={6}
              ></textarea>
              <Button variant="contained" type="submit">
                Senden
              </Button>
            </div>
          </form>
        </section>
      )}
    </main>
  );
}

export default Home;
