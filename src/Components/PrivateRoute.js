import React from "react";
import { Navigate, Route } from "react-router-dom";
// import { checkAdminSate } from "../../services/authServces";
// import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const PrivateRoute = ({ component: Component, ...rest }) => {
  //   let auth = useSelector((state) => state.auth);
  //   let res = checkAdminSate(auth.password);
  let resp = localStorage.getItem("Bearer");
  if (resp) {
    return <Component />;
  } else {
    // toast.error("Please Login First");
    return <Navigate to="/" />;
    console.log("fffffffffffffffffffff");
  }

  // return (
  //   <Route
  //     {...rest}
  //     render={(props) => {
  //       if (res === "PASS") return <Element {...props} />;
  //       if (res === "LOGIN_SCREEN") return <Navigate to="/login" />;
  //       if (res === "REGISTER") return <Navigate to="/register" />;
  //     }}
  //   />
  // );
};

export default PrivateRoute;
