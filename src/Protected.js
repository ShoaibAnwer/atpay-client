import { Routes, Route, Navigate } from "react-router-dom";
const Protected = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("Bearer");
  return (
    <>
      <Routes>
        <Route
          {...rest}
          render={(props) =>
            token ? <Component {...props} /> : <Navigate to="/" />
          }
        />
      </Routes>
    </>
  );
};
export default Protected;
