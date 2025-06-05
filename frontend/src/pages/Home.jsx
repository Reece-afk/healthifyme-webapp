import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../services/api";

function Home() {
  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchArticles();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <h2>Aktuelle Artikel</h2>
      {loading && <p>Lade Artikel...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {articles.slice(0, visibleCount).map((article) => (
        <div
          key={article._id}
          style={{
            border: "1px solid #ccc",
            margin: "1rem 0",
            padding: "1rem",
          }}
        >
          <h3>{article.title}</h3>
          <p>{article.content}</p>
        </div>
      ))}

      {visibleCount < articles.length && (
        <Button
          variant="contained"
          onClick={() => setVisibleCount((prev) => prev + 3)}
        >
          Mehr anzeigen
        </Button>
      )}
    </div>
  );
}

export default Home;
