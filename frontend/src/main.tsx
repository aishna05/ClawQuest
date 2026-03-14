import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/crucible.css";
import "./styles/neural-link.css";
import "./styles/containment.css";
import "./styles/battle.css";

createRoot(document.getElementById("root")!).render(<App />);
