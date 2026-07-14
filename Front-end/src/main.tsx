import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Form from "./components/Form.tsx";
import ListaServicos from "./components/ListaServicos.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Form />
    <ListaServicos />
  </StrictMode>,
);
