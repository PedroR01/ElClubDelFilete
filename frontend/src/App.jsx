import { Routes, Route } from "react-router-dom";
import Navbar from "./components/sections/Navbar";
import Landing from "./pages/LandingPage";
import Historia from "./pages/HistoriaPage";
import Novedades from "./pages/NovedadesPage";
import Blog from "./pages/novedades/BlogPage";

export default function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Landing />}></Route>
                <Route path="/historia" element={<Historia />}></Route>
                <Route path="/novedades" element={<Novedades />}></Route>
                <Route path="/novedades/:slug" element={<Blog />}></Route>
            </Routes>
        </>
    );
};
