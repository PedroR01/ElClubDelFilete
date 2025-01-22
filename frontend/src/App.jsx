import { Routes, Route } from "react-router-dom";
import Navbar from "./components/sections/Navbar";
import Landing from "./pages/LandingPage";
import Historia from "./pages/HistoriaPage";
import Tienda from "./pages/TiendaPage"
import Novedades from "./pages/NovedadesPage";
import Blog from "./pages/novedades/BlogPage";
import Footer from "./components/sections/Footer"
import Login from "./pages/Login"
import AuthContextProvider  from './context/Authcontext'
export default function App() {
  return (
    
    <AuthContextProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/historia" element={<Historia />}></Route>
        <Route path="/tienda" element={<Tienda />}></Route>
        <Route path="/novedades" element={<Novedades />}></Route>
        <Route path="/novedades/:slug" element={<Blog />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
      <Footer />
    </AuthContextProvider>
    
  );
};