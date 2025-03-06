import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // Change if using a different port
});

export default API;
