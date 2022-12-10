import axios from "axios";

const isDevelopment = process.env.NODE_ENV === "development";


axios.defaults.baseURL = isDevelopment ? "http://localhost:4000" : "";

export default axios;
