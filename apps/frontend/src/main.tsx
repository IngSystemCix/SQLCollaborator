import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { UIProvider } from "./store/index.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<UIProvider>
			<App />
		</UIProvider>
	</React.StrictMode>
);
