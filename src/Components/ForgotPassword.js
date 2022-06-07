import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import HTTP_CLIENT from "../Utils/AxiosClient";
import { toast } from "react-toastify";
import SendIcon from "@mui/icons-material/Send";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
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
  height: "40vh",
  width: 700,
  margin: "20px auto",
};
const avatarStyle = { backgroundColor: "#660080" };
const btnStyle = { margin: "8x 0" };
const ForgotPassword = () => {
  const [loading, setloading] = useState(false);
  const initialValues = { email: "", password: "" };
  const navigate = useNavigate();
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is Required"),
  });

  const codeSendOnEmail = async (values) => {
    const emailData = {
      email: values.email,
    };
    try {
      setloading(true);
      const codeResend = await HTTP_CLIENT.post(
        "/auth/forgot-password",
        emailData
      );
      if (codeResend.data.code === 200) {
        toast.success(`${codeResend.data.message}`);
        navigate(`/ResetPassword?email=${emailData.email}`, {
          replace: true,
        });
      } else if (
        codeResend.data.code === 400 ||
        codeResend.data.code === 422 ||
        codeResend.data.code === 500
      ) {
        toast.error(`${codeResend.data.message}`);
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
              <SendIcon />
            </Avatar>
            <h2>Forgot Password</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={LoginSchema}
              onSubmit={(values) => {
                codeSendOnEmail(values);
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

                  <br />
                  {loading ? (
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
                      Forgot Password
                    </Button>
                  )}
                </Form>
              )}
            </Formik>
          </Grid>
          <br />

          <br />
          <Typography>
            If you have an account ?{" "}
            <Link to="/" sx={{ color: "#660080", mr: 1, my: 0.5 }}>
              Sing In ?
            </Link>
          </Typography>
          <br />
          <Typography>
            If you don't have an account ?{" "}
            <Link to="/singUp" sx={{ color: "#660080", mr: 1, my: 0.5 }}>
              Sing Up ?
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
};

export default ForgotPassword;
