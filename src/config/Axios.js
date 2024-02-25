import axios from "axios";

const url_axios = axios.create({
  baseURL: "http://localhost:5000",
});

export default url_axios;
