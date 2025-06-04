import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Kontakt from "./pages/Kontakt";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to={"/"}>Home</Link> | <Link to={"/kontakt"}>Kontakt</Link> |{" "}
        <Link to={"/aboutus"}>Über Uns</Link> | <Link to={"/login"}>Login</Link>{" "}
        |{" "}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
