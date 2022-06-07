import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import PasswordIcon from "@mui/icons-material/Password";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { RegisterSchema } from "./RegisterSchema";
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
import HTTP_CLIENT from "../Utils/AxiosClient";
const paperStyle = {
  padding: 20,
  height: "90vh",
  width: 700,
  margin: "20px auto",
};
const avatarStyle = { backgroundColor: "#660080" };
const btnStyle = { margin: "8x 0" };
const Register = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    dob: "",
    password: "",
    confirmPassword: "",
  };
  const postRegisterData = async (values) => {
    let registerData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      contactNumber: values.contactNumber,
      dob: values.dob,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };
    try {
      setloading(true);
      const postData = await HTTP_CLIENT.post("/auth/signup", registerData);
      console.log(postData);
      if (postData.data.code === 200 || postData.data.code === 201) {
        toast.success(`${postData.data.message}`, {
          position: "top-right",
        });
        toast.success(`Verification code is send on ${registerData.email}`, {
          position: "top-right",
        });
        navigate(`/AccountVerification?email=${registerData.email}`, {
          replace: true,
        });
      } else if (
        postData.data.code === 400 ||
        postData.data.code === 422 ||
        postData.data.code === 500
      ) {
        toast.error(`${postData.data.message}`, {
          position: "top-right",
        });
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
              <HowToRegIcon />
            </Avatar>
            <h2>Sign Up</h2>
            <Typography>Please Fill This Form to Create An Account </Typography>
            {/* <form onSubmit={formik.handleSubmit}> */}
            <Formik
              initialValues={initialValues}
              validationSchema={RegisterSchema}
              onSubmit={(values, FormikHandlers) => {
                postRegisterData(values);
                // FormikHandlers.resetForm();
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <DriveFileRenameOutlineIcon
                      sx={{ color: "#660080", mr: 1, my: 0.5 }}
                    />
                    <Field
                      fullWidth
                      required
                      name="firstName"
                      as={TextField}
                      label="First Name"
                      variant="standard"
                      type="text"
                    />
                  </Box>
                  {errors.firstName && touched.firstName ? (
                    <div style={{ color: "red" }}>{errors.firstName}</div>
                  ) : null}
                  <br />
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <DriveFileRenameOutlineIcon
                      sx={{ color: "#660080", mr: 1, my: 0.5 }}
                    />
                    <Field
                      fullWidth
                      required
                      as={TextField}
                      name="lastName"
                      label="Last Name"
                      variant="standard"
                      type="text"
                    />
                  </Box>
                  {errors.lastName && touched.lastName ? (
                    <div style={{ color: "red" }}>{errors.lastName}</div>
                  ) : null}
                  <br />
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
                      type="text"
                    />
                  </Box>
                  {errors.email && touched.email ? (
                    <div style={{ color: "red" }}>{errors.email}</div>
                  ) : null}
                  <br />
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <PhoneAndroidIcon
                      sx={{ color: "#660080", mr: 1, my: 0.5 }}
                    />
                    <Field
                      fullWidth
                      required
                      as={TextField}
                      name="contactNumber"
                      label="Contact Number"
                      variant="standard"
                      type="text"
                    />
                  </Box>
                  {errors.contactNumber && touched.contactNumber ? (
                    <div style={{ color: "red" }}>{errors.contactNumber}</div>
                  ) : null}
                  <br />
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <AccessTimeIcon sx={{ color: "#660080", mr: 1, my: 0.5 }} />
                    <Field
                      fullWidth
                      required
                      as={TextField}
                      name="dob"
                      label="Date of Brith"
                      variant="standard"
                      type="text"
                    />
                  </Box>
                  {errors.dob && touched.dob ? (
                    <div style={{ color: "red" }}>{errors.dob}</div>
                  ) : null}
                  <br />
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <PasswordIcon sx={{ color: "#660080", mr: 1, my: 0.5 }} />
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
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <PasswordIcon sx={{ color: "#660080", mr: 1, my: 0.5 }} />
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
                  {loading ? (
                    <Button
                      sx={{
                        color: "#660080",
                        backgroundColor: "white",
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
                      Sign Up
                    </Button>
                  )}
                </Form> /* end form end here */
              )}
            </Formik>
          </Grid>
          <br />
          {/* <Link
            to="/AccountVerification"
            sx={{ color: "#660080", mr: 1, my: 0.5 }}
          >
            Account Verification
          </Link> */}
          <br />
          <br />
          <Typography>
            If you have an account ?{" "}
            <Link to="/" sx={{ color: "#660080", mr: 1, my: 0.5 }}>
              Sing In ?
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
};

export default Register;
