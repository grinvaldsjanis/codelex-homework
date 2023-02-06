import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { BrowserRouter, Router, RouterProvider } from "react-router-dom";
// import Root from "./routes/root";


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
