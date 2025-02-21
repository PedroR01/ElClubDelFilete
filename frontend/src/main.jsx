import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import './index.css'
import App from './App.jsx'
import OnStartAnimate from './components/OnStartAnimate.jsx';

const router = createBrowserRouter([
  {
    path: "/*",
    element: <OnStartAnimate Component={App} />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>,
)
