import { Routes, Route } from "react-router-dom";
import Navbar from "./components/sections/Navbar";
import Landing from "./pages/LandingPage";
import Historia from "./pages/HistoriaPage";
import Tienda from "./pages/TiendaPage"
import Novedades from "./pages/NovedadesPage";
import Blog from "./pages/novedades/BlogPage";
import Footer from "./components/sections/Footer"

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/historia" element={<Historia />}></Route>
        <Route path="/tienda" element={<Tienda />}></Route>
        <Route path="/novedades">
          <Route index element={<Novedades />} />
          <Route path=":slug" element={<Blog />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};