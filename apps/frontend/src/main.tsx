import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SidebarProvider, UIProvider } from "./store/index.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "./utils/trpc.ts";
import { httpBatchLink } from "@trpc/client";

const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: process.env.TRPC_API_URL || "http://localhost:3001/trpc",
      headers: {
        "Content-Type": "application/json",
      },
    }),
  ],
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          <UIProvider>
            <App />
          </UIProvider>
        </SidebarProvider>
      </QueryClientProvider>
    </trpc.Provider>
  </React.StrictMode>
);
