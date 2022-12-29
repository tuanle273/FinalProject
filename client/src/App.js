import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./components/layout/Landing";
import Auth from "./views/Auth";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Landing />}></Route>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
