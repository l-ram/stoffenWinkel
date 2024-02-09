import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./main.css";
import { SessionProvider } from "./context/SessionContext.tsx";
import { Database } from "../src/types/db.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <SessionProvider>
      <App />
    </SessionProvider>
  </BrowserRouter>
);
