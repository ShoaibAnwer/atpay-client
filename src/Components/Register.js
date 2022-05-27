import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Link,
  FormGroup,
  Grid,
  FormControlLabel,
  Paper,
  Avatar,
  TextField,
  Box,
  Checkbox,
  Typography,
} from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import KeyOffIcon from "@mui/icons-material/KeyOff";
const paperStyle = {
  padding: 20,
  height: "100vh",
  width: 800,
  margin: "20px auto",
};
const avatarStyle = { backgroundColor: "#660080" };
const btnStyle = { margin: "8x 0" };
const Register = () => {
  return (
    <>
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align={"center"}>
            <Avatar style={avatarStyle}>
              <HowToRegIcon />
            </Avatar>
            <h2>Sign Up</h2>
            <Typography>Please fill this form to create an account </Typography>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <DriveFileRenameOutlineIcon
                sx={{ color: "#660080", mr: 1, my: 0.5 }}
              />
              <TextField
                fullWidth
                required
                name="firstName"
                label="First Name"
                variant="standard"
                type="text"
              />
            </Box>
            <br />
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <DriveFileRenameOutlineIcon
                sx={{ color: "#660080", mr: 1, my: 0.5 }}
              />
              <TextField
                fullWidth
                required
                name="lastName"
                label="Last Name"
                variant="standard"
                type="text"
              />
            </Box>
            <br />
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <AlternateEmailIcon sx={{ color: "#660080", mr: 1, my: 0.5 }} />
              <TextField
                fullWidth
                required
                name="email"
                label="Email"
                variant="standard"
                type="email"
              />
            </Box>
            <br />
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <PhoneAndroidIcon sx={{ color: "#660080", mr: 1, my: 0.5 }} />
              <TextField
                fullWidth
                required
                name="contactNumber"
                label="Contact Number"
                variant="standard"
                type="text"
              />
            </Box>
            <br />
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <AccessTimeIcon sx={{ color: "#660080", mr: 1, my: 0.5 }} />
              <TextField
                fullWidth
                required
                name="dob"
                label="Date of Brith"
                variant="standard"
                type="text"
              />
            </Box>
            <br />
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <KeyOffIcon sx={{ color: "#660080", mr: 1, my: 0.5 }} />
              <TextField
                fullWidth
                required
                name="password"
                label="Password"
                variant="standard"
                type="password"
              />
            </Box>
            <br />
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <KeyOffIcon sx={{ color: "#660080", mr: 1, my: 0.5 }} />
              <TextField
                fullWidth
                required
                name="confirmPassword"
                label="Confirm Password"
                variant="standard"
                type="password"
              />
            </Box>
            <br />
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked sx={{ color: "#660080" }} />}
                label="Remember me"
              />
            </FormGroup>
            <br />
            <br />
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
          </Grid>
          <br />
          <Typography>
            <Link sx={{ color: "#660080", mr: 1, my: 0.5 }} href="#">
              Forgot Password ?
            </Link>
          </Typography>
          <br />
          <Typography>
            If you have an account ?{" "}
            <Link sx={{ color: "#660080", mr: 1, my: 0.5 }} href={<Register />}>
              Sing In ?
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
};

export default Register;
