import axios from "axios";

const api = axios.create({
  // baseURL: "http://bemetricsappdev.b2ktech.com.br/api",
  baseURL: "http://192.168.3.35:8000/api",
});

export default api;
