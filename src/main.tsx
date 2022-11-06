import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TasksContextProvider } from "./context/TasksContext";
import "./style.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TasksContextProvider>
      <App />
    </TasksContextProvider>
  </React.StrictMode>,
);
