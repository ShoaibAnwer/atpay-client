import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import HTTP_CLIENT from "../Utils/AxiosClient";
import { toast } from "react-toastify";
import {
  Button,
  Grid,
  Paper,
  Avatar,
  Typography,
  CircularProgress,
} from "@mui/material";
const paperStyle = {
  padding: 20,
  height: "80vh",
  width: 700,
  margin: "20px auto",
};
const userNameStyle = {
  color: "#660080",
};
const avatarStyle = { backgroundColor: "#660080" };
const btnStyle = { margin: "8x 0" };
const Home = () => {
  const [loading, setloading] = useState(false);
  const [loadingGetUser, setloadingGetUser] = useState(false);
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const singOutUser = () => {
    setloading(true);
    const header = localStorage.getItem("Bearer");
    if (header) {
      localStorage.removeItem("Bearer");
      toast.success("Log Out Successfully");
      navigate("/", { replace: true });
    }
    setloading(false);
  };
  // let user = "";
  const getUserInfo = async () => {
    console.log("get user info request received");
    try {
      setloadingGetUser(true);
      const GetUserDetails = await HTTP_CLIENT.get("/user/me");
      if (GetUserDetails.data.code === 200) {
        toast("Get User Details Successfully");
        setUser(GetUserDetails.data.data);
        console.log(GetUserDetails.data.data);
      } else if (
        GetUserDetails.data.code === 404 ||
        GetUserDetails.data.code === 422 ||
        GetUserDetails.data.code === 500
      ) {
        toast.error("User Not Found");
      }
      setloadingGetUser(false);
    } catch (error) {
      setloadingGetUser(false);
      toast("Try again!");
    }
  };
  return (
    <>
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid>
            <Avatar style={avatarStyle}>
              <DashboardCustomizeIcon />
            </Avatar>
            <h2>
              Wellcome Back!<i style={userNameStyle}> {user.firstName}</i>
            </h2>

            <h2>User Details</h2>
            <hr />
            <ul>
              <li>First Name : {user.firstName}</li>
              <li>Last Name : {user.lastName}</li>
              <li>Email : {user.email}</li>
              <li>Contact Numeber : {user.contactNumber}</li>
            </ul>
            <hr />
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
                    onClick={singOutUser}
                    id="btnVarification"
                    variant="contained"
                    style={btnStyle}
                    sx={{
                      color: "white",
                      backgroundColor: "#660080",
                    }}
                  >
                    Sign Out
                  </Button>
                )}
              </Grid>
              <Grid item xs={6}>
                {loadingGetUser ? (
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
                    id="btnCircleResendCode"
                    variant="contained"
                    style={btnStyle}
                    sx={{
                      color: "white",
                      backgroundColor: "#660080",
                    }}
                    onClick={getUserInfo}
                  >
                    Get User Details
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>

          <br />
          {/* <Typography>
            <Link to="/ResetPassword" sx={{ color: "#660080", mr: 1, my: 0.5 }}>
              Reset Password ?
            </Link>
          </Typography> */}
          <br />
        </Paper>
      </Grid>
    </>
  );
};

export default Home;
