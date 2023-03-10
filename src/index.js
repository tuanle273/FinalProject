import React from "react";
import ReactDOM from "react-dom/client";
import { ProSidebarProvider } from "react-pro-sidebar";
import App from "./App";
import { BookingProvider } from "./contexts/BookingContext";
import { UserProvider } from "./contexts/UserContext";
import { VehicleProvider } from "./contexts/VehicleContext";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ProSidebarProvider>
    <VehicleProvider>
      <BookingProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </BookingProvider>
    </VehicleProvider>
  </ProSidebarProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
