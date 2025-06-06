import { Button, Box, TextField, Typography } from "@mui/material";
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
    <Box
      component="main"
      sx={{ padding: { xs: 2, sm: 4 }, maxWidth: "900px", margin: "0 auto" }}
    >
      <Typography variant="h3" gutterBottom>
        Home
      </Typography>

      <section aria-labelledby="article-section-heading">
        <h2 id="article-section-heading">Aktuelle Artikel</h2>

        {loading && <p>Lade Artikel...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {articles.slice(0, visibleCount).map((article) => (
          <Box
            key={article._id}
            sx={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: 2,
              marginBottom: 2,
            }}
          >
            <Typography variant="h6">{article.title}</Typography>
            <Typography>{article.content}</Typography>
          </Box>
        ))}
        {visibleCount < articles.length && (
          <Box textAlign="center" mt={2}>
            <Button
              variant="contained"
              onClick={() => setVisibleCount((prev) => prev + 3)}
            >
              Mehr anzeigen
            </Button>
          </Box>
        )}
      </section>

      {user && (
        <section aria-labelledby="new-article-form-heading">
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              mt: 4,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="h4">Neuen Artikel erstellen:</Typography>

            <TextField
              label="Titel"
              name="title"
              id="title"
              placeholder="Titel"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
            />

            <TextField
              label="Kommentar"
              name="content"
              id="content"
              placeholder="Inhalt"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              fullWidth
              multiline
              rows={6}
            />

            <Button type="submit" variant="contained">
              Senden
            </Button>
          </Box>
        </section>
      )}
    </Box>
  );
}

export default Home;
