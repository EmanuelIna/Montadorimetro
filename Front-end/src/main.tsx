import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Form from "./components/Form.tsx";
import ListaServicos from "./components/ListaServicos.tsx";
import Dashboard from "./components/Dashboard.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Dashboard />
  </StrictMode>,
);
