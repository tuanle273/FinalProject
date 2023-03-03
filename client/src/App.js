import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Landing from "./components/layout/Landing";
import NotFound from "./components/pages/404/NotFound";

import DashBoard from "./components/pages/Dashboard/DashBoard";
import ForgotPassword from "./components/pages/ForgotPassword";
import About from "./components/pages/Logged/About";
import CheckOut from "./components/pages/Logged/CheckOut";
import History from "./components/pages/Logged/History";
import UserProfile from "./components/pages/Logged/UserProfile";
import PasswordReset from "./components/pages/PasswordReset";
import AdminRoute from "./components/routing/AdminRoute";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import AuthContextProvider from "./contexts/AuthContext";
import Auth from "./views/Auth";
function App() {
  return (
    <AuthContextProvider>
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
          <AdminRoute exact path="/admin" component={DashBoard}></AdminRoute>
          <ProtectedRoute
            exact
            path="/checkout"
            component={CheckOut}
          ></ProtectedRoute>
          <ProtectedRoute exact path="/" component={Landing}></ProtectedRoute>
          <Route
            exact
            path="/login"
            render={(props) => <Auth {...props} authRoute="login" />}
          ></Route>
          <Route
            exact
            path="/register"
            render={(props) => <Auth {...props} authRoute="register" />}
          ></Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
