import React from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import Landing from "./components/layout/Landing";
import NotFound from "./components/pages/404/NotFound";
import BookingManagement from "./components/pages/Dashboard/BookingManagement";
import BrandManagement from "./components/pages/Dashboard/BrandManagement";
import Chart from "./components/pages/Dashboard/Chart";
import DiscountManagement from "./components/pages/Dashboard/DiscountManagement";
import UserManagement from "./components/pages/Dashboard/UserManagement";
import VehicleManagement from "./components/pages/Dashboard/VehicleManagement";
import ForgotPassword from "./components/pages/ForgotPassword";
import Faq from "./components/pages/Landing/Faq";
import About from "./components/pages/Logged/About";
import AllCars from "./components/pages/Logged/AllCars";

import CheckOut from "./components/pages/Logged/CheckOut";
import History from "./components/pages/Logged/History";
import UserProfile from "./components/pages/Logged/UserProfile";
import paymentFail from "./components/pages/Logged/paymentFail";
import paymentSuccess from "./components/pages/Logged/paymentSuccess";
import vehicleDetail from "./components/pages/Logged/vehicleDetail";
import PasswordReset from "./components/pages/PasswordReset";
import AdminRoute from "./components/routing/AdminRoute";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import AuthContextProvider from "./contexts/AuthContext";
import { BookingProvider } from "./contexts/BookingContext";
import { BrandProvider } from "./contexts/BrandContext";
import { ChartProvider } from "./contexts/ChartContext";
import { DiscountProvider } from "./contexts/DiscountContext";
import { UserProvider } from "./contexts/UserContext";
import { VehicleProvider } from "./contexts/VehicleContext";
import Auth from "./views/Auth";

function App() {
  return (
    <AuthContextProvider>
      <VehicleProvider>
        <BookingProvider>
          <UserProvider>
            <DiscountProvider>
              <BrandProvider>
                <ChartProvider>
                  <ProSidebarProvider>
                    <Router>
                      {" "}
                      <Switch>
                        {" "}
                        <ProtectedRoute
                          exact
                          path="/profile"
                          component={UserProfile}
                        ></ProtectedRoute>{" "}
                        <ProtectedRoute
                          exact
                          path="/history"
                          component={History}
                        ></ProtectedRoute>
                        <ProtectedRoute
                          exact
                          path="/about"
                          component={About}
                        ></ProtectedRoute>
                        <ProtectedRoute
                          exact
                          path="/vehicleDetail/:vehicleId"
                          component={vehicleDetail}
                        ></ProtectedRoute>
                        <ProtectedRoute
                          exact
                          path="/checkout/:vehicleId"
                          component={CheckOut}
                        ></ProtectedRoute>
                        <Route
                          exact
                          path="/forgotpassword"
                          component={ForgotPassword}
                        ></Route>
                        <Route
                          exact
                          path="/passwordreset/:token"
                          component={PasswordReset}
                        ></Route>
                        <AdminRoute
                          exact
                          path="/admin"
                          component={UserManagement}
                        ></AdminRoute>
                        <AdminRoute
                          exact
                          path="/admin/general"
                          component={Chart}
                        ></AdminRoute>
                        <AdminRoute
                          exact
                          path="/admin/usermanagement"
                          component={UserManagement}
                        ></AdminRoute>
                        <AdminRoute
                          exact
                          path="/admin/vehiclemanagement"
                          component={VehicleManagement}
                        ></AdminRoute>
                        <AdminRoute
                          exact
                          path="/admin/brandmanagement"
                          component={BrandManagement}
                        ></AdminRoute>
                        <AdminRoute
                          exact
                          path="/admin/bookingmanagement"
                          component={BookingManagement}
                        ></AdminRoute>{" "}
                        <AdminRoute
                          exact
                          path="/admin/discountmanagement"
                          component={DiscountManagement}
                        ></AdminRoute>
                        <ProtectedRoute
                          exact
                          path="/checkout"
                          component={CheckOut}
                        ></ProtectedRoute>
                        <ProtectedRoute
                          exact
                          path="/faq"
                          component={Faq}
                        ></ProtectedRoute>
                        <ProtectedRoute
                          exact
                          path="/paymentSuccess"
                          component={paymentSuccess}
                        ></ProtectedRoute>{" "}
                        <ProtectedRoute
                          exact
                          path="/paymentFail"
                          component={paymentFail}
                        ></ProtectedRoute>
                        <ProtectedRoute
                          exact
                          path="/allcar"
                          component={AllCars}
                        ></ProtectedRoute>
                        <ProtectedRoute
                          exact
                          path="/"
                          component={Landing}
                        ></ProtectedRoute>
                        <Route
                          exact
                          path="/login"
                          render={(props) => (
                            <Auth {...props} authRoute="login" />
                          )}
                        ></Route>
                        <Route
                          exact
                          path="/register"
                          render={(props) => (
                            <Auth {...props} authRoute="register" />
                          )}
                        ></Route>
                        <Route path="*">
                          <NotFound />
                        </Route>
                      </Switch>
                    </Router>
                  </ProSidebarProvider>
                </ChartProvider>
              </BrandProvider>
            </DiscountProvider>
          </UserProvider>
        </BookingProvider>
      </VehicleProvider>
    </AuthContextProvider>
  );
}

export default App;
