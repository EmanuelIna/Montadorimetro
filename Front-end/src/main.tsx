import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Dashboard from "./components/Dashboard.tsx";
import NavBar, { type NavView } from "./components/NavBar.tsx";

const App = () => {
  const [activeView, setActiveView] = useState<NavView>("cronometro");

  return (
    <>
      <NavBar activeView={activeView} onSelect={setActiveView} />
      <Dashboard activeView={activeView} />
    </>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
