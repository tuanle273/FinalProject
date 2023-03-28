import React from "react";
import ReactDOM from "react-dom/client";
import { ProSidebarProvider } from "react-pro-sidebar";
import App from "./App";
import { BookingProvider } from "./contexts/BookingContext";
import { BrandProvider } from "./contexts/BrandContext";
import { ChartProvider } from "./contexts/ChartContext";
import { DiscountProvider } from "./contexts/DiscountContext";
import { UserProvider } from "./contexts/UserContext";
import { VehicleProvider } from "./contexts/VehicleContext";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <VehicleProvider>
    <BookingProvider>
      <UserProvider>
        <DiscountProvider>
          <BrandProvider>
            <ChartProvider>
              <ProSidebarProvider>
                <App />
              </ProSidebarProvider>
            </ChartProvider>
          </BrandProvider>
        </DiscountProvider>
      </UserProvider>
    </BookingProvider>
  </VehicleProvider>
);
<script src="https://www.paypal.com/sdk/js?client-id=AXBaE0nA0j89DkBgxhfjgN9I2VtNPXvYcmHlmzqgby0uvzOHf4okRxzen5dw_4hQQixuq32fZPZZccVB"></script>;
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
