import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Landing from "./components/layout/Landing";
import Auth from "./views/Auth";
function App() {
  return (
    <BrowserRouter>
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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
