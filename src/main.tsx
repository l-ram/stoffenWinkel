import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./main.css";
import { SessionProvider } from "./context/SessionContext.tsx";
import { BasketProvider } from "./context/BasketContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <SessionProvider>
        <BasketProvider>
          <App />
        </BasketProvider>
      </SessionProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
