import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Landing from "./components/layout/Landing";
import NotFound from "./components/pages/404/NotFound";
import About from "./components/pages/About";
import DashBoard from "./components/pages/Dashboard/DashBoard";
import CheckOut from "./components/pages/Logged/CheckOut";

import ProtectedRoute from "./components/routing/ProtectedRoute";
import AuthContextProvider from "./contexts/AuthContext";
import Auth from "./views/Auth";

import { BubblyContainer, BubblyLink } from "react-bubbly-transitions";
import History from "./components/pages/Logged/History";
import UserProfile from "./components/pages/Logged/UserProfile";
import AdminRoute from "./components/routing/AdminRoute";
function App() {
  return (
    <AuthContextProvider>
      <Router>
        {" "}
        <BubblyContainer />
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
          <AdminRoute exact path="/admin" component={DashBoard}></AdminRoute>
          <ProtectedRoute
            exact
            path="/checkout"
            component={CheckOut}
          ></ProtectedRoute>
          <ProtectedRoute
            exact
            path="/"
            component={Landing}
            element={
              <>
                <BubblyLink to="/">Home</BubblyLink>
                <BubblyLink to="/about">About</BubblyLink>
                <BubblyLink to="/contact">Contact</BubblyLink>
              </>
            }
          ></ProtectedRoute>
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
