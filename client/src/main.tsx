import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.js";
import "./output.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/http.js"

const root = document.getElementById("root") as HTMLElement;

createRoot(root).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </BrowserRouter>
);