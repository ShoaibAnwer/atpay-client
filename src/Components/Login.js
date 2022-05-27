import React, { useState } from "react";
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
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import KeyIcon from "@mui/icons-material/Key";
import Register from "./Register";
const paperStyle = {
  padding: 20,
  height: "50vh",
  width: 800,
  margin: "20px auto",
};
const avatarStyle = { backgroundColor: "#660080" };
const btnStyle = { margin: "8x 0" };
const Login = () => {
  const [register, setRegister] = useState("");
  setRegister(Register);
  return (
    <>
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align={"center"}>
            <Avatar style={avatarStyle}>
              <LockOpenRoundedIcon />
            </Avatar>
            <h2>Sign In</h2>
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
              <KeyIcon sx={{ color: "#660080", mr: 1, my: 0.5 }} />
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
              Sign In
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
            Do you have an account ?{" "}
            <Link sx={{ color: "#660080", mr: 1, my: 0.5 }} href={register}>
              Sing Up ?
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
};

export default Login;
