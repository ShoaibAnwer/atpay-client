import Login from "./Components/Login";
import Register from "./Components/Register";
import AccountVerification from "./Components/AccountVerification";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import { toast, ToastContainer } from "react-toastify";
import Home from "./Components/Home";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/singUp" element={<Register />} />
          <Route exact path="/ForgotPassword" element={<ForgotPassword />} />
          <Route exact path="/ResetPassword" element={<ResetPassword />} />
          <Route
            exact
            path="/AccountVerification"
            element={<AccountVerification />}
          />
          <Route
            exact
            path="/home"
            element={<PrivateRoute component={Home} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
