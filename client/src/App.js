import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Landing from "./components/layout/Landing";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";
import UserProfile from "./components/pages/UserProfile";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import AuthContextProvider from "./contexts/AuthContext";
import PostContextProvider from "./contexts/PostContext";
import Auth from "./views/Auth";
function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
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
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
