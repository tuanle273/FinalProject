import React, { useContext } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import NavbarMain from "../layout/NavbarMain";
import Dashboard from "../pages/Dashboard/DashBoard";

const AdminRoute = ({ component: Component, ...rest }) => {
  const {
    authState: { authLoading, isAuthenticated, user },
  } = useContext(AuthContext);
  if (authLoading)
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && user.role === "admin" ? (
          <>
            <NavbarMain />

            <Dashboard>
              <Component {...rest} {...props} />
            </Dashboard>
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default AdminRoute;
