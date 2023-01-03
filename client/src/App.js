import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Landing from "./components/layout/Landing";
import NotFound from "./components/pages/NotFound";
import Auth from "./views/Auth";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing}></Route>
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
  );
}

export default App;
