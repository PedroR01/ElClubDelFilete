import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import ErrorPage from "./pages/ErrorPage";
import Historia from "./pages/HistoriaPage";
import NovedadesPage from "./pages/NovedadesPage";
import NovedadDestacadaPage from "./pages/novedades/NovedadDestacadaPage";

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
    //Blog
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
    //Noticia Destacada
    path: "/novedades/Descomponiendo el Proceso de Diseño: El Estilo Fileteo",
    element: (
      <>
        <Navbar />
        <NovedadDestacadaPage />
        <Footer />
      </>
    ),
    errorElement: error(),
  },
  {
    //Historia
    path: "/historia",
    element: (
      <>
        <Navbar />
        <Historia />
        <Footer />
      </>
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
