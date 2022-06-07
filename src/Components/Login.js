import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import KeyIcon from "@mui/icons-material/Key";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import HTTP_CLIENT from "../Utils/AxiosClient";
import {
  Button,
  FormGroup,
  Grid,
  FormControlLabel,
  Paper,
  Avatar,
  TextField,
  Box,
  Checkbox,
  Typography,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
const paperStyle = {
  padding: 20,
  height: "50vh",
  width: 700,
  margin: "20px auto",
};
const avatarStyle = { backgroundColor: "#660080" };
const btnStyle = { margin: "8x 0" };
const Login = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [loading, setloading] = useState(false);
  const initialValues = { email: "", password: "" };
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("Bearer");
    if (token) {
      navigate("/home", { replace: true });
    }
  }, []);
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is Required"),
    password: Yup.string().required("Password is Required"),
  });
  const postLoginData = async (values) => {
    let LoginData = {
      email: values.email,
      password: values.password,
    };
    try {
      setloading(true);
      const loginAccount = await HTTP_CLIENT.post("/auth/login", LoginData);
      if (loginAccount.data.code === 200) {
        const header = loginAccount.data.data.accessToken;
        localStorage.setItem("Bearer", header);

        toast.success(`${loginAccount.data.message}`);
        navigate("/home", {
          replace: true,
        });
      } else if (
        loginAccount.data.code === 400 ||
        loginAccount.data.code === 422 ||
        loginAccount.data.code === 500
      ) {
        toast.error(`${loginAccount.data.message}`);
      }
      setloading(false);
    } catch (error) {
      setloading(false);
      toast.error(`${error.message}`, {
        position: "top-right",
      });
    }
  };
  return (
    <>
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align={"center"}>
            <Avatar style={avatarStyle}>
              <LockOpenRoundedIcon />
            </Avatar>
            <h2>Sign In</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={LoginSchema}
              onSubmit={(values) => {
                postLoginData(values);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <MarkEmailReadIcon
                      sx={{ color: "#660080", mr: 1, my: 0.5 }}
                    />
                    <Field
                      fullWidth
                      required
                      as={TextField}
                      name="email"
                      label="Email"
                      variant="standard"
                      type="email"
                    />
                  </Box>
                  {errors.email && touched.email ? (
                    <div style={{ color: "red" }}>{errors.email}</div>
                  ) : null}
                  <br />
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <KeyIcon sx={{ color: "#660080", mr: 1, my: 0.5 }} />
                    <Field
                      fullWidth
                      required
                      as={TextField}
                      name="password"
                      label="Password"
                      variant="standard"
                      type={showPassword ? "text" : "password"}
                    />
                    {showPassword ? (
                      <VisibilityOffIcon
                        sx={{
                          color: "#660080",
                          cursor: "pointer",
                          mr: 1,
                          my: 0.5,
                        }}
                        onClick={() => setshowPassword(!showPassword)}
                      />
                    ) : (
                      <VisibilityIcon
                        sx={{
                          color: "#660080",
                          cursor: "pointer",
                          mr: 1,
                          my: 0.5,
                        }}
                        onClick={() => setshowPassword(!showPassword)}
                      />
                    )}
                  </Box>
                  {errors.password && touched.password ? (
                    <div style={{ color: "red" }}>{errors.password}</div>
                  ) : null}
                  <br />
                  <br />
                  {loading ? (
                    <Button
                      sx={{
                        color: "white",
                        backgroundColor: "#660080",
                      }}
                      variant="contained"
                      fullWidth
                      style={btnStyle}
                    >
                      <CircularProgress />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      sx={{
                        color: "white",
                        backgroundColor: "#660080",
                      }}
                      variant="contained"
                      fullWidth
                      style={btnStyle}
                    >
                      Sign In
                    </Button>
                  )}
                </Form>
              )}
            </Formik>
          </Grid>
          <br />
          <Typography>
            <Link
              to="/ForgotPassword"
              sx={{ color: "#660080", mr: 1, my: 0.5 }}
            >
              Forgot Password ?
            </Link>
          </Typography>
          <br />
          <Typography>
            Do you have an account ?{" "}
            <Link to="/singUp" sx={{ color: "#660080", mr: 1, my: 0.5 }}>
              Sing Up ?
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
};

export default Login;
