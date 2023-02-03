import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Landing from "./components/layout/Landing";
import NotFound from "./components/pages/NotFound";
import ProtectedRoute from "./components/routing/ProtectedRoute";

import AuthContextProvider from "./contexts/AuthContext";
import Auth from "./views/Auth";
function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
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
