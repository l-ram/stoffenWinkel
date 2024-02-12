import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./main.css";
import { SessionProvider } from "./context/SessionContext.tsx";
import { BasketProvider } from "./context/BasketContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <SessionProvider>
      <BasketProvider>
        <App />
      </BasketProvider>
    </SessionProvider>
  </BrowserRouter>
);
