import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
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
import HTTP_CLIENT from "../Utils/AxiosClient";
import { toast } from "react-toastify";
const paperStyle = {
  padding: 20,
  height: "70vh",
  width: 700,
  margin: "20px auto",
};
const avatarStyle = { backgroundColor: "#660080" };
const btnStyle = { margin: "8x 0" };
const AccountVerification = (props) => {
  console.log(props);
  const [loading, setloading] = useState(false);
  const [loadingResend, setloadingResend] = useState(false);
  const navigate = useNavigate();
  const Search = useLocation().search;
  const passEmail = new URLSearchParams(Search).get("email");
  const initialValues = { email: passEmail ? passEmail : "", code: "" };
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is Required"),
    code: Yup.string().required("Verification Code is Required"),
  });
  const LoginVarificationData = async (values) => {
    const varificationData = {
      email: values.email,
      code: values.code,
    };
    console.log("varificationData", varificationData);
    try {
      setloading(true);
      const accountVerifed = await HTTP_CLIENT.post(
        "/auth/verify",
        varificationData
      );
      console.log("accountVerifed", accountVerifed);
      if (accountVerifed.data.code === 200) {
        toast.success(`${accountVerifed.data.message}`, {
          position: "top-right",
        });
        navigate("/", { replace: true });
      } else if (
        accountVerifed.data.code === 400 ||
        accountVerifed.data.code === 422 ||
        accountVerifed.data.code === 500
      ) {
        toast.error(`${accountVerifed.data.message}`, {
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
    console.log(varificationCodeResend);
    try {
      setloadingResend(true);
      const codeResend = await HTTP_CLIENT.post(
        "/auth/resend-code",
        varificationCodeResend
      );
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
              <FingerprintIcon />
            </Avatar>
            <h2>Account Verification</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={LoginSchema}
              onSubmit={async (values) => {
                LoginVarificationData(values);
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
                      // required
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
                  <br />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      {loading ? (
                        <Button
                          required
                          fullWidth
                          id="btnCircleVarification"
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
                          type="submit"
                          id="btnVarification"
                          variant="contained"
                          style={btnStyle}
                          sx={{
                            color: "white",
                            backgroundColor: "#660080",
                          }}
                        >
                          Verified
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
                  {/* button grid end here  */}
                  <br />
                </Form>
              )}
            </Formik>
          </Grid>
          <br />

          <br />
          <Typography>
            Do you have an account ?{" "}
            <Link to="/" sx={{ color: "#660080", mr: 1, my: 0.5 }} href="#">
              sing In
            </Link>
          </Typography>
          <br />
          <Typography>
            Do you don't have an account ?{" "}
            <Link to="/singUp" sx={{ color: "#660080", mr: 1, my: 0.5 }}>
              Sing Up ?
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
};

export default AccountVerification;
