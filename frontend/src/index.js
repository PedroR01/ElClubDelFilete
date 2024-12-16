import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Navbar from "./components/sections/Navbar";
import Footer from "./components/sections/Footer";
import LandingPage from "./pages/LandingPage";
import ErrorPage from "./pages/ErrorPage";
import Historia from "./pages/HistoriaPage";
import NovedadesPage from "./pages/NovedadesPage";
import BlogPage from "./pages/novedades/BlogPage";

const error = () => (
  <>
    <Navbar />
    <ErrorPage />
    <Footer />
  </>
);

const router = createBrowserRouter([
  {
    //localHost main
    path: "/",
    element: (
      <>
        <Navbar />
        <LandingPage />
        <Footer />
      </>
    ),
    errorElement: error(),
  },
  {
    // Listado noticias
    path: "/novedades",
    element: (
      <>
        <Navbar />
        <NovedadesPage />
        <Footer />
      </>
    ),
    errorElement: error(),
  },
  {
    // Blog -- Abarca cada noticia gracias a :slug
    path: "/novedades/:slug",
    element: (
      <>
        <Navbar />
        <BlogPage />
        <Footer />
      </>
    ),
    errorElement: error(),
  },
  {
    //Historia
    path: "/historia",
    element: (
      <div className="overscroll-x-none overflow-x-hidden">
        <Navbar />
        <Historia />
        <Footer />
      </div>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
