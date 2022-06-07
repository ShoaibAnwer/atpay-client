import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import LockResetIcon from "@mui/icons-material/LockReset";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import KeyIcon from "@mui/icons-material/Key";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import HTTP_CLIENT from "../Utils/AxiosClient";
import { toast } from "react-toastify";
import {
  Button,
  Grid,
  Paper,
  Avatar,
  TextField,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
const paperStyle = {
  padding: 20,
  height: "70vh",
  width: 700,
  margin: "20px auto",
};
const avatarStyle = { backgroundColor: "#660080" };
const btnStyle = { margin: "8x 0" };
const ResetPassword = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const [loading, setloading] = useState(false);
  const [loadingResend, setloadingResend] = useState(false);
  const navigate = useNavigate();
  const search = useLocation().search;
  const passEmail = new URLSearchParams(search).get("email");
  const initialValues = {
    email: passEmail ? passEmail : "",
    code: "",
    password: "",
  };
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is Required"),
    code: Yup.string().required("Varification Code is Required"),
    password: Yup.string()
      .required("password is required e.g Test12345@")
      .min(8, "Password length must be 8 charater")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Conform Password is required"),
  });
  const resetPasswordAccount = async (values) => {
    const resetPasswordCode = {
      email: values.email,
      code: values.code,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };
    console.log("resetPasswordCode", resetPasswordCode);
    try {
      setloading(true);
      const confirmResetPassword = await HTTP_CLIENT.post(
        "/auth/reset-password",
        resetPasswordCode
      );
      if (confirmResetPassword.data.code === 200) {
        toast.success(`${confirmResetPassword.data.message}`, {
          position: "top-right",
        });
        navigate("/", { replace: true });
      } else if (
        confirmResetPassword.data.code === 400 ||
        confirmResetPassword.data.code === 422 ||
        confirmResetPassword.data.code === 500
      ) {
        toast.error(`${confirmResetPassword.data.message}`, {
          position: "top-right",
        });
      }
      setloading(false);
    } catch (error) {
      setloading(false);
      toast.error(`${error.message}`);
    }
  };
  const resendCode = async () => {
    const varificationCodeResend = {
      email: passEmail,
    };
    console.log("codeResend", varificationCodeResend);
    try {
      setloadingResend(true);
      const codeResend = await HTTP_CLIENT.post(
        "/auth/resend-code",
        varificationCodeResend
      );
      console.log("codeResend", codeResend);
      if (codeResend.data.code === 200) {
        toast.success(`${codeResend.data.message}`, {
          position: "top-right",
        });
      } else if (
        codeResend.data.code === 400 ||
        codeResend.data.code === 422 ||
        codeResend.data.code === 500
      ) {
        toast.error(`${codeResend.data.message}`, {
          position: "top-right",
        });
      }
      setloadingResend(false);
    } catch (error) {
      setloadingResend(false);
      toast.error(`${error.message}`);
    }
  };

  return (
    <>
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align={"center"}>
            <Avatar style={avatarStyle}>
              <LockResetIcon />
            </Avatar>
            <h2>Reset Password</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={LoginSchema}
              onSubmit={(values) => {
                resetPasswordAccount(values);
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
                    <DomainVerificationIcon
                      sx={{ color: "#660080", mr: 1, my: 0.5 }}
                    />
                    <Field
                      fullWidth
                      required
                      as={TextField}
                      name="code"
                      label="Code"
                      variant="standard"
                      type="text"
                    />
                  </Box>
                  {errors.code && touched.code ? (
                    <div style={{ color: "red" }}>{errors.code}</div>
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
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <KeyIcon sx={{ color: "#660080", mr: 1, my: 0.5 }} />
                    <Field
                      fullWidth
                      required
                      as={TextField}
                      name="confirmPassword"
                      label="Confirm Password"
                      variant="standard"
                      type={showConfirmPassword ? "text" : "password"}
                    />
                    {showConfirmPassword ? (
                      <VisibilityOffIcon
                        sx={{
                          color: "#660080",
                          cursor: "pointer",
                          mr: 1,
                          my: 0.5,
                        }}
                        onClick={() =>
                          setshowConfirmPassword(!showConfirmPassword)
                        }
                      />
                    ) : (
                      <VisibilityIcon
                        sx={{
                          color: "#660080",
                          cursor: "pointer",
                          mr: 1,
                          my: 0.5,
                        }}
                        onClick={() =>
                          setshowConfirmPassword(!showConfirmPassword)
                        }
                      />
                    )}
                  </Box>
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <div style={{ color: "red" }}>{errors.confirmPassword}</div>
                  ) : null}
                  <br />
                  <br />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
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
                          Update Password
                        </Button>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      {loadingResend ? (
                        <Button
                          required
                          fullWidth
                          id="btnCircleResendCode"
                          variant="contained"
                          style={btnStyle}
                          sx={{
                            color: "white",
                            backgroundColor: "#660080",
                          }}
                        >
                          <CircularProgress />
                        </Button>
                      ) : (
                        <Button
                          required
                          fullWidth
                          //  type="submit"
                          id="btnCircleResendCode"
                          variant="contained"
                          style={btnStyle}
                          sx={{
                            color: "white",
                            backgroundColor: "#660080",
                          }}
                          onClick={resendCode}
                        >
                          Resend Code
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
          <br />
          <br />
          <Typography>
            <Link
              to="/ForgotPassword"
              sx={{ color: "#660080", mr: 1, my: 0.5 }}
              href="#"
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

export default ResetPassword;
