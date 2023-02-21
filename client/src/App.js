import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Landing from "./components/layout/Landing";
import NotFound from "./components/pages/404/NotFound";
import About from "./components/pages/About";
import DashBoard from "./components/pages/Dashboard/DashBoard";
import CheckOut from "./components/pages/Logged/CheckOut";
import UserProfile from "./components/pages/UserProfile";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import AuthContextProvider from "./contexts/AuthContext";
import Auth from "./views/Auth";
function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <ProtectedRoute
            exact
            path="/profile"
            component={UserProfile}
          ></ProtectedRoute>
          <ProtectedRoute
            exact
            path="/about"
            component={About}
          ></ProtectedRoute>
          <ProtectedRoute
            exact
            path="/admin"
            component={DashBoard}
          ></ProtectedRoute>
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
