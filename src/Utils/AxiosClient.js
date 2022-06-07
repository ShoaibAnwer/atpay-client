import axios from "axios";

const HTTP_CLIENT = axios.create({
  //baseURL: "http://atpay-lb-562915049.ap-southeast-2.elb.amazonaws.com/api",
  baseURL: "http://localhost:3001/api",
});
HTTP_CLIENT.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("Bearer");
    console.log(accessToken, "AccessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },

  (err) => {
    return Promise.reject(err);
  }
);
export default HTTP_CLIENT;
