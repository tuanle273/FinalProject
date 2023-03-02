import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { AuthContext } from "../contexts/AuthContext";

const Auth = ({ authRoute }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);


  let body;
 
  if (authLoading)
    body = (
      <div class="flex items-center h-screen">
        <div class="m-auto">
          {" "}
          <PacmanLoader color="#36d7b7" />
        </div>
      </div>
    );
  else if (isAuthenticated) return <Redirect to="/" />;
  else
    body = (
      <>
        {authRoute === "login" && <LoginForm />}
        {authRoute === "register" && <RegisterForm />}
      </>
    );
  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">{body}</div>
      </div>
    </div>
  );
};

export default Auth;
