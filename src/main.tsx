import { createRoot } from "react-dom/client";
import { AppContextProvider } from "./context/app-context-provider";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <AppContextProvider>
    <App />
  </AppContextProvider>
);
